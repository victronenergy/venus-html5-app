import { isPathOfType, parseTopic, Topic } from "./util"
import { SERVICES } from "./topics"
import { DBUS_PATHS } from "../config/dbusPaths"

type Equipment = {
  battery: any
  inverterCharger: {
    dcLoads?: any
    acLoads?: any
    shorePower?: any
    system?: any
  }
}

class VenusSystem {
  public portalId: string | null = null
  public vebusInstanceId: number | null = null
  public systemInstanceId: number | null = null
  public equipment: Equipment

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

  public isInitialized = () => {
    return this.portalId && this.vebusInstanceId && this.systemInstanceId !== null
  }

  public getTopicFromDbusPath = (type: "N" | "R" | "W", dbusPath: string) => {
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
  public handleSystemMessage(topic: string, message: any) {
    const topicDetails: Topic = parseTopic(topic)
    this.handlePortalIdMessage(topicDetails, message) ||
      this.handleBaterryInfoMessages(topicDetails, message) ||
      this.handleDCLoads(topicDetails, message) ||
      this.handleACLoads(topicDetails, message) ||
      this.handleShorePower(topicDetails, message) ||
      this.handleSystemState(topicDetails, message) ||
      this.handleDeviceIds(topicDetails, message)
  }

  private handlePortalIdMessage(topic: Topic, data: any) {
    if (topic.dbusPath === DBUS_PATHS.GENERAL.SERIAL) {
      this.portalId = data.value
      return true
    }
    return false
  }

  private handleDeviceIds(topic: Topic, data: any) {
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

  private handleBaterryInfoMessages(topic: Topic, data: any) {
    if (isPathOfType(topic.dbusPath, DBUS_PATHS.BATTERY)) {
      if (!this.equipment.battery) {
        this.equipment.battery = {}
      }
      this.equipment.battery[topic.dbusPath] = data.value
      return true
    }
    return false
  }

  private handleDCLoads(topic: Topic, data: any) {
    if (isPathOfType(topic.dbusPath, DBUS_PATHS.INVERTER_CHARGER.DC_LOADS)) {
      if (!this.equipment.inverterCharger.dcLoads) {
        this.equipment.inverterCharger.dcLoads = {}
      }
      this.equipment.inverterCharger.dcLoads[topic.dbusPath] = data.value
      return true
    }
    return false
  }

  private handleACLoads(topic: Topic, data: any) {
    if (isPathOfType(topic.dbusPath, DBUS_PATHS.INVERTER_CHARGER.AC_LOADS)) {
      if (!this.equipment.inverterCharger.acLoads) {
        this.equipment.inverterCharger.acLoads = {}
      }
      this.equipment.inverterCharger.acLoads[topic.dbusPath] = data.value
      return true
    }
    return false
  }

  private handleShorePower(topic: Topic, data: any) {
    if (isPathOfType(topic.dbusPath, DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER)) {
      if (!this.equipment.inverterCharger.shorePower) {
        this.equipment.inverterCharger.shorePower = {}
      }
      this.equipment.inverterCharger.shorePower[topic.dbusPath] = data.value
      return true
    }
    return false
  }

  private handleSystemState(topic: Topic, data: any) {
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
