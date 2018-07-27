var mqtt = require('mqtt')

portalID = "38d2692be8fc";
venusIP = "192.168.3.70";

var venus = mqtt.connect('mqtt://' + venusIP)
var relay = mqtt.connect('mqtt://localhost')

venus.on('connect', function() {
	console.log('venus connected')
	venus.subscribe('N/#')
	setInterval(() => {
		relay.publish('R/' + portalID + '/system/0/Serial', '');
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
		venus.publish('N/' + portalID + '/system/0/Serial', '{"value": "' + portalID + '"}')
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
})
