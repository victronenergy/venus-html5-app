import * as mqtt from "mqtt"
import { IClientOptions } from "mqtt"
import { MqttState, MqttStore, STATUS, Topics } from "."
import Logger from "../../utils/logger"
import { getMessageJson } from "../../utils/util"
import { AppService, appStore } from "../App"

export class MqttService {
  constructor(protected store: MqttStore) {}

  update = (data: Partial<MqttState>) => {
    this.store.update(data)
  }

  subscribeToTopic = (topic?: string) => {
    if (!topic) return
    if (topic.includes("undefined")) return

    this.store.update((state) => {
      if (!state.topicsSubscribed.has(topic)) {
        Logger.log(`Subscribing to ${topic}`)
        state.client?.subscribe(topic, (err, granted) => {
          if (err) {
            Logger.error(err)
            return
          }
          Logger.warn(
            `Subscribed to ${granted[0] ? granted[0].topic : topic} with QoS ${granted[0] ? granted[0].qos : "unknown"}`
          )
        })

        state.topicsSubscribed.add(topic)
      }

      return state
    })
  }

  unsubscribeFromTopic = (topic?: string) => {
    if (!topic) return

    this.store.update((state) => {
      if (state.topicsSubscribed.has(topic)) {
        state.client?.unsubscribe(topic, (err: any) => {
          if (err) {
            Logger.error(err)
            return
          }
          Logger.log(`Unsubscribed from ${topic}`)
        })

        state.topicsSubscribed.delete(topic)
      }

      return state
    })
  }

  subscribeToTopics = (topics: Topics) => {
    Object.values(topics).flat().map(this.subscribeToTopic)
  }

  unsubscribeFromTopics = (topics: Topics) => {
    Object.values(topics).flat().map(this.unsubscribeFromTopic)
  }

  addMessage = (topic: string, message: { value: string | null }) => {
    this.store.update((state) => {
      return {
        messages: {
          ...state.messages,
          [topic]: message.value ?? undefined,
        },
      }
    })
  }

  setPortalId = (portalId: string) => {
    this.store.update({ portalId })
  }

  boot = (
    host: string = "localhost",
    port: number | null,
    username?: string,
    password?: string,
    portalId?: string,
    environment: string = "live"
  ) => {
    console.log("MQTT booting")

    let client = this.store?.getValue()?.client
    const topics = this.store?.getValue()?.topicsSubscribed

    if (client) {
      client.end(true)
      this.store.update({ client: undefined, topicsSubscribed: new Set<string>() })
    }

    let remote = false

    if (username && password) {
      if (!host || !environment) {
        return
      }

      const mqttClientOptions: IClientOptions = {
        path: "/mqtt",
        username: `vrmlogin_${environment}_${username}`,
        password: password,
      }
      client = mqtt.connect(`mqtts://${host}:443`, mqttClientOptions)

      remote = true
    } else {
      client = mqtt.connect(`mqtt://${host}:${port}`)
    }

    this.store.update({ client, portalId })

    client.on("error", (error) => {
      console.log("MQTT error")
      this.store.update({ error, status: STATUS.DISCONNECTED })
    })

    client.on("offline", () => {
      this.store.update({ error: true, status: STATUS.DISCONNECTED })
      const appService = new AppService(appStore)
      appService.setRemote(false)
    })

    client.on("connect", () => {
      console.log("MQTT connected")
      this.store.update({ error: null, status: STATUS.CONNECTED })
      this.subscribeToTopic(`N/${(remote && portalId) || "+"}/system/0/Serial`) // Never use wildcard when connecting remotely
      this.sendKeepalive()
      this.setupKeepalive()

      topics?.forEach((topic) => this.subscribeToTopic(topic))
    })

    client.on("message", async (topic, message) => {
      Logger.log(`Message received: ${topic} - ${message.toString()}`)
      if (topic.endsWith("/system/0/Serial") && !this.store?.getValue().portalId) {
        const portalId = getMessageJson(message).value
        this.setPortalId(portalId)
        this.sendKeepalive() // Send keepalive to trigger messages to return immediately
        this.setupKeepalive()
      }

      this.addMessage(topic, getMessageJson(message))
    })
    console.log("MQTT booted")
  }

  sendKeepalive = () => {
    const portalId = this.store?.getValue().portalId
    if (portalId) {
      this.publish(`R/${this.store?.getValue().portalId}/system/0/Serial`, "")
    }
  }

  setupKeepalive = () => {
    const ref = this.store?.getValue().keepAliveHandlerRef
    if (ref) {
      clearInterval(ref)
    }

    this.store.update({ keepAliveHandlerRef: setInterval(this.sendKeepalive, 50000) })
  }

  publish = (topic: string, data: string) => {
    if (this.store?.getValue().status !== STATUS.CONNECTED || !this.store?.getValue().client) {
      Logger.error("Could not publish value, not connected to MQTT broker")
    }
    const message = JSON.stringify({ value: data })

    Logger.log(`Publishing to ${topic}: ${message}`)

    this.store?.getValue().client?.publish(topic, message)
  }
}
