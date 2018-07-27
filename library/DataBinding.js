/**  
 * The DataBinding class represents a one-way data binding between a
 * HTML element and a metric. When a new data binding is created it registers
 * a callback by calling addOnChangeCallback on the metric, which will
 * then be responsible for updating the element when the metric value changes.
 */
export class DataBinding
{
	/** 
	 * Create a data binding. 
	 * @param {HTMLElement} element - The HTML element that displays the metric.
	 * @param {string} elementProperty - The name of the property on the element that is updated when the metric changes (for instance innerHTML).
	 * @param {Metric} metric - The metric instance
	 * @param {string} metricProperty - The name of the property on the metric which holds the formatted value to display (for instance value).
	 */
	constructor(element, elementProperty, metric, metricProperty) {
		this.element = element
		this.elementProperty = elementProperty
		this.metric = metric
		this.metricProperty = metricProperty
		this.update()
		let ref = this
		this.metric.addOnChangeCallback((metric) => { ref.update() })
	}

	/** 
	 * Update the HTML element using the current metric data
	 */
	update() {
		this.element[this.elementProperty] = this.metric[this.metricProperty]
	}
}
