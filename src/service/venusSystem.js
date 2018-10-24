import { isPathOfType, parseTopic, Topic } from "./util"
import { SERVICES } from "./topics"
import { DBUS_PATHS } from "../config/dbusPaths"

/**
 * @typedef {object} Equipment
 * @prop {object} battery
 * @prop {object} inverterCharger
 * @prop {object} inverterCharger.dcLoads
 * @prop {object} inverterCharger.acLoads
 * @prop {object} inverterCharger.shorePower
 * @prop {object} inverterCharger.system
 */

class VenusSystem {
  portalId = null
  vebusInstanceId = null
  systemInstanceId = null
  equipment

  constructor() {
    this.equipment = {
      battery: null,
      inverterCharger: {
        dcLoads: null,
        acLoads: null,
        shorePower: null,
        system: null
      }
    }
  }

  isInitialized = () => {
    return this.portalId && this.vebusInstanceId && this.systemInstanceId !== null
  }

  /**
   *
   * @param {"N" | "R" | "W"} type
   * @param dbusPath
   * @returns {string}
   */
  getTopicFromDbusPath = (type, dbusPath) => {
    if (SERVICES.SYSTEM.includes(dbusPath)) {
      return `${type}/${this.portalId}/system/${this.systemInstanceId}${dbusPath}`
    } else if (SERVICES.VEBUS.includes(dbusPath)) {
      return `${type}/${this.portalId}/vebus/${this.vebusInstanceId}${dbusPath}`
    } else {
      console.error(`Could not create path for type ${type} path ${dbusPath}`)
      return ""
    }
  }

  // Handling of the system components and their IDs below
  handleSystemMessage(topic, message) {
    const topicDetails = parseTopic(topic)
    this.handlePortalIdMessage(topicDetails, message) ||
      this.handleBaterryInfoMessages(topicDetails, message) ||
      this.handleDCLoads(topicDetails, message) ||
      this.handleACLoads(topicDetails, message) ||
      this.handleShorePower(topicDetails, message) ||
      this.handleSystemState(topicDetails, message) ||
      this.handleDeviceIds(topicDetails, message)
  }

  handlePortalIdMessage(topic, data) {
    if (topic.dbusPath === DBUS_PATHS.GENERAL.SERIAL) {
      this.portalId = data.value
      return true
    }
    return false
  }

  handleDeviceIds(topic, data) {
    if (topic.dbusPath === DBUS_PATHS.GENERAL.DEVICE_INSTANCE) {
      console.log(`DEVICE ${topic.serviceType} AVAILABLE WITH ID ${topic.deviceInstance}`)
      switch (topic.serviceType) {
        case "vebus":
          this.vebusInstanceId = topic.deviceInstance
          break
        case "system":
          this.systemInstanceId = topic.deviceInstance
          break
        case "battery":
        case "grid":
        case "pvinverter":
        case "solarcharger":
        case "tank":
        case "temperature":
        default:
          break
      }
      return true
    }
    return false
  }

  handleBaterryInfoMessages(topic, data) {
    if (isPathOfType(topic.dbusPath, DBUS_PATHS.BATTERY)) {
      if (!this.equipment.battery) {
        this.equipment.battery = {}
      }
      this.equipment.battery[topic.dbusPath] = data.value
      return true
    }
    return false
  }

  handleDCLoads(topic, data) {
    if (isPathOfType(topic.dbusPath, DBUS_PATHS.INVERTER_CHARGER.DC_LOADS)) {
      if (!this.equipment.inverterCharger.dcLoads) {
        this.equipment.inverterCharger.dcLoads = {}
      }
      this.equipment.inverterCharger.dcLoads[topic.dbusPath] = data.value
      return true
    }
    return false
  }

  handleACLoads(topic, data) {
    if (isPathOfType(topic.dbusPath, DBUS_PATHS.INVERTER_CHARGER.AC_LOADS)) {
      if (!this.equipment.inverterCharger.acLoads) {
        this.equipment.inverterCharger.acLoads = {}
      }
      this.equipment.inverterCharger.acLoads[topic.dbusPath] = data.value
      return true
    }
    return false
  }

  handleShorePower(topic, data) {
    if (isPathOfType(topic.dbusPath, DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER)) {
      if (!this.equipment.inverterCharger.shorePower) {
        this.equipment.inverterCharger.shorePower = {}
      }
      this.equipment.inverterCharger.shorePower[topic.dbusPath] = data.value
      return true
    }
    return false
  }

  handleSystemState(topic, data) {
    if (isPathOfType(topic.dbusPath, DBUS_PATHS.INVERTER_CHARGER.SYSTEM)) {
      if (!this.equipment.inverterCharger.system) {
        this.equipment.inverterCharger.system = {}
      }
      this.equipment.inverterCharger.system[topic.dbusPath] = data.value
      return true
    }
    return false
  }
}

export default VenusSystem
