export class DataBinding {
	constructor(element, elementProperty, metric, metricProperty) {
		this.element = element
		this.elementProperty = elementProperty
		this.metric = metric
		this.metricProperty = metricProperty
		this.update()
		let ref = this
		this.metric.addOnChangeCallback((metric) => { ref.update() })
	}

	update() {
		this.element[this.elementProperty] = this.metric[this.metricProperty]
	}
}
