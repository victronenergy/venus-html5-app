var host = getParameterByName('host');
if (!host) host = window.location.hostname;
var port = parseInt(getParameterByName('port'));
if (!port) port = 9001;

var deviceInterface = new Venus.MqttInterface(host, port)
var metricService = new Venus.MetricService(deviceInterface);

window.timeouts = {};

var lastIsAliveState = false;

window.onload = function() {
	setupMetrics();
	deviceInterface.connected = function() {
		document.body.classList.remove('connectionLost');
		document.body.classList.add('connectionOn');
	}
	deviceInterface.lostConnection = function() {
		document.body.classList.remove('connectionOn');
		document.body.classList.add('connectionLost');
		for(var key in metricService.metrics) {
			var metric = metricService.metrics[key];
			metric.toStale(metric.key);
		}
	}
}

// don't scroll
window.onscroll = function() {
  window.scrollTo(0,0);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// todo: debugging only
function toggleShorePower() {
	if (metricService.metrics['Ac/Grid/IsConnected'].rawValue == 0) {
		metricService.metrics['Dc/Battery/Soc'].rawValue = 100;
		metricService.metrics['Ac/Grid/IsConnected'].rawValue = 1;
		metricService.metrics['Dc/Battery/Current'].formatter = Venus.numericFormatter(1);
	} else {
		metricService.metrics['Dc/Battery/Soc'].rawValue = 35;
		metricService.metrics['Ac/Grid/IsConnected'].rawValue = 0;
		metricService.metrics['Dc/Battery/Current'].formatter = Venus.numericFormatter(1, -1);
		metricService.metrics['Dc/Battery/Current'].rawValue = metricService.metrics['Dc/Battery/Current'].rawValue + 0.1;
	}
}

// todo: debugging only
function toggleShoreVoltage() {
  if(metricService.metrics['Ac/Grid/Voltage'].rawValue > 150) {
    metricService.metrics['Ac/Grid/Voltage'].rawValue = 110;
  }
  else {
    metricService.metrics['Ac/Grid/Voltage'].rawValue = 240;
  }
}

function setupCurrentLimitSelection() {
	var container = document.getElementById('inputLimitSelection');
  container.innerHTML = "";
  selection = document.createElement('h4');
  selection.innerHTML = "Input Limit";
  container.appendChild(selection);

  USAmperage = [10,15,20,30,50,100];
  EUAmperage = [6,10,13,16,25,32,63]

  shoreVoltage = metricService.metrics['Ac/Grid/Voltage'].rawValue;
  // shoreVoltage = 110;

  if (shoreVoltage === undefined) amperage = EUAmperage
  else if (shoreVoltage > 150) amperage = EUAmperage
  else amperage = USAmperage;

  amperage.forEach(function(currentValue) {
		var selection = document.createElement('a');
		selection.href = '#';
		selection.innerHTML = currentValue+'A';
		selection.addEventListener('click', createSetInputLimitFunction(currentValue));
		container.appendChild(selection);
	})
}

function createSetInputLimitFunction(limit) {
	return function() {
		metricService.write('Ac/Grid/CurrentLimit', limit);
		hideCurrentLimitSelection();
	}
}

function showCurrentLimitSelection() {
  setupCurrentLimitSelection();
	document.getElementById("mySidenav").style.width = "350px";
}

function hideCurrentLimitSelection() {
	document.getElementById("mySidenav").style.width = "0px";
}

function setMode(mode) {
	if (mode === 'on') {
		metricService.write('System/Mode', 3);
	}
	else if (mode === 'off') {
		metricService.write('System/Mode', 4);
	}
	else if (mode === 'charge') {
		metricService.write('System/Mode', 1);
	}
}

function showModeSelection() {
	document.getElementById('setModeOnButton').classList.remove('modeBtnOn');
	document.getElementById('setModeOffButton').classList.remove('modeBtnOn');
	document.getElementById('setModeChargeOnlyButton').classList.remove('modeBtnOn');
	if (metricService.metrics['System/Mode'].rawValue === 3) {
		document.getElementById('setModeOnButton').classList.add('modeBtnOn');
	}
	else if (metricService.metrics['System/Mode'].rawValue === 4) {
		document.getElementById('setModeOffButton').classList.add('modeBtnOn');
	}
	else if (metricService.metrics['System/Mode'].rawValue === 1) {
		document.getElementById('setModeChargeOnlyButton').classList.add('modeBtnOn');
	}
	document.getElementById("myMultiPlus").style.width = "350px";
}

function hideModeSelection() {
	document.getElementById("myMultiPlus").style.width = "0px";
}

function setupMetrics() {
	metricService.register('Dc/Battery/Voltage', '/system/0/Dc/Battery/Voltage', 'Voltage', 'V', Venus.numericFormatter(1), 0);
	metricService.register('Dc/Battery/Current', '/system/0/Dc/Battery/Current', 'Current', 'A', Venus.numericFormatter(1), 0);
	metricService.register('Dc/Battery/Power', '/system/0/Dc/Battery/Power', 'Power', 'W', Venus.numericFormatter(), 0);
	metricService.register('Dc/Battery/Soc', '/system/0/Dc/Battery/Soc', 'State of charge', '%', Venus.numericFormatter(), 0);
	metricService.register('Dc/Loads/Current', '/system/0/Dc/Vebus/Current', 'DC loads current', 'A', Venus.numericFormatter(1), 0);
	metricService.register('Dc/Loads/Power', '/system/0/Dc/Vebus/Power', 'DC loads power', 'W', Venus.numericFormatter(), 0);
	metricService.register('Ac/Loads/Voltage', '/vebus/257/Ac/Out/L1/V', 'AC loads voltage', 'V', Venus.numericFormatter(), 0);
	metricService.register('Ac/Loads/Current', '/vebus/257/Ac/Out/L1/I', 'AC loads current', 'A', Venus.numericFormatter(1), 0);
	metricService.register('Ac/Loads/Power', '/vebus/257/Ac/Out/L1/P', 'AC loads power', 'W', Venus.numericFormatter(), 0);
	metricService.register('Ac/Grid/IsConnected', '/Ac/ActiveIn/Connected', 'Grid is connected', '', Venus.numericFormatter());
	metricService.register('Ac/Grid/Voltage', '/vebus/257/Ac/ActiveIn/L1/V', 'Grid voltage', 'V', Venus.numericFormatter(), 0);
	metricService.register('Ac/Grid/Current', '/vebus/257/Ac/ActiveIn/L1/I', 'Grid current', 'A', Venus.numericFormatter(1), 0);
	metricService.register('Ac/Grid/Power', '/vebus/257/Ac/ActiveIn/L1/P', 'Grid power', 'W', Venus.numericFormatter(), 0);
	metricService.register('Ac/Grid/CurrentLimit', '/vebus/257/Ac/ActiveIn/CurrentLimit', 'Grid input limit', 'A', Venus.numericFormatter(), 0, 'rw');
	metricService.register('System/State', '/system/0/SystemState/State', 'System state', '', function(metric) {
		if (metric.rawValue == 0) return 'Off';
		if (metric.rawValue == 1) return 'Low power';
		if (metric.rawValue == 2) return 'VE.Bus Fault condition';
		if (metric.rawValue == 3) return 'Bulk charging';
		if (metric.rawValue == 4) return 'Absorption charging';
		if (metric.rawValue == 5) return 'Float charging';
		if (metric.rawValue == 6) return 'Storage mode';
		if (metric.rawValue == 7) return 'Equalisation charging';
		if (metric.rawValue == 8) return 'Passthru';
		if (metric.rawValue == 9) return 'Inverting';
		if (metric.rawValue == 10) return 'Assisting';
		if (metric.rawValue == 256) return 'Discharging';
		if (metric.rawValue == 257) return 'Sustain';
		return '--';
	}, 0);
	metricService.register('System/Mode', '/vebus/257/Mode', 'System mode', '', function(metric) {
		if (metric.rawValue == 1) return 'Charger only';
		if (metric.rawValue == 2) return 'Inverter only';
		if (metric.rawValue == 3) return 'ON';
		if (metric.rawValue == 4) return 'OFF';
		return '--';
	}, 0, 'rw');

	metricService.metrics['Ac/Grid/IsConnected'].addOnChangeCallback(function(metric) {
		if (metric.rawValue == 1) {
			document.getElementById('shorePowerContainer').classList.add('shorePower');
		}
		else {
			document.getElementById('shorePowerContainer').classList.remove('shorePower');
		}
	})

	metricService.metrics['Dc/Battery/Current'].addOnChangeCallback(function(metric) {
		var container = document.getElementById('batteryContainer');
		if (Number(metric.value) < 0) {
			container.classList.add('batteryDischarge')
			container.classList.remove('batteryCharge')
		}
		else {
			container.classList.add('batteryCharge')
			container.classList.remove('batteryDischarge')
		}
	})

	metricService.metrics['Dc/Battery/Soc'].addOnChangeCallback(function(metric) {
		var soc = metric.rawValue;
        [].forEach.call(document.styleSheets[0].cssRules, function(cssRule) {
			if (cssRule.selectorText == '.batteryProgress::after') {
                cssRule.style.top = (73-43*soc/100)+'%';
            }
		});
	})

	metricService.bindElements(document.body);
	metricService.start();
}
