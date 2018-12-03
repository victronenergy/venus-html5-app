const mosca = require("mosca")
import { DBUS_PATHS } from "../src/config/dbusPaths"
import { AC_SOURCE_TYPE, ACTIVE_INPUT, SYSTEM_MODE, VEBUS_SYSTEM_STATE } from "../src/app/utils/constants"

// const US_PRODUCT_ID = 991260
const EU_PRODUCT_ID = 9760

const randomlyChangingPaths = [
  `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.VOLTAGE}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_1}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_2}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_3}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_1}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_2}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_3}`,
  `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.CURRENT}`,
  `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.CURRENT}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_1}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_2}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_3}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_1}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_2}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_3}`,
  `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.POWER}`,
  `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_1}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_2}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_3}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_1}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_2}`,
  `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_3}`,
  `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.SOC}`,
  `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.TIME_TO_GO}`
]

export class MockMQQTBroker {
  constructor(port = 9001) {
    this.subs = new Set([])
    this.intervalRef = null
    this.data = {}

    this.server = new mosca.Server({
      http: {
        port: port
      }
    })

    this.server.on("ready", () => {
      console.log(`Mosca server is up and running in port ${port}`)
    })

    this.server.on("subscribed", topic => {
      this.subs.add(topic)
      this.sendData(topic)
    })

    this.server.on("unsubscribed", topic => {
      this.subs.delete(topic)
    })

    this.server.on("clientConnected", () => {
      clearInterval(this.intervalRef)
      this.intervalRef = setInterval(this.sendRandomValues, 3000)
    })

    this.server.on("published", packet => {
      if (packet.topic.startsWith("W/")) {
        const path = packet.topic.replace("W", "N")
        const value = JSON.parse(packet.payload.toString()).value
        this.send(path, value)
      }
    })
  }

  send = (path, value) => {
    if (value) this.data[path] = value
    var message = {
      topic: path,
      payload: JSON.stringify({ value: value || {} }),
      qos: 0,
      retain: false
    }

    this.server.publish(message)
  }

  sendAlteringNumber = (path, step, initial, asInt) => {
    let value = (this.data[path] || initial) + getIncrement(step)
    this.send(path, asInt ? Math.round(value) : value)
  }

  sendCached = (path, initial) => {
    this.send(path, this.data[path] || initial)
  }

  sendRandomValues = () => {
    randomlyChangingPaths
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .forEach(this.sendData)
  }

  sendData = path => {
    switch (path) {
      // More or less static values, where the cached version should be used if available
      case "N/+/system/0/Serial":
        this.sendCached("N/mockPortalId/system/0/Serial", "mockPortalId")
        break
      case "N/+/+/+/DeviceInstance":
        this.sendCached("N/mockPortalId/system/0/DeviceInstance")
        this.sendCached("N/mockPortalId/vebus/257/DeviceInstance")
        break
      case "N/+/settings/+/Settings/SystemSetup/AcInput1":
        this.sendCached(`N/mockPortalId/settings/0${DBUS_PATHS.SETTINGS.AC_INPUT_TYPE1}`, AC_SOURCE_TYPE.GENERATOR)
        break
      case "N/+/settings/+/Settings/SystemSetup/AcInput2":
        this.sendCached(`N/mockPortalId/settings/0${DBUS_PATHS.SETTINGS.AC_INPUT_TYPE2}`, AC_SOURCE_TYPE.SHORE)
        break
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.PRODUCT_ID}`:
        this.sendCached(path, EU_PRODUCT_ID)
        break
      case `N/mockPortalId/settings/0${DBUS_PATHS.SETTINGS.AC_INPUT_TYPE1}`:
        this.sendCached(path, AC_SOURCE_TYPE.GENERATOR)
        break
      case `N/mockPortalId/settings/0${DBUS_PATHS.SETTINGS.AC_INPUT_TYPE2}`:
        this.sendCached(path, AC_SOURCE_TYPE.SHORE)
        break
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_INPUT}`:
        this.sendCached(path, ACTIVE_INPUT.NONE)
        break
      // /mockPortalId/vebus/257/Ac/In/2 =>  because shore power is in AC input 2
      case `N/mockPortalId/vebus/257/Ac/In/2${DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_IS_ADJUSTABLE}`:
        this.sendCached(path, true)
        break
      case `N/mockPortalId/vebus/257/Ac/In/2${DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_MAX}`:
        this.sendCached(path, 30)
        break
      case `N/mockPortalId/vebus/257/Ac/In/2${DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT}`:
        this.sendCached(path, 13)
        break
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE}`:
        this.sendCached(path, SYSTEM_MODE.ON)
        break
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE}`:
        this.sendCached(path, true)
        break
      case `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE}`:
        this.sendCached(path, VEBUS_SYSTEM_STATE.ABSORPTION_CHARGINNG)
        break
      case `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.STATE}`:
        this.sendCached(path, 2)
        break

      // Values that change randomly over time. Add to randomlyChangingPaths to enable random changes

      // Voltage
      case `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.VOLTAGE}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_1}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_2}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_3}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_1}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_2}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_3}`:
        this.sendAlteringNumber(path, 8, 180)
        break

      // Current
      case `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.CURRENT}`:
      case `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.CURRENT}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_1}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_2}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_3}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_1}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_2}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_3}`:
        this.sendAlteringNumber(path, 2, 15)
        break

      // Power
      case `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.POWER}`:
      case `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_1}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_2}`:
      case `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_3}`:
      case `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_1}`:
      case `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_2}`:
      case `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_3}`:
        this.sendAlteringNumber(path, 4, 150)
        break

      // Other
      case `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.SOC}`:
        this.sendAlteringNumber(path, 1, 50, true)
        break
      case `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.TIME_TO_GO}`:
        this.sendAlteringNumber(path, 500, 50000)
        break
    }
  }
}

const getIncrement = step => {
  return Math.random() * step - step / 2
}
