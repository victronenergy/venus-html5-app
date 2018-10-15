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
    this.isAlive = false
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

    ref.isAliveTimerRef = setTimeout(() => {
      ref.isAlive = false
      if (ref.lostConnection != undefined) {
        ref.lostConnection()
      }
    }, ref.timeout)

    this.client.onMessageArrived = function(message) {
      try {
        const topic = message.destinationName
        if (ref.portalId === undefined && topic.endsWith("/system/0/Serial")) {
          // before the mqtt interface is ready to read or write
          // metric values it needs to detect its portal id. The
          // venus device will publish a message on connect that is
          // used to extract the portal id.
          let data = JSON.parse(message.payloadString)
          ref.portalId = data.value
          for (let path in ref.registeredPaths) {
            // send read requests for all registered paths
            // to be able to update the ui with all values
            // quicker
            ref.client.send(`R/${ref.portalId}${path}`, "")
          }
          ref.keepAlive()
        } else if (ref.isRelevantMessage(topic)) {
          // a message has arrived which means that
          // the mqtt interface is alive, therefore
          // we need to reset the is alive timer
          if (!ref.isAlive) {
            ref.isAlive = true
            if (ref.connected != undefined) {
              ref.connected()
            }
          }
          clearTimeout(ref.isAliveTimerRef)
          ref.isAliveTimerRef = setTimeout(() => {
            ref.isAlive = false
            if (ref.lostConnection != undefined) {
              ref.lostConnection()
            }
          }, ref.timeout)

          const path = topic.substring(2 + ref.portalId.length) // 2 = 'N/'
          const value = JSON.parse(message.payloadString).value
          ref.elementUpdater(path, value)
        }
      } catch (error) {
        console.log(error, message)
      }
    }

    this.client.connect({
      onSuccess: function(reconnect, uri) {
        ref.client.subscribe("N/#")
      }
    })
  }

  /**
   * Request reading a metric.
   * @param {string} key - The metric key.
   */
  read(key) {
    if (this.portalId === undefined) {
      throw "Read failed. The mqtt interface has not detected its portal id yet"
    }
    let path = this.lookupKey(key)
    if (path === undefined) {
      throw `Read failed. There is no path registered for key: ${key}`
    }
    if (!path.isReadable) {
      throw `Read failed. The path with key ${key} is not readable`
    }
    this.client.send(`R/${this.portalId}${path.value}`, "")
  }

  /**
   * Request writing a metric.
   * @param {string} key - The metric key.
   * @param {} value - The value to write.
   */
  write(key, value) {
    if (this.portalId === undefined) {
      throw "Write failed. The mqtt interface has not detected its portal id yet"
    }
    let path = this.lookupKey(key)
    if (path === undefined) {
      throw `Write failed. There is no path registered for key: ${key}`
    }
    if (!path.isWritable) {
      throw `Write failed. The path with key ${key} is not writable`
    }
    let data = JSON.stringify({ value: value })
    this.client.send(`W/${this.portalId}${path.value}`, data)
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
