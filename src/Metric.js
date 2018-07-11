export class Metric {
	constructor(key, description, unit, formatter) {
		this.key = key
		this.description = description
		this.unit = unit
		this.formatter = formatter === undefined ? defaultFormatter() : formatter
		this._rawValue = undefined
		this.callbacks = []
	}

	/* Gets the formatted value of the metric */
	get value() { return this.formatter(this) }

	/* Gets the raw value of the metric */
	get rawValue() { return this._rawValue }

	/* Sets the raw value of the metric
	 * This will also fire any registered callbacks 
	 */
	set rawValue(rawValue) { 
		this._rawValue = rawValue
		this.callbacks.forEach((callback) => { callback(this) })
	}

	addOnChangeCallback(callback) {
		this.callbacks.push(callback)
	}
}

export function defaultFormatter(defaultValue = '--') {
	return (metric) => {
		if (metric.rawValue === undefined || metric.rawValue === null) {
			return defaultValue
		}
		return metric.rawValue.toString()
	}
}

export function numericFormatter(precision = 0, factor = 1.0, defaultValue = '--') {
	return (metric) => {
		if (metric.rawValue === undefined || metric.rawValue === null) {
			return defaultValue
		}
		var value = Number(metric.rawValue) * factor
		return precision === undefined
			? value.toString()
			: value.toFixed(precision)
	}
}
