![screenshot](https://raw.githubusercontent.com/victronenergy/venus-webapp/master/victron-webapp-screenshot.png "")

# Venus OS hosted web app

The project consist of two main components:

* Venus metric library `/library`
* Web app `/app`

### Setup environment

	npm install

### Building the Library

To build the metric library run the following command:

	npm run webpack

This will output a `venus-metrics.min.js` file in the build folder which can be used in a browser based web app. In fact, at the moment there is a link in the app/ directory to the file created here in the build folder, which is useful for development to make sure you alway serve the latest version of the library.

For hosting the app, only the app/ directory is nedded, _if_ you _copy_ the `venus-metrics.min.js` into the app/js/directory instead of the link.

## Running the App in a Dev Environment

Since the app is reading MQTT data and runs in a browser, it needs to be able to read MQTT from Venus via WebSocket.

In the current configuration, the Venus paho-mqtt server is not configured for offering MQTT via WebSocket, therefore we provide a small relay, that reads MQTT from the Venus device and relays it to a MQTT broker on localhost.

This could be your development machine as well as e.g. a dedicated RaspberryPi.

By default, the page will try to connect to the websockified mqtt on the hostname in the url, on port 9001. It is also possible
to specify a different host and port: use the `host` and `port` query parameters:

	file:///home/matthijs/dev/venus-webapp/app/index.html?host=192.168.178.129&port=1884

This will also change the URL behind the Remote Console button.

### 1. Running the relay

Prerequisite: you need to have an MQTT broker running on localhost, with MQTT over WebSockets configured additionally to the default MQTT transport.

If you don't have one running or don't want to install it, you can run one using docker:

	docker run -ti -p 1883:1883 -p 9001:9001 toke/mosquitto

(which will fail, if you have one already running on ports 1883 and 9001)

In the project's base directory edit 'mqtt-relay.js': in the top, set the IP address and portalID of your Venus device, then run

	node mqtt-relay.js

### 2. Run the web server

In the 'app' directory, run:

	python -m http.server 8080

for Python3, or

	python -m SimpleHTTPServer 8080

for Python2.

### 3. Run the announcer

In the projects base directory, run:

	./service_announcement.sh

## Development

### Setting up a metric service

```javascript
var deviceInterface = new Venus.MqttInterface('localhost', 9001);
var metricService = new Venus.MetricService(deviceInterface);
```

### Metrics

When we have the metric service in place we need to setup our metrics. Each metric needs to have a unique key, a path to the device interface, some meta-data and a formatter that turns the raw value into a user-friendy string for display. All metric also has an access specifier that determines read/writeability.

NOTE: A metric needs to have the correct access for read/write to work as expected. `'r', 'w' or 'rw'`

The available VenusOS dbus paths can be found at: <https://github.com/victronenergy/venus/wiki/dbus>

#### Defining metrics

The following line will register a metric `dc/battery/voltage` that will update using the `/system/0/Dc/Battery/Voltage` dbus path. The display is then formatted with 1 decimal point. The `'r'` represents the access specifier.

	metricService.register('dc/battery/voltage', '/system/0/Dc/Battery/Voltage', 'Voltage', 'V', Venus.numericFormatter(1), 'r');

#### Custom formatting

It is also possible to write completely custom formatting.

```javascript
metricService.register('system/mode', '/vebus/257/Mode', 'System mode', '', function(metric) {
  if (metric.rawValue == 1) return 'Charger only';
  if (metric.rawValue == 2) return 'Inverter only';
  if (metric.rawValue == 3) return 'ON';
  if (metric.rawValue == 4) return 'OFF';
  return '--';
}, 'rw');
```

## Data binding

### Data binding using HTML

The easiest way of presenting the metric data is by using html attributes. This method simply uses a property on the metric to update a property of a HTML element.

* `data-metric` contains the metric key to bind and is required.
* `data-metric-property` contains the property on the metric to display and is optional (defaults to `value`).
* `data-binding` contains the property on the element to update and is optional (defaults to `innerHTML`).

```html
<div data-metric="dc/battery/power"></div>
<div data-metric="dc/battery/power" data-property="rawValue"></div>
<input type="checkbox" data-metric="dc/battery/ischarging" data-binding="checked"/>
```

To hook up the bindings one must call the `bindElements` method on the metric service:

```javascript
metricService.bindElements();
```

### Custom data binding

Sometimes the simple property binding is not enough. Maybe you need to use some script that is more complex. In those cases subscribe to the metrics on change callback:

```javascript
metric.addOnChangeCallback(function(metric) {
  var message = metric.description + ' = ' + metric.value + metric.unit;
  document.getElementById('some-id').innerHTML = message;
});
```

## Metric service callbacks

You can also subscribe to metric changes using callbacks and implement a completely custom data binding.

### Registered metric data

The `onUpdate` callback is raised when a registered metric raw value changes.

```javascript
metricService.onUpdate = function(metric) {
  console.log(metric.key + '=' + metric.value);
};
```

### Raw device interface data

The `onRawUpdate` callback gives you all updates from the device interface.

```javascript
metricService.onRawUpdate = function(path, value) {
  console.log(path + '=' + value);
};
```
