const mqtt = require('mqtt')

// /** The MqttInterface class represents the transport layer
//     for the venus mqtt */

// The interface depends on the mqtt.js package for mqtt over websocket implementation
// todo: describe callbacks and usage
//       onError, onUpdate, onRawUpdate

export class MqttInterface {
	constructor(connection = 'ws://localhost') {
		this.connection = connection
		this.registeredPaths = {}
	}

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

	unregister(key) {
		let path = this.lookupKey(key)
		if (path !== undefined) {
			this.registeredPaths[path.value] = undefined
		}
	}

	lookupKey(key) {
		for (let path in this.registeredPaths) {
			if (path.key === key) {
				return path
			}
		}
	}

	lookupPath(path) {
		return this.registeredPaths[path]
	}

	connect() {
		if (this.client !== undefined) {
			throw 'The mqtt interface is already connected'
		}
		this.portalId = undefined
		this.client = mqtt.connect(this.connection)
		let ref = this

		this.client.on('connect', () => {
			ref.client.subscribe('N/#')
		})

		this.client.on('message', (topic, message) => {
			try {
				if (ref.portalId === undefined) {
					// before the mqtt interface is ready to read or write
					// metric values it needs to detect its portal id. The 
					// venus device will publish a message on connect that is
					// used to extract the portal id.
					if (topic.startsWith('N/') && topic.endsWith('/system/0/Serial')) {
						let data = JSON.parse(message.toString())
						ref.portalId = data.value
						console.log(`portalId: ${ref.portalId}`)
						for (let path in ref.registeredPaths) {
							// send read requests for all registered paths
							// to be able to update the ui with all values
							// quicker
							console.log(`initializing: ${path}`)
							ref.client.publish(`R/${ref.portalId}${path}`, '')
						}
						ref.keepAlive()
					}
				} else {
					let prefixLength = ref.portalId.length + 2
					if (topic.length > prefixLength) {
						let pathValue = topic.substring(prefixLength)
						let path = ref.lookupPath(pathValue)
						let data = JSON.parse(message.toString())
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
		})
	}

	disconnect() {
		if (this.client === undefined) {
			return
		}
		this.client.disconnect()
		this.portalId = undefined
		this.client.end()
	}

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
		this.client.publish(`R/${this.portalId}${path.value}`, '')
	}

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
		let data = JSON.stringify({ value: value})
		this.client.publish(`W/${this.portalId}${path.value}`, data)
	}

	keepAlive() {
		if (this.portalId === undefined) {
			return
		}
		this.client.publish(`R/${this.portalId}/system/0/Serial`, '')
	}
}

export class MqttInterfacePath {
	constructor(path, key, access) {
		this.value = path
		this.key = key
		this.isReadable = access.toLowerCase().includes('r')
		this.isWritable = access.toLowerCase().includes('w')
	}
}
