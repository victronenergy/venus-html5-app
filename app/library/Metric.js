/**
 * The Metric class represents a metric, including both meta-data and its current value.
 *
 * - A metric has a raw value which may be of any type, when this value changes any callbacks
 *   previously registered using the method addOnChangeCallback are fired.
 * - A metric uses a formatter function to convert the raw value to a display value (string).
 *   Use the provided defaultFormatter, numericFormatter functions or write your own to format a custom value.
 */
class Metric {
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
}

/**
 * Create a default metric formatter which uses toString to format the raw value of a metric.
 * @param {string} defaultValue - The value that is displayed if the metric raw value is null or undefined.
 * @return A formatting function.
 */
function defaultFormatter(defaultValue = "--") {
  return metric => {
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
function numericFormatter(precision = 0, factor = 1.0, defaultValue = "--") {
  return value => {
    if (!value) {
      return defaultValue
    }
    let numericValue = Number(value) * factor
    return precision === undefined ? numericValue.toString() : numericValue.toFixed(precision)
  }
}

function systemStateFormatter(value) {
  if (value == 0) return "Off"
  if (value == 1) return "Low power"
  if (value == 2) return "VE.Bus Fault condition"
  if (value == 3) return "Bulk charging"
  if (value == 4) return "Absorption charging"
  if (value == 5) return "Float charging"
  if (value == 6) return "Storage mode"
  if (value == 7) return "Equalisation charging"
  if (value == 8) return "Passthru"
  if (value == 9) return "Inverting"
  if (value == 10) return "Assisting"
  if (value == 256) return "Discharging"
  if (value == 257) return "Sustain"
  return "--"
}

function systemModeFormatter(value) {
  if (value == 1) return "Charger only"
  if (value == 2) return "Inverter only"
  if (value == 3) return "ON"
  if (value == 4) return "OFF"
  return "--"
}

function gridConnected(value) {
  if (value == 1) {
    document.getElementById("shorePowerContainer").classList.add("shorePower")
  } else {
    document.getElementById("shorePowerContainer").classList.remove("shorePower")
  }
}

function batteyContainerStatus(value) {
  var container = document.getElementById("batteryContainer")
  if (Number(value) < 0) {
    container.classList.add("batteryDischarge")
    container.classList.remove("batteryCharge")
  } else {
    container.classList.add("batteryCharge")
    container.classList.remove("batteryDischarge")
  }
}

function updateModebuttonClasses(value) {
  Array.from(document.getElementsByClassName("modeButton")).forEach(element => {
    element.classList.remove("modeBtnOn")
  })
  switch (value) {
    case "ON":
      document.getElementById("setModeOnButton").classList.add("modeBtnOn")
      break
    case "OFF":
      document.getElementById("setModeOffButton").classList.add("modeBtnOn")
      break
    case "Charger only":
      document.getElementById("setModeChargeOnlyButton").classList.add("modeBtnOn")
      break
  }
}
