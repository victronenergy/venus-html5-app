import { isPathOfType, parseTopic, Topic } from "./util"
import { AC_SOURCE_TYPE, SERVICES } from "./topics"
import { DBUS_PATHS } from "../config/dbusPaths"
import Logger from "../logging/logger"

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
  acInput1 = null
  acInput2 = null

  /**
   * "Shore" and "Grid" are just different names for the same thing
   * "Shore" is for boats and "Grid" is for land based systems
   */
  shoreOrGridPowerInput = null
  generatorInput = null
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
    return this.portalId && this.vebusInstanceId && this.systemInstanceId !== null && this.acInput1 !== null && this.acInput2 !== null
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
    } else if (SERVICES.SHORE_POWER.includes(dbusPath)) {
      return `${type}/${this.portalId}/vebus/${this.vebusInstanceId}/Ac/In/${this.shoreOrGridPowerInput}${dbusPath}`
    } else if (SERVICES.VEBUS.includes(dbusPath)) {
      return `${type}/${this.portalId}/vebus/${this.vebusInstanceId}${dbusPath}`
    } else if (SERVICES.SETTINGS.includes(dbusPath)) {
      return `${type}/${this.portalId}/settings/0${dbusPath}`
    } else {
      Logger.error(`Unknown D-bus path - please implement! type: ${type}, path: '${dbusPath}'`)
      return ""
    }
  }

  // Handling of the system components and their IDs below
  handleSystemMessage(topic, message) {
    const topicDetails = parseTopic(topic)
    this.handlePortalIdMessage(topicDetails, message) ||
      this.handleDeviceIds(topicDetails, message) ||
      this.handleSettings(topicDetails, message) ||
      this.handleBaterryInfoMessages(topicDetails, message) ||
      this.handleDCLoads(topicDetails, message) ||
      this.handleACLoads(topicDetails, message) ||
      this.handleShorePower(topicDetails, message) ||
      this.handleSystemState(topicDetails, message)
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
      Logger.log(`DEVICE ${topic.serviceType} AVAILABLE WITH ID ${topic.deviceInstance}`)
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

  handleSettings(topic, data) {
    if (isPathOfType(topic.dbusPath, DBUS_PATHS.SETTINGS)) {
      let input = null
      switch (topic.dbusPath) {
        case DBUS_PATHS.SETTINGS.AC_INPUT_TYPE1:
          this.acInput1 = data.value
          input = 0
          break
        case DBUS_PATHS.SETTINGS.AC_INPUT_TYPE2:
          this.acInput2 = data.value
          input = 1
          break
        default:
          break
      }

      switch (data.value) {
        case AC_SOURCE_TYPE.SHORE:
        case AC_SOURCE_TYPE.GRID:
          this.shoreOrGridPowerInput = input + 1
          break
        case AC_SOURCE_TYPE.GENERATOR:
          this.generatorInput = input + 1
          break
        default:
          break
      }
    }
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
