var Venus = {};

Venus.createDefaultFormatter = function() {
	return function(rawValue) {
		if (rawValue === undefined || rawValue === null) {
			return '';
		}
		return rawValue.toString();
	};
};

Venus.createNumberFormatter = function(precision, factor) {
	factor = factor === undefined ? 1.0 : factor;
	return function(rawValue) {
		if (rawValue === undefined || rawValue === null) {
			return '';
		}
		var value = Number(rawValue) * factor;
		return precision === undefined
			? value.toString()
			: value.toFixed(precision);
	};
};


Venus.Definition = function(key, description, unit, formatter) {
	this.key = key;
	this.description = description;
	this.unit = unit;
	this.formatter = formatter === undefined ? Venus.createDefaultFormatter() : formatter;
};


// todo: this needs some serious work
Venus.definitions = {};
Venus.definitions['Dc/Battery/Voltage'] = new Venus.Definition('Dc/Battery/Voltage', 'Voltage', 'V', Venus.createNumberFormatter(1));
Venus.definitions['Dc/Battery/Current'] = new Venus.Definition('Dc/Battery/Current', 'Current', 'A', Venus.createNumberFormatter(1));
Venus.definitions['Dc/Battery/Power'] = new Venus.Definition('Dc/Battery/Power', 'Power', 'W', Venus.createNumberFormatter(0));
Venus.definitions['Dc/Battery/Soc'] = new Venus.Definition('Dc/Battery/Soc', 'State of Charge', '%', Venus.createNumberFormatter(0));
Venus.definitions['Dc/Battery/Temperature'] = new Venus.Definition('Dc/Battery/Temperature', 'Temperature', 'C', Venus.createNumberFormatter(1));
Venus.definitions['Dc/Vebus/Current'] = new Venus.Definition('Dc/Vebus/Current', 'VE bus current', 'A', Venus.createNumberFormatter(1));
Venus.definitions['Dc/Vebus/Power'] = new Venus.Definition('Dc/Vebus/Power', 'VE bus power', 'W', Venus.createNumberFormatter(0));
Venus.definitions['Ac/Loads/Voltage'] = new Venus.Definition('Ac/Loads/Voltage', 'Voltage', 'V', Venus.createNumberFormatter(0));
Venus.definitions['Ac/Loads/Current'] = new Venus.Definition('Ac/Loads/Current', 'Current', 'A', Venus.createNumberFormatter(1));
Venus.definitions['Ac/Loads/Power'] = new Venus.Definition('Ac/Loads/Power', 'Power', 'W', Venus.createNumberFormatter(0));
Venus.definitions['Ac/Grid/CurrentLimit'] = new Venus.Definition('Ac/Grid/CurrentLimit', 'Current limit', 'A', Venus.createNumberFormatter(0));
Venus.definitions['Ac/Grid/Voltage'] = new Venus.Definition('Ac/Grid/Voltage', 'Voltage', 'V', Venus.createNumberFormatter(0));
Venus.definitions['Ac/Grid/Current'] = new Venus.Definition('Ac/Grid/Current', 'Current', 'A', Venus.createNumberFormatter(1));
Venus.definitions['Ac/Grid/Power'] = new Venus.Definition('Ac/Grid/Power', 'Power', 'W', Venus.createNumberFormatter(0));
Venus.definitions['SystemState/State'] = new Venus.Definition('SystemState/State', 'System state', '', function(rawValue) {
	if (rawValue == 0) return 'Off';
	if (rawValue == 1) return 'Low power';
	if (rawValue == 2) return 'VE.Bus Fault condition';
	if (rawValue == 3) return 'Bulk charging';
	if (rawValue == 4) return 'Absorption charging';
	if (rawValue == 5) return 'Float charging';
	if (rawValue == 6) return 'Storage mode';
	if (rawValue == 7) return 'Equalisation charging';
	if (rawValue == 8) return 'Passthru';
	if (rawValue == 9) return 'Inverting';
	if (rawValue == 10) return 'Assisting';
	if (rawValue == 256) return 'Discharging';
	if (rawValue == 257) return 'Sustain';
	return 'unknown: '+rawValue;
});


