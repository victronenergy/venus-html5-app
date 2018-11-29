import { BATTERY_STATE } from "../service/topics"

function numericFormatter(precision = 0, factor = 1.0, defaultValue = "--") {
  return value => {
    if (value === null || value === undefined) {
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

export { numericFormatter, systemModeFormatter, systemStateFormatter }
