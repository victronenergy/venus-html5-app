/**
 * The MetricService is a user-facing service that combines the functionality
 * of the library in a simple package. It's meant to be the main interaction point 
 * to any consumers.
 *
 * - Construct the service using a provided device interface (for instance a MqttInterface)
 * - Register metrics using the register method
 * - Auto-create data bindings from HTML by calling the bindElements method and passing document.body as the input parameter
 * - Request reads and writes by calling the read and write methods
 * - Listen to changes to registered metrics using the onUpdate callback (metric) => {}
 * - Listen to changes to any metric using the onRawUpdate callback (path, value) => {}
 */
export class MetricService {
	/**
	 * Create a new MetricService instance.
	 * @param {Interface} deviceInterface - The device interface to use.
	 */
	constructor(deviceInterface) {
		this.deviceInterface = deviceInterface
		this.metrics = {}
		this.bindings = []
	}

	/**
	 * Start the service.
	 */
	start() {
		let ref = this
		this.deviceInterface.onUpdate = (key, value) => {
			let metric = ref.metrics[key]
			if (metric !== undefined) {
				metric.rawValue = value
				if (ref.onUpdate !== undefined) {
					ref.onUpdate(metric)
				}
			}
		}
		this.deviceInterface.onRawUpdate = (path, value) => {
			if (ref.onRawUpdate !== undefined) {
				ref.onRawUpdate(path, value)
			}			
		}
		this.deviceInterface.connect()
	}

	/**
	 * Stop the service.
	 */
	stop() {
		this.deviceInterface.disconnect()
	}

	/**
	 * Register a metric.
	 * @param {string} key - The metric key.
	 * @param {string} path - The path of the metric as used by the deviceInterface.
	 * @param {string} description - A text description of the metric.
	 * @param {string} unit - The unit of the value the metric represents.
	 * @param {} formatter - The formatter function used to convert the raw value of the metric to a user-friendy display.
	 * @param {string} access - The access of the metric (r/w/rw).
	 * @return {Metric} The registered metric
	 */
	register(key, path, description, unit, formatter, timeout, access = 'r') {
		let metric = new Venus.Metric(key, description, unit, formatter, timeout)
		this.metrics[key] = metric
		if (path !== undefined) {
			this.deviceInterface.register(key, path, access)
		}
		return metric
	}

	/**
	 * Unregister a previously registered metric.
	 * @param {string} key - The metric key.
	 */
	unregister(key) {
		this.metrics[key] = undefined
		this.deviceInterface.unregister(key)
	}

	/** 
	 * Create a data binding. 
	 * @param {HTMLElement} element - The HTML element that displays the metric.
	 * @param {string} elementProperty - The name of the property on the element that is updated when the metric changes (for instance innerHTML).
	 * @param {Metric} metric - The metric instance
	 * @param {string} metricProperty - The name of the property on the metric which holds the formatted value to display (for instance value).
	 */
	bind(element, elementProperty = 'innerHTML', metricKey, metricProperty = 'value') {
		let metric = this.metrics[metricKey]
		if (metric === undefined) {
			throw `Binding failed. No registered metric ${metricKey} was found.`
		}
		this.bindings.push(new Venus.DataBinding(element, elementProperty, metric, metricProperty))
	}

	/**
	 * Remove any data binding matching the given parameters.
	 * @param {HTMLElement} element - The HTML element that displays the metric.
	 * @param {string} elementProperty - The name of the property on the element that is updated when the metric changes (for instance innerHTML).
	 * @param {Metric} metric - The metric instance
	 * @param {string} metricProperty - The name of the property on the metric which holds the formatted value to display (for instance value).
	 */
	unbind(element, elementProperty, metricKey, metricProperty) {
		this.bindings = this.bindings.filter(binding => binding.element !== element || binding.elementProperty !== elementProperty || binding.metric.key !== metricKey || binding.metricProperty !== metricProperty)
	}

	/**
	 * Create data bindings from HTML.
	 * Recursive method that propagates the DOM.
	 * @param {HTMLElement} element - The element to create bindings for.
	 */
	bindElements(element) {
		let ref = this
		for (let i=0; i<element.childNodes.length; i++) {
			let childNode = element.childNodes[i]
			if (childNode.attributes !== undefined) {
				let dataMetricAttribute = childNode.attributes['data-metric']
				let dataMetricPropertyAttribute = childNode.attributes['data-metric-property']
				let dataBindingAttribute = childNode.attributes['data-binding']
				let dataBindingProperty = 'innerHTML'
				if (dataBindingAttribute !== undefined) {
					dataBindingProperty = dataBindingAttribute.nodeValue
				}
				let dataMetricProperty = 'value'
				if (dataMetricPropertyAttribute !== undefined) {
					dataMetricProperty = dataMetricPropertyAttribute.nodeValue
				}
				if (dataMetricAttribute !== undefined) {
					let metric = ref.metrics[dataMetricAttribute.nodeValue]
					if (metric !== undefined) {
						ref.bindings.push(new Venus.DataBinding(childNode, dataBindingProperty, metric, dataMetricProperty))
					}
					else {
						console.warn(`Binding element failed. No registered metric ${dataMetricAttribute.nodeValue} was found.`)
					}
				}
			}
			ref.bindElements(childNode)
		}
	}

	/**
	 * Request reading the metric with the given key.
	 * @param {string} key - The metric key.
	 */
	read(key) {
		this.deviceInterface.read(key)
	}

	/**
	 * Request writing the metric with the given key.
	 * @param {string} key - The metric key.
	 * @param {} value - The value to write.
	 */
	write(key, value) {
		this.deviceInterface.write(key, value)
	}
}
