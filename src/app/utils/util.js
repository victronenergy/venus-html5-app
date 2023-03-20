import { VEBUS_SYSTEM_STATE } from "./constants"

/**
 * @typedef {object} Topic
 *
 * @prop {"N" | "R" | "W"} type
 * @prop {string} portalId
 * @prop {string} serviceType
 * @prop {string} deviceInstance
 * @prop {string} dbusPath
 */

/**
 * Splits a topic string into an object with properties for each "part"
 *
 * Topic structure is:
 * N/<portal ID>/<service_type>/<device instance>/<D-Bus path>
 *
 * See details at https://github.com/victronenergy/dbus-mqtt
 * @returns {Topic}
 */
export const parseTopic = (topic) => {
  const parts = topic.split("/")
  const dbusPathParts = parts.splice(4)
  const isAcIn = dbusPathParts[0] === "Ac" && dbusPathParts[1] === "In"
  return {
    type: parts[0],
    portalId: parts[1],
    serviceType: parts[2],
    deviceInstance: parts[3] === "+" ? "+" : parseInt(parts[3]),
    dbusPath: "/" + (isAcIn ? dbusPathParts.splice(3).join("/") : dbusPathParts.join("/")),
  }
}

export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href
  name = name.replace(/[[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

export const flatten = (arrays) => {
  return [].concat(...arrays)
}

// keys from common translations
export const systemStateFormatter = (value) => {
  switch (value) {
    case VEBUS_SYSTEM_STATE.OFF:
      return "off"
    case VEBUS_SYSTEM_STATE.LOW_POWER:
      return "lowPower"
    case VEBUS_SYSTEM_STATE.FAULT_CONDITION:
      return "fault"
    case VEBUS_SYSTEM_STATE.BULK_CHARGING:
      return "bulkCharging"
    case VEBUS_SYSTEM_STATE.ABSORPTION_CHARGINNG:
      return "absorptionCharging"
    case VEBUS_SYSTEM_STATE.FLOAT_CHARGING:
      return "floatCharging"
    case VEBUS_SYSTEM_STATE.STORAGE_MODE:
      return "storageMode"
    case VEBUS_SYSTEM_STATE.EQUALISATION_CHARGING:
      return "equalisationCharging"
    case VEBUS_SYSTEM_STATE.PASSTHRU:
      return "passthru"
    case VEBUS_SYSTEM_STATE.INVERTING:
      return "inverting"
    case VEBUS_SYSTEM_STATE.ASSISTING:
      return "assisting"
    case VEBUS_SYSTEM_STATE.POWER_SUPPLY_MODE:
      return "powerSupplyMode"
    case VEBUS_SYSTEM_STATE.DISCHARGING:
      return "discharging"
    case VEBUS_SYSTEM_STATE.SUSTAIN:
      return "sustain"
    default:
      return "emptyBar"
  }
}

export const byteSize = (str) => new Blob([str]).size

export const isError = (error) => {
  return !!(error && error.stack && error.message)
}
