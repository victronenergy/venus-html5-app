import * as mqtt from "mqtt"
import { MqttClient } from "mqtt"
import { TOPICS } from "./topics"
import { DBUS_PATHS } from "../config/dbusPaths"
import { parseMessage, arrayToSubscriptionMap } from "./util"
import VenusSystem from "./venusSystem"
import Logger from "../logging/logger"

/**
 * Default quality of service when subscribing - best effort
 * {@link https://www.npmjs.com/package/mqtt#qos}
 */
const TOPICS_TO_SUBSCRIBE_ON_INIT = [
  TOPICS.NOTIFICATION.SERIAL,
  TOPICS.NOTIFICATION.ALL_DEVICE_INSTANCES,
  TOPICS.NOTIFICATION.SETTINGS_AC_INPUT_TYPE1,
  TOPICS.NOTIFICATION.SETTINGS_AC_INPUT_TYPE2
]

const subscribeCallback = (err, granted) => {
  if (err) {
    Logger.log("Error connecting to topic", err)
  } else {
    granted.forEach(grant => {
      Logger.log(`Subscribed to ${grant.topic} with qos ${grant.qos}...`)
    })
  }
}

const STATUS = {
  CONNECTING: "connecting",
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  RECONNECTING: "reconnecting"
}

class VenusClient {
  /**
   * @type {MqttClient}
   */
  mqttClient
  /**
   * @type {VenusSystem}
   * @private
   */
  venusSystem
  keepAliveHandlerRef = null

  /**
   * @type {STATUS}
   */
  status = null

  onMessage = () => {}
  onConnectionChanged = () => {}

  constructor(host) {
    this.status = STATUS.CONNECTING
    this.mqttClient = mqtt.connect(host)
    this.venusSystem = new VenusSystem()

    this.mqttClient.stream.on("error", error => {
      Logger.warn("MQTT Stream Error", error)
      this.errorMessage = error
    })

    this.mqttClient.on("error", error => {
      Logger.warn("MQTT Error", error)
      this.errorMessage = error
    })

    window.onunload = () => {
      this.mqttClient.end()
    }
  }

  connect = () => {
    return new Promise((resolve, reject) => {
      Logger.log("Status - initial: ", this.status)

      this.mqttClient.once("connect", () => {
        const initialSubs = arrayToSubscriptionMap(TOPICS_TO_SUBSCRIBE_ON_INIT)
        this.mqttClient.subscribe(initialSubs, (err, granted) => {
          subscribeCallback(err, granted)
          if (err) {
            reject(err)
          }
        })
      })

      this.mqttClient.on("connect", () => {
        Logger.log(`Status: ${this.status} >> ${STATUS.CONNECTED}`)
        this.status = STATUS.CONNECTED
        this.setupKeepAlive()
        this.onConnectionChanged({ connected: true })
      })

      this.mqttClient.on("disconnect", () => {
        Logger.log(`Status: ${this.status} >> ${STATUS.DISCONNECTED}`)
        this.status = STATUS.DISCONNECTED
        clearInterval(this.keepAliveHandlerRef)
        this.onConnectionChanged({ connected: false })
      })

      this.mqttClient.on("reconnect", () => {
        Logger.log(`Status: ${this.status} >> ${STATUS.RECONNECTING}`)
        const previousStatus = this.status
        this.status = STATUS.RECONNECTING
        this.onConnectionChanged({ connected: false })

        if (this.status === STATUS.RECONNECTING && previousStatus === STATUS.CONNECTING && this.errorMessage) {
          this.mqttClient.end()
          reject(this.errorMessage)
        }
      })

      this.mqttClient.on("message", (topic, data) => {
        // Listen to messages but do nothing until system is initialized
        // Then remove all initial subscriptions and resolve the promise,
        // after which the app can subscribe to paths it needs
        const message = parseMessage(topic, data)
        this.venusSystem.handleSystemMessage(topic, message)
        if (this.venusSystem.isInitialized()) {
          this.mqttClient.unsubscribe(TOPICS_TO_SUBSCRIBE_ON_INIT)
          this.mqttClient.removeAllListeners("message")
          resolve()
        }
      })
    })
  }

  write(dbusPath, value) {
    const topic = this.venusSystem.getTopicFromDbusPath("W", dbusPath)
    let data = JSON.stringify({ value: value })
    Logger.log("Write: ", topic, data)
    this.mqttClient.publish(topic, data)
  }

  /**
   * Send a read message every 50s to keep the MQTT broker alive
   */
  setupKeepAlive() {
    Logger.log("Setting up keep alive ...")
    clearInterval(this.keepAliveHandlerRef)
    this.keepAliveHandlerRef = setInterval(() => {
      const topic = this.venusSystem.getTopicFromDbusPath("R", DBUS_PATHS.GENERAL.SERIAL)
      this.mqttClient.publish(topic, "")
    }, 50000)
  }

  subscribe = dbusPaths => {
    this.mqttClient.on("message", (topic, message) => {
      const clientMessage = parseMessage(topic, message)
      Logger.log("Received message:", topic, clientMessage.value)
      this.onMessage(clientMessage)
    })

    const topics = dbusPaths.map(dbusPath => this.venusSystem.getTopicFromDbusPath("N", dbusPath))
    const subscribeMap = arrayToSubscriptionMap(topics)
    this.mqttClient.subscribe(subscribeMap, subscribeCallback)
  }
}

export default VenusClient
