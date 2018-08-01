/**
 * The Metric class represents a metric, including both meta-data and its current value.
 *
 * - A metric has a raw value which may be of any type, when this value changes any callbacks
 *   previously registered using the method addOnChangeCallback are fired.
 * - A metric uses a formatter function to convert the raw value to a display value (string).
 *   Use the provided defaultFormatter, numericFormatter functions or write your own to format a custom value.
 */
export class Metric {
	/** 
	 * Create a Metric instance.
	 * @param {string} key - A unique key identifying the metric.
	 * @param {string} description - A text description of the metric.
	 * @param {string} unit - The unit of the value the metric represents.
	 * @param {} formatter - The formatter function used to convert the raw value of the metric to a user-friendy display.
   * @param {number} timeout - The timeout in seconds until the value is
   * considered stale.
	 */
	constructor(key, description, unit, formatter, timeout) {
		this.key = key
		this.description = description
		this.unit = unit
		this.formatter = formatter === undefined ? defaultFormatter() : formatter
    this.timeout = timeout === undefined ? 0 : timeout
		this._rawValue = undefined
		this.callbacks = []
    this.timerReference = undefined
	}

	/**
	 * Get the formatted value of the metric by calling its formatter.
	 * @return {string} The formatted value.
	 */
	get value() {
    return '<span id=' + this.key + '>' + this.formatter(this) + '</a>';
  }

	/**
	 * Get the raw value of the metric.
	 * @return {} The raw value.
	 */
	get rawValue() { return this._rawValue }

  toStale(key) {
    var entry = document.getElementById(key).innerHTML;
    document.getElementById(key).innerHTML = "<span class=\"staleValues\">" + entry + "</span>";
  }

	/** 
	 * Set the raw value of the metric.
	 * This will also fire any callbacks registered using the addOnChangeCallback method.
	 * @param {} rawValue - The new raw value.
	 */
	set rawValue(rawValue) { 
		this._rawValue = rawValue

    if (this.timeout > 0) {
      clearTimeout(this.timerReference);
      this.timerReference = setTimeout(this.toStale.bind(this, this.key), this.timeout);
    }

		this.callbacks.forEach((callback) => { callback(this) })
	}

	/**
	 * Add a callback that is fired when the raw value of the metric changes.
	 * @param {(metric) => {}} callback - The callback function.
	 */
	addOnChangeCallback(callback) {
		this.callbacks.push(callback)
	}
}

/**
 * Create a default metric formatter which uses toString to format the raw value of a metric.
 * @param {string} defaultValue - The value that is displayed if the metric raw value is null or undefined.
 * @return A formatting function.
 */
export function defaultFormatter(defaultValue = '--') {
	return (metric) => {
		if (metric.rawValue === undefined || metric.rawValue === null) {
			return defaultValue + metric.unit
		}
		return metric.rawValue.toString() + metric.unit
	}
}

/**
 * Create a numeric metric formatter.
 * @param {numeric} precision  The number of decimals to display.
 * @param {number} factor - A scaling factor that is used to transform the raw value before display.
 * @param {string} defaultValue - The value that is displayed if the metric raw value is null or undefined.
 * @return A formatting function.
 */
export function numericFormatter(precision = 0, factor = 1.0, defaultValue = '--') {
	return (metric) => {
		if (metric.rawValue === undefined || metric.rawValue === null) {
			return defaultValue + metric.unit
		}
		let value = Number(metric.rawValue) * factor
		return precision === undefined
			? value.toString() + metric.unit
			: value.toFixed(precision) + metric.unit
	}
}