Venus.Metric = function(definition, rawValue) {
	this.definition = definition;
	this._rawValue = rawValue;
	this.callbacks = [];
};

Venus.Metric.prototype = {
	get value () { return this.definition.formatter(this._rawValue); },
	get rawValue () { return this._rawValue; },
	set rawValue (rawValue) {
		this._rawValue = rawValue;
		this.callbacks.forEach(function(callback) { callback(); });
	}
};


Venus.DataBinding = function(element, metric, property) {
	this.element = element;
	this.metric = metric;
	this.property = property;
	this.update();
	var that = this;
	this.metric.callbacks.push(function() {
		that.update();
	});
};

Venus.DataBinding.prototype.update = function() {
	this.element.innerHTML = this.metric[this.property];
};


Venus.Service = function(interface) {
 	this.interface = interface;
 	this.metrics = {};
 	this.bindings = [];
};

Venus.Service.prototype.start = function() {
	var that = this;
	this.interface.onMetricUpdate = function(key, value) {
		if (key == 'Ac/Grid/L1/Current') {
			var test = true;
		}
		var metric = that.metrics[key];
		if (metric !== undefined) {
			metric.rawValue = value;
			if (that.onUpdate !== undefined) {
				that.onUpdate(metric);
			}
		}
		if (that.onRawUpdate !== undefined) {
			that.onRawUpdate(key, value);
		}
	};
	this.interface.connect();
};

Venus.Service.prototype.stop = function() {
	this.interface.disconnect();
};

Venus.Service.prototype.bindElements = function(element) {
	var that = this;
	[].forEach.call(element.childNodes, function(childNode) {
		if (childNode.attributes !== undefined) {
			var dataBindingAttribute = childNode.attributes['data-binding'];
			var dataPropertyAttribute = childNode.attributes['data-property'];
			var dataProperty = 'value';
			if (dataPropertyAttribute !== undefined) {
				dataProperty = dataPropertyAttribute.nodeValue;
			}
			if (dataBindingAttribute !== undefined) {
				var definition = Venus.definitions[dataBindingAttribute.nodeValue];
				if (definition !== undefined) {
					var metric = new Venus.Metric(definition);
					that.metrics[metric.definition.key] = metric;
					that.bindings.push(new Venus.DataBinding(childNode, metric, dataProperty));
				}
			}
		}
		that.bindElements(childNode);
	});
};


Venus.MqttInterface = function(host, port) {
	this.host = host;
	this.port = port;
};

// todo: rename, topicSuffix something maybe
Venus.MqttInterface.prototype.crossReference = {};
Venus.MqttInterface.prototype.crossReference['/system/0/Dc/Battery/Current'] = 'Dc/Battery/Current';
Venus.MqttInterface.prototype.crossReference['/system/0/Dc/Battery/Power'] = 'Dc/Battery/Power';
Venus.MqttInterface.prototype.crossReference['/system/0/Dc/Battery/Soc'] = 'Dc/Battery/Soc';
Venus.MqttInterface.prototype.crossReference['/system/0/Dc/Battery/Temperature'] = 'Dc/Battery/Temperature';
Venus.MqttInterface.prototype.crossReference['/system/0/Dc/Battery/Voltage'] = 'Dc/Battery/Voltage';
Venus.MqttInterface.prototype.crossReference['/system/0/Dc/Vebus/Current'] = 'Dc/Vebus/Current';
Venus.MqttInterface.prototype.crossReference['/system/0/Dc/Vebus/Power'] = 'Dc/Vebus/Power';
Venus.MqttInterface.prototype.crossReference['/system/0/SystemState/State'] = 'SystemState/State';
Venus.MqttInterface.prototype.crossReference['/vebus/257/Ac/Out/L1/V'] = 'Ac/Loads/Voltage';
Venus.MqttInterface.prototype.crossReference['/vebus/257/Ac/Out/L1/I'] = 'Ac/Loads/Current';
Venus.MqttInterface.prototype.crossReference['/vebus/257/Ac/Out/L1/P'] = 'Ac/Loads/Power';
Venus.MqttInterface.prototype.crossReference['/vebus/257/Ac/ActiveIn/CurrentLimit'] = 'Ac/Grid/CurrentLimit';
Venus.MqttInterface.prototype.crossReference['/vebus/257/Ac/ActiveIn/L1/V'] = 'Ac/Grid/Voltage';
Venus.MqttInterface.prototype.crossReference['/vebus/257/Ac/ActiveIn/L1/I'] = 'Ac/Grid/Current';
Venus.MqttInterface.prototype.crossReference['/vebus/257/Ac/ActiveIn/L1/P'] = 'Ac/Grid/Power';

