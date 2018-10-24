import { DBUS_PATHS } from "../config/dbusPaths"
import { ClientSubscribeCallback, ISubscriptionMap } from "mqtt"

export default class FakeMqttClient {
  onMessage = null // this is the function that 'sends data to the ui'
  initialized = false

  initService(callbackFn) {
    callbackFn("N/mockPortalId/system/0/Serial", JSON.stringify({ value: "mockPortalId" }))
    callbackFn("N/mockPortalId/system/0/DeviceInstance", JSON.stringify({}))
    callbackFn("N/mockPortalId/vebus/257/DeviceInstance", JSON.stringify({}))
  }

  sendMockData = () => {
    this.onMessage(`N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE}`, JSON.stringify({ value: 1 }))
    this.onMessage(`N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE}`, JSON.stringify({ value: 4 }))
    this.onMessage(`N/mockPortalId/system/0${DBUS_PATHS.INVERTER_CHARGER.AC_SOURCE}`, JSON.stringify({ value: 1 }))
    this.onMessage(
      `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT}`,
      JSON.stringify({ value: 50 })
    )
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
    this.onMessage(
      `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.VOLTAGE}`,
      JSON.stringify({ value: Math.random() * 100 })
    )
    this.onMessage(
      `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT}`,
      JSON.stringify({ value: Math.random() * 100 })
    )
    this.onMessage(
      `N/mockPortalId/vebus/257${DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.POWER}`,
      JSON.stringify({ value: Math.random() * 100 })
    )
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
    console.log(`publish: ${JSON.stringify(data)}`)
  }
}
