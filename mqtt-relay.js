var mqtt = require('mqtt')

var venus = mqtt.connect('mqtt://192.168.3.70')
// var venus = mqtt.connect('mqtt://em.duckdns.org:11883') // gustav
var relay = mqtt.connect('mqtt://localhost')

venus.on('connect', function() {
	console.log('venus connected')
	venus.subscribe('N/#')
	setInterval(() => {
		relay.publish('R/38d2692be8fc/system/0/Serial', '');
		// relay.publish('R/e8eb11e15100/system/0/Serial', ''); // gustav
	}, 5000)
})

venus.on('message', function(topic, message) {
	relay.publish(topic, message)
})

relay.on('connect', function() {
	console.log('relay connected')
	relay.subscribe('#')
	setInterval(() => {
		// work-around for greeting sent by venus when connecting
		venus.publish('N/38d2692be8fc/system/0/Serial', '{"value": "38d2692be8fc"}')
		// venus.publish('N/e8eb11e15100/system/0/Serial', '{"value": "e8eb11e15100"}') // gustav
	}, 10000)
})

relay.on('message', function(topic, message) {
	if (topic.startsWith('R/')) {
		console.log(`relay recv: ${topic}: ${message.toString()}`)
		venus.publish(topic, message)
	}
	if (topic.startsWith('W/')) {
		console.log(`relay recv: ${topic}: ${message.toString()}`)
		venus.publish(topic, message)
	}
	// console.log(`relay recv: ${topic}: ${message.toString()}`)
})