Venus.MqttInterface.prototype.connect = function() {
	if (this.client !== undefined) {
		return;
	}
	this.portalId = undefined;
	this.clientId = (new Date()).toJSON().substring(2, 22)
	this.client = new Paho.MQTT.Client(this.host, this.port, this.clientId);
	var that = this;
	this.client.onConnectionLost = function(response) {
		console.log('onConnectionLost');
		// called when a connection has been lost. after a connect() method has succeeded. Establish the call back used when a connection
		// has been lost. The connection may be lost because the client initiates a disconnect or because the server or network cause the
		// client to be disconnected. The disconnect call back may be called without the connectionComplete call back being invoked if, for
		// example the client fails to connect. A single response object parameter is passed to the onConnectionLost callback containing the
		// following fields:
		// 1. errorCode
		// 2. errorMessage
	};
	this.client.onMessageDelivered = function(message) {
		console.log('onMessageDelivered');
		// called when a message has been delivered. All processing that this Client will ever do has been completed. So, for example,
		// in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server and the message has been
		// removed from persistent storage before this callback is invoked. Parameters passed to the onMessageDelivered callback are:
		// 1. Paho.MQTT.Message that was delivered.
	};
	this.client.onMessageArrived = function(message) {
		try {
			console.log('onMessageArrived');
			if (that.portalId === undefined) {
				if (message.destinationName.startsWith('N/') && message.destinationName.endsWith('/system/0/Serial')) {
					var data = JSON.parse(message.payloadString);
					that.portalId = data.value;
					console.log('portalId: '+that.portalId);
					// todo: send read requests for all registered paths
					for(var path in that.crossReference) {
						// todo: sending causes connection to close
						console.log(path);
						var message = new Paho.MQTT.Message('');
						console.log(message.destinationName = 'R/'+that.portalId+path);
						that.client.send(message);
					}
				}
				that.sendKeepAlive();
			} else {
				var prefixLength = that.portalId.length + 2;
				if (that.onMetricUpdate !== undefined && message.destinationName.length > prefixLength) {
					var lookup = message.destinationName.substring(prefixLength);
					var key = that.crossReference[lookup];
					var data = JSON.parse(message.payloadString);
					if (key !== undefined && data.value !== undefined) {
						that.onMetricUpdate(key, data.value);
					}
				}
			}
		}
		catch(error) {
			console.log(error);
		}

		// called when a message has arrived in this Paho.MQTT.client. Parameters passed to the onMessageArrived callback are:
		// 1. Paho.MQTT.Message that has arrived.
	};
	// this.client.onConnected =
	this.client.connect({onSuccess: function(reconnect, uri) {
		console.log('onConnected');
		// called when a connection is successfully made to the server. after a connect() method. Parameters passed to the onConnected callback are:
		// 1. reconnect (boolean) - If true, the connection was the result of a reconnect.
		// 2. URI (string) - The URI used to connect to the server.
		that.client.subscribe('N/+/#');
		that.sendKeepAlive();
	}});
};

Venus.MqttInterface.prototype.disconnect = function() {
	if (this.client === undefined) {
		return;
	}
	this.client.disconnect();
	this.portalId = undefined;
	this.clientId = undefined;
	this.client = undefined;
};

Venus.MqttInterface.prototype.sendKeepAlive = function() {
	if (this.portalId === undefined) {
		return;
	}
	console.log('keeping alive: ' + 'R/'+this.portalId+'/system/0/Serial');
	var message = new Paho.MQTT.Message('');
	message.destinationName = 'R/'+this.portalId+'/system/0/Serial';
	this.client.send(message);
};
