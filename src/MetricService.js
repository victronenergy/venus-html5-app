export class MetricService {
	constructor(deviceInterface) {
		this.deviceInterface = deviceInterface
		this.metrics = {}
		this.bindings = []
	}

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

	stop() {
		this.deviceInterface.disconnect()
	}

	register(key, path, description, unit, formatter, access = 'r') {
		let metric = new Venus.Metric(key, description, unit, formatter)
		this.metrics[key] = metric
		if (path !== undefined) {
			this.deviceInterface.register(key, path, access)
		}
		return metric
	}

	unregister(key) {
		this.metrics[key] = undefined
		this.deviceInterface.unregister(key)
	}

	bind(element, elementProperty = 'innerHTML', metricKey, metricProperty = 'value') {
		let metric = this.metrics[metricKey]
		if (metric === undefined) {
			throw `Binding failed. No registered metric ${metricKey} was found.`
		}
		this.bindings.push(new Venus.DataBinding(element, elementProperty, metric, metricProperty))
	}

	unbind(element, elementProperty, metricKey, metricProperty) {
		this.bindings = this.bindings.filter(binding => binding.element !== element || binding.elementProperty !== elementProperty || binding.metric.key !== metricKey || binding.metricProperty !== metricProperty)
	}

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

	read(key) {
		this.deviceInterface.read(key)
	}

	write(key, value) {
		this.deviceInterface.write(key, value)
	}
}
