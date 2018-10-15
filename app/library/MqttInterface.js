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
	constructor(host = 'localhost', port = 9001, timeout = 10000) {
		this.host = host
		this.port = port
		this.timeout = timeout
		this.isAlive = false
		this.registeredPaths = {}
	}

	/**
	 * Register a metric.
	 * @param {string} key - The metric key.
	 * @param {string} path - The path (topic) of the metric in the mqtt server.
	 * @param {string} access - The access of the metric (r/w/rw).
	 */
	register(key, path, access = 'r') {
		if (!path.startsWith('/')) {
			path = '/' + path
		}
		let lowerCaseAccess = access.toLowerCase()
		if (lowerCaseAccess !== 'r' && lowerCaseAccess !== 'w' && lowerCaseAccess !== 'rw') {
			throw `Unallowed access ${access}`
		}
		this.registeredPaths[path] = new MqttInterfacePath(path, key, access)
	}

	/**
	 * Unregister a previously registered metric.
	 * @param {string} key - The metric key.
	 */
	unregister(key) {
		let path = this.lookupKey(key)
		if (path !== undefined) {
			this.registeredPaths[path.value] = undefined
		}
	}

	/**
	 * Look up the path of a given metric key.
	 * @return {MqttInterfacePath} The found path, or undefined if no match was found.
	 */
	lookupKey(key) {
		for (let pathValue in this.registeredPaths) {
			let path = this.registeredPaths[pathValue]
			if (path !== undefined && path.key === key) {
				return path
			}
		}
	}

	/**
	 * Look up the path for a given path identifier.
	 * @return {MqttInterfacePath} The found path, or undefined if no match was found.
	 */
	lookupPath(path) {
		return this.registeredPaths[path]
	}

	/**
	 * Connect the mqtt interface.
	 */
	connect() {
		if (this.client !== undefined) {
			throw 'The mqtt interface is already connected'
		}
		this.portalId = undefined
		this.clientId = (new Date()).toJSON().substring(2, 22)
		this.client = new Paho.MQTT.Client(this.host, this.port, this.clientId)
		let ref = this

		ref.isAliveTimerRef = setTimeout(() => {
			ref.isAlive = false
			if (ref.lostConnection != undefined) {
				ref.lostConnection()
			}
		}, ref.timeout)

		this.client.onMessageArrived = function (message) {
			try {
				let topic = message.destinationName

				if (ref.portalId === undefined) {
					// before the mqtt interface is ready to read or write
					// metric values it needs to detect its portal id. The 
					// venus device will publish a message on connect that is
					// used to extract the portal id.
					if (topic.startsWith('N/') && topic.endsWith('/system/0/Serial')) {
						let data = JSON.parse(message.payloadString)
						ref.portalId = data.value
						for (let path in ref.registeredPaths) {
							// send read requests for all registered paths
							// to be able to update the ui with all values
							// quicker
							ref.client.send(`R/${ref.portalId}${path}`, '')
						}
						ref.keepAlive()
					}
				} else {
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

					// process the message received and fire
					// any registered callbacks
					let prefixLength = ref.portalId.length + 2
					if (topic.length > prefixLength) {
						let pathValue = topic.substring(prefixLength)
						let path = ref.lookupPath(pathValue)
						let data = JSON.parse(message.payloadString)
						if (ref.onUpdate !== undefined && path !== undefined && path.isReadable && data.value !== undefined) {
							ref.onUpdate(path.key, data.value)
						}
						if (ref.onRawUpdate !== undefined) {
							ref.onRawUpdate(pathValue, data.value)
						}
					}
				}
			} catch (error) {
				if (ref.onError !== undefined) {
					ref.onError(error)
				}
			}
		}

		this.client.connect({
			onSuccess: function (reconnect, uri) {
				ref.client.subscribe('N/#')
			}
		})
	}

	/**
	 * Disconnect the mqtt interface.
	 */
	disconnect() {
		if (this.client === undefined) {
			return
		}
		this.client.disconnect()
		this.portalId = undefined
		this.client.end()
	}

	/**
	 * Request reading a metric.
	 * @param {string} key - The metric key.
	 */
	read(key) {
		if (this.portalId === undefined) {
			throw 'Read failed. The mqtt interface has not detected its portal id yet'
		}
		let path = this.lookupKey(key)
		if (path === undefined) {
			throw `Read failed. There is no path registered for key: ${key}`
		}
		if (!path.isReadable) {
			throw `Read failed. The path with key ${key} is not readable`
		}
		this.client.send(`R/${this.portalId}${path.value}`, '')
	}

	/**
	 * Request writing a metric.
	 * @param {string} key - The metric key.
	 * @param {} value - The value to write.
	 */
	write(key, value) {
		if (this.portalId === undefined) {
			throw 'Write failed. The mqtt interface has not detected its portal id yet'
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
		this.client.send(`R/${this.portalId}/system/0/Serial`, '')
	}
}

/**
 * The MqttInterfacePath class represents a cross-reference between 
 * a metric key and its mqtt path, and also the access of that reference.
 */
class MqttInterfacePath {
	/**
	 * Create a MqttInterfacePath instance.
	 * @param {string} path - The mqtt path of the value.
	 * @param {string} key - The metric key.
	 * @param {string} access - The access of the given path (r/w/rw).
	 */
	constructor(path, key, access) {
		this.value = path
		this.key = key
		this.isReadable = access.toLowerCase().includes('r')
		this.isWritable = access.toLowerCase().includes('w')
	}
}
