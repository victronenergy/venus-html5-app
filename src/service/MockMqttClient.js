import { DBUS_PATHS } from "../config/dbusPaths"
import { ClientSubscribeCallback, ISubscriptionMap } from "mqtt"
import { AC_SOURCE_TYPE, ACTIVE_INPUT, SYSTEM_MODE, VEBUS_SYSTEM_STATE } from "./topics"

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max))
}

const getRandomValueFromArray = array => {
  const randomIndex = getRandomInt(array.length)
  return array[randomIndex]
}

export default class FakeMqttClient {
  onMessage = null // this is the function that 'sends data to the ui'
  initialized = false

  initService(callbackFn) {
    callbackFn("N/mockPortalId/system/0/Serial", JSON.stringify({ value: "mockPortalId" }))
    callbackFn("N/mockPortalId/system/0/DeviceInstance", JSON.stringify({}))
    callbackFn("N/mockPortalId/vebus/257/DeviceInstance", JSON.stringify({}))
    callbackFn(
      `N/mockPortalId/settings/0${DBUS_PATHS.SETTINGS.AC_INPUT_TYPE1}`,
      JSON.stringify({ value: AC_SOURCE_TYPE.GENERATOR })
    )
    callbackFn(
      `N/mockPortalId/settings/0${DBUS_PATHS.SETTINGS.AC_INPUT_TYPE2}`,
      JSON.stringify({ value: AC_SOURCE_TYPE.SHORE })
    )
  }

  sendMockData = () => {
    this.sendMockSystemConfig()
    this.sendMockActiveSource()
    this.sendMockShorePowerLimits()
    this.sendMockSystemStatus()

    this.onMessage(
      `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.VOLTAGE}`,
      JSON.stringify({ value: Math.random() * 100 })
    )
    this.onMessage(
      `N/mockPortalId/system/0${DBUS_PATHS.BATTERY.CURRENT}`,
      JSON.stringify({ value: Math.random() * 100 })
    )
    this.onMessage(`N/mockPortalId/system/0${DBUS_PATHS.BATTERY.POWER}`, JSON.stringify({ value: Math.random() * 100 }))
    this.onMessage(`N/mockPortalId/system/0${DBUS_PATHS.BATTERY.SOC}`, JSON.stringify({ value: Math.random() * 100 }))
    this.onMessage(
      `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.CURRENT}`,
      JSON.stringify({ value: Math.random() * 100 })
    )
    this.onMessage(
      `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER}`,
      JSON.stringify({ value: Math.random() * 100 })
    )
    this.onMessage(
      `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.VOLTAGE}`,
      JSON.stringify({ value: Math.random() * 100 })
    )
    this.onMessage(
      `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.CURRENT}`,
      JSON.stringify({ value: Math.random() * 100 })
    )
    this.onMessage(
      `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.POWER}`,
      JSON.stringify({ value: Math.random() * 100 })
    )
  }

  sendMockSystemConfig() {
    const US_PRODUCT_ID = 991260
    const EU_PRODUCT_ID = 9760
    this.onMessage(
      `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.PRODUCT_ID}`,
      JSON.stringify({ value: EU_PRODUCT_ID })
    )
  }

  sendMockActiveSource() {
    this.onMessage(
      `N/mockPortalId/settings/0${DBUS_PATHS.SETTINGS.AC_INPUT_TYPE1}`,
      JSON.stringify({ value: AC_SOURCE_TYPE.GENERATOR })
    )

    this.onMessage(
      `N/mockPortalId/settings/0${DBUS_PATHS.SETTINGS.AC_INPUT_TYPE2}`,
      JSON.stringify({ value: AC_SOURCE_TYPE.SHORE })
    )

    this.onMessage(
      `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_INPUT}`,
      JSON.stringify(
        getRandomValueFromArray([
          { value: ACTIVE_INPUT.INPUT_0 },
          { value: ACTIVE_INPUT.INPUT_1 },
          { value: ACTIVE_INPUT.NONE }
        ])
      )
    )
    this.sendMockNumber(`N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_1}`)
    this.sendMockNumber(`N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_2}`)
    this.sendMockNumber(`N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_3}`)

    this.sendMockNumber(`N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_1}`)
    this.sendMockNumber(`N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_2}`)
    this.sendMockNumber(`N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_3}`)

    this.sendMockNumber(`N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_1}`)
    this.sendMockNumber(`N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_2}`)
    this.sendMockNumber(`N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_3}`)
  }

  sendMockShorePowerLimits() {
    this.onMessage(
      `N/mockPortalId/vebus/257/Ac/In/${ACTIVE_INPUT.INPUT_1}${DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT}`,
      JSON.stringify({ value: 50 })
    )
    this.onMessage(
      `N/mockPortalId/vebus/257/Ac/In/${ACTIVE_INPUT.INPUT_1}${
        DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_IS_ADJUSTABLE
      }`,
      JSON.stringify({ value: true })
    )
    this.onMessage(
      `N/mockPortalId/vebus/257/Ac/In/${ACTIVE_INPUT.INPUT_1}${
        DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_MAX
      }`,
      JSON.stringify({ value: 30 })
    )
  }

  sendMockSystemStatus() {
    this.onMessage(
      `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE}`,
      JSON.stringify(getRandomValueFromArray(Object.values(SYSTEM_MODE).map(mode => ({ value: mode }))))
    )

    this.onMessage(
      `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE}`,
      JSON.stringify({ value: true })
    )

    this.onMessage(
      `N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE}`,
      JSON.stringify(getRandomValueFromArray(Object.values(VEBUS_SYSTEM_STATE).map(mode => ({ value: mode }))))
    )
  }

  sendMockNumber(path) {
    this.onMessage(path, JSON.stringify({ value: Math.random() * 100 }))
  }

  // Mocked functions
  end() {
    console.log("end")
  }

  once(action, callback) {
    console.log(`once: ${action}`)
    callback()
  }

  subscribe(sub, callback) {
    console.log("subscribe:", sub)
  }

  unsubscribe(sub, callback) {
    console.log("unsubscribe:", sub)
  }

  removeAllListeners(event) {
    console.log("Remove all listeners")
    this.initialized = true
  }

  on(action, callback) {
    console.log(`on: ${action}`)
    if (action === "connect" || action === "disconnect" || action === "reconnect") {
      callback()
    } else if (action === "message" && !this.initialized) {
      this.initService(callback)
    } else if (action === "message" && !this.onMessage) {
      this.onMessage = callback
      setInterval(this.sendMockData, 2000)
    } else if (action === "message") {
    } else console.log(action)
  }

  publish(topic, data) {
    console.log(`publish [${topic}]: ${JSON.stringify(data)}`)
  }
}
