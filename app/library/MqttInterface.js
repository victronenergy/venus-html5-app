/**
 * The MqttInterface class represents the transport layer for the venus mqtt metrics.
 * It depends on paho mqtt that can be found at https://www.eclipse.org/paho/clients/js/
 *
 * - Register metrics using the register method.
 * - Start the interface by calling the connect method.
 * - Listen to changes of registered metrics using the onUpdate callback (metricKey, rawValue) => {}
 * - Listen to raw changes using the onRawUpdate callback (path, rawValue) => {}
 * - Listen to errors using the onError callback (error) => {}
 */
class MqttInterface {
  /**
   * Create a MqttInterface instance.
   * @param {string} host - The host name of the mqtt server.
   * @param {numeric} port - The port number of the mqtt server.
   * @param {numeric} timeout - The timeout in milliseconds before the interface connection is considered to be lost.
   */
  constructor(host = "localhost", port = 9001, elementUpdater, timeout = 10000) {
    this.host = host
    this.port = port
    this.elementUpdater = elementUpdater
    this.timeout = timeout
    this.registeredPaths = Object.keys(metricsConfig)
  }

  isRelevantMessage(topic) {
    return topic.startsWith("N/") && this.registeredPaths.some(p => topic.endsWith(p))
  }

  connect() {
    if (this.client !== undefined) {
      throw "The mqtt interface is already connected"
    }
    this.portalId = undefined
    this.clientId = new Date().toJSON().substring(2, 22)
    this.client = new Paho.MQTT.Client(this.host, this.port, this.clientId)
    const ref = this

    this.client.onMessageArrived = function(message) {
      try {
        const topic = message.destinationName
        if (ref.portalId === undefined && topic.endsWith("/system/0/Serial")) {
          // request portal id to be able to read and write data
          let data = JSON.parse(message.payloadString)
          ref.portalId = data.value
          for (let path in ref.registeredPaths) {
            // send read requests for all registered paths
            ref.client.send(`R/${ref.portalId}${path}`, "")
          }
          ref.keepAlive()
        } else if (ref.isRelevantMessage(topic)) {
          const path = topic.substring(2 + ref.portalId.length) // 2 = 'N/'
          const value = message.payloadString ? JSON.parse(message.payloadString).value : ""
          ref.elementUpdater(path, value)
        }
      } catch (error) {
        console.log(error, message)
      }
    }

    this.client.onConnectionLost = msg => {
      if (msg.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage)
      }
      if (ref.lostConnection) ref.lostConnection()
    }

    this.client.connect({
      onSuccess: function(reconnect, uri) {
        ref.client.subscribe("N/#")
        ref.connected()
        setInterval(() => {
          ref.keepAlive()
        }, ref.timeout)
      }
    })
  }

  /**
   * Request writing a metric.
   * @param {string} key - The metric key.
   * @param {} value - The value to write.
   */
  write(path, value) {
    if (!this.portalId) {
      throw "Write failed. The mqtt interface has not detected its portal id yet"
    }
    if (!path) {
      throw `Write failed. There is no path registered for key: ${key}`
    }
    const metric = metricsConfig[path]
    if (!metric) {
      throw `No metric found for ${path}`
    }
    if (!metric.write) {
      throw `Write failed. The path ${path} is not writable`
    }
    let data = JSON.stringify({ value: value })
    this.client.send(`W/${this.portalId}${path}`, data)
  }

  /**
   * Send a keep alive message to the server.
   */
  keepAlive() {
    if (this.portalId === undefined) {
      return
    }
    this.client.send(`R/${this.portalId}/system/0/Serial`, "")
  }
}
