import * as mqtt from "mqtt"
import { MqttClient, ISubscriptionMap, ClientSubscribeCallback } from "mqtt"
import { DBUS_PATHS, TOPICS } from "./topics"
import PowerSupplySystem from "./PowerSupplySystem"

/**
 * Default quality of service when subscribing - best effort
 * {@link https://www.npmjs.com/package/mqtt#qos}
 */
const DEFAULT_QOS = 0
const TOPICS_TO_SUBSCRIBE_ON_INIT: string[] = [TOPICS.NOTIFICATION.SERIAL, TOPICS.NOTIFICATION.ALL_DEVICE_INSTANCES]

const arrayToSubscriptionMap = (toSubscribe: string[]) => {
  return toSubscribe.reduce(
    (acc, value) => {
      acc[value] = DEFAULT_QOS
      return acc
    },
    {} as ISubscriptionMap
  )
}

const subscribeCallback: ClientSubscribeCallback = (err, granted) => {
  if (err) {
    console.log("Error connecting to topic", err)
  } else {
    granted.forEach(grant => {
      console.log(`Subscribed to ${grant.topic} with qos ${grant.qos}...`)
    })
  }
}

class VenusClient {
  public mqttClient: MqttClient
  private powerSupplySystem: PowerSupplySystem
  private keepAliveHandler: any = null

  constructor(host: string) {
    this.mqttClient = mqtt.connect(host)
    this.powerSupplySystem = new PowerSupplySystem()
  }

  public connect = () => {
    return new Promise((resolve, reject) => {
      this.mqttClient.on("connect", () => {
        this.setupKeepAlive()

        const subscribeMap = arrayToSubscriptionMap(TOPICS_TO_SUBSCRIBE_ON_INIT)
        this.mqttClient.subscribe(subscribeMap, (err, granted) => {
          subscribeCallback(err, granted)
          if (err) {
            reject(err)
          }
        })
      })

      this.mqttClient.on("message", (topic, message) => {
        this.powerSupplySystem.handleNotification(topic, message)
        if (this.powerSupplySystem.isInitialized()) {
          this.mqttClient.removeAllListeners("message")
          resolve()
        }
      })
    })
  }

  /**
   * Send a read message every 60s to keep the MQTT broker alive
   */
  private setupKeepAlive() {
    this.keepAliveHandler = setInterval(() => {
      const topic = this.powerSupplySystem.getTopicFromDbusPath("R", DBUS_PATHS.GENERAL.SERIAL)
      this.mqttClient.publish(topic, "")
    }, 60000)
  }

  public subscribe = (dbusPaths: string[]) => {
    this.mqttClient.on("message", this.powerSupplySystem.handleNotification)

    const topics = dbusPaths.map(dbusPath => this.powerSupplySystem.getTopicFromDbusPath("N", dbusPath))
    const subscribeMap = arrayToSubscriptionMap(topics)
    this.mqttClient.subscribe(subscribeMap, subscribeCallback)
  }
}

export default VenusClient
