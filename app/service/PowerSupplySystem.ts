import { isPathOfType, parseTopic, Topic } from "./util"
import { DBUS_PATHS, SERVICES } from "./topics"

type Equipment = {
  battery: any
  inverterCharger: {
    dcLoads?: any
    acLoads?: any
    shorePower?: any
    system?: any
  }
}

class PowerSupplySystem {
  public portalId: string | null = null
  public vebusInstanceId: number | null = null

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
    return this.portalId !== null && this.vebusInstanceId !== null
  }

  public handleNotification = (topic: string, message: Buffer) => {
    console.log(`['${topic}', ${message.toString()}],`)
    const topicDetails: Topic = parseTopic(topic)
    let data
    try {
      data = JSON.parse(message.toString())
    } catch (e) {
      data = {}
      console.log(topic, `[${message.toString()}]`, e)
    }
    let isHandled = false
    isHandled = isHandled || this.handlePortalIdMessage(topicDetails, data)
    isHandled = isHandled || this.handleBaterryInfoMessages(topicDetails, data)
    isHandled = isHandled || this.handleDCLoads(topicDetails, data)
    isHandled = isHandled || this.handleACLoads(topicDetails, data)
    isHandled = isHandled || this.handleShorePower(topicDetails, data)
    isHandled = isHandled || this.handleSystemState(topicDetails, data)
    isHandled = isHandled || this.handleDeviceIds(topicDetails, data)
    if (!isHandled) {
      this.handleEverythingElse(topicDetails, data)
    }

    return {
      path: topicDetails.dbusPath,
      value: data.value || null
    }
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
      console.log("DEVICE AVAILABLE", topic.serviceType, topic.deviceInstance)
      switch (topic.serviceType) {
        case "vebus":
          this.vebusInstanceId = topic.deviceInstance
          break
        case "system":
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
      // console.log('BATTERY: \n', this.equipment.battery);
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
      // console.log('INVERTER/CHARGER -- DC LOADS: \n', this.equipment.inverterCharger.dcLoads);
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
      // console.log('INVERTER/CHARGER -- AC LOADS: \n', this.equipment.inverterCharger.acLoads);
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
      // console.log('INVERTER/CHARGER -- SHORE POWER: \n', this.equipment.inverterCharger.shorePower);
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
      // console.log('INVERTER/CHARGER -- MULTIPLUS SYSTEM: \n', this.equipment.inverterCharger.system);
      return true
    }
    return false
  }

  private handleEverythingElse(topic: Topic, data: any) {
    // console.log(topic, data);
  }

  public getTopicFromDbusPath = (type: "N" | "R" | "W", dbusPath: string) => {
    if (SERVICES.SYSTEM.indexOf(dbusPath) !== -1) {
      return `${type}/${this.portalId}/system/0${dbusPath}`
    }
    if (SERVICES.VEBUS.indexOf(dbusPath) !== -1) {
      return `${type}/${this.portalId}/vebus/${this.vebusInstanceId}${dbusPath}`
    }
    return ""
  }
}

export default PowerSupplySystem
