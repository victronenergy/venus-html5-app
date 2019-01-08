const mosca = require("mosca")
import { AC_SOURCE_TYPE, ACTIVE_INPUT, SYSTEM_MODE, VEBUS_SYSTEM_STATE } from "../src/app/utils/constants"

// const US_PRODUCT_ID = 991260
const EU_PRODUCT_ID = 9760

const randomlyChangingPaths = [
  "N/mockPortalId/system/0/Dc/Battery/Voltage",
  "N/mockPortalId/system/0/Dc/Battery/Current",
  "N/mockPortalId/system/0/Dc/Battery/Power",
  "N/mockPortalId/system/0/Dc/Battery/Soc",
  "N/mockPortalId/system/0/Dc/Battery/TimeToGo",
  "N/mockPortalId/vebus/257/Ac/ActiveIn/L1/V",
  "N/mockPortalId/vebus/257/Ac/ActiveIn/L2/V",
  "N/mockPortalId/vebus/257/Ac/ActiveIn/L3/V",
  "N/mockPortalId/vebus/257/Ac/Out/L1/V",
  "N/mockPortalId/vebus/257/Ac/Out/L2/V",
  "N/mockPortalId/vebus/257/Ac/Out/L3/V",
  "N/mockPortalId/vebus/257/Ac/ActiveIn/L1/I",
  "N/mockPortalId/vebus/257/Ac/ActiveIn/L2/I",
  "N/mockPortalId/vebus/257/Ac/ActiveIn/L3/I",
  "N/mockPortalId/vebus/257/Ac/Out/L1/I",
  "N/mockPortalId/vebus/257/Ac/Out/L2/I",
  "N/mockPortalId/vebus/257/Ac/Out/L3/I",
  "N/mockPortalId/system/0/Dc/System/Power",
  "N/mockPortalId/vebus/257/Ac/ActiveIn/L1/P",
  "N/mockPortalId/vebus/257/Ac/ActiveIn/L2/P",
  "N/mockPortalId/vebus/257/Ac/ActiveIn/L3/P",
  "N/mockPortalId/system/0/Ac/ConsumptionOnOutput/L1/Power",
  "N/mockPortalId/system/0/Ac/ConsumptionOnOutput/L2/Power",
  "N/mockPortalId/system/0/Ac/ConsumptionOnOutput/L3/Power",
  "N/mockPortalId/system/0/Dc/Pv/Power",
  "N/mockPortalId/system/0/Dc/Pv/Current"
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
      // setTimeout(() => {
      //   this.sendNull("N/mockPortalId/system/0/Dc/Battery/Voltage")
      //   this.sendNull("N/mockPortalId/system/0/Dc/Battery/Current")
      //   this.sendNull("N/mockPortalId/system/0/Dc/Battery/Power")
      // }, 5000)
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

  sendNull = path => {
    var message = {
      topic: path,
      payload: JSON.stringify({ value: null }),
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
      case "N/+/vebus/+/DeviceInstance":
        this.sendCached("N/mockPortalId/vebus/257/DeviceInstance", 257)
        break
      case "N/mockPortalId/battery/+/DeviceInstance":
        this.sendCached("N/mockPortalId/battery/0/DeviceInstance", 0)
        break
      case "N/mockPortalId/system/0/ActiveBatteryService":
        this.sendCached("N/mockPortalId/system/0/ActiveBatteryService", "duck/0")
        break
      case "N/mockPortalId/vebus/257/ProductId":
        this.sendCached(path, EU_PRODUCT_ID)
        break
      case "N/mockPortalId/settings/0/Settings/SystemSetup/AcInput1":
        this.sendCached(path, AC_SOURCE_TYPE.GENERATOR)
        break
      case "N/mockPortalId/settings/0/Settings/SystemSetup/AcInput2":
        this.sendCached(path, AC_SOURCE_TYPE.SHORE)
        break
      case "N/mockPortalId/vebus/257/Ac/ActiveIn/ActiveInput":
        this.sendCached(path, ACTIVE_INPUT.INPUT_1)
        break
      // /mockPortalId/vebus/257/Ac/In/2 =>  because shore power is in AC input 2
      case "N/mockPortalId/vebus/257/Ac/In/2/CurrentLimitIsAdjustable":
        this.sendCached(path, true)
        break
      case "N/mockPortalId/vebus/257/Ac/In/2/CurrentLimitGetMax":
        this.sendCached(path, 30)
        break
      case "N/mockPortalId/vebus/257/Ac/In/2/CurrentLimit":
        this.sendCached(path, 13)
        break
      case "N/mockPortalId/vebus/257/Mode":
        this.sendCached(path, SYSTEM_MODE.ON)
        break
      case "N/mockPortalId/vebus/257/ModeIsAdjustable":
        this.sendCached(path, true)
        break
      case "N/mockPortalId/system/0/SystemState/State":
        this.sendCached(path, VEBUS_SYSTEM_STATE.ABSORPTION_CHARGINNG)
        break
      case "N/mockPortalId/system/0/Dc/Battery/State":
        this.sendCached(path, 2)
        break

      // Values that change randomly over time. Add to randomlyChangingPaths to enable random changes

      // Voltage
      case "N/mockPortalId/system/0/Dc/Battery/Voltage":
      case "N/mockPortalId/vebus/257/Ac/ActiveIn/L1/V":
      case "N/mockPortalId/vebus/257/Ac/ActiveIn/L2/V":
      case "N/mockPortalId/vebus/257/Ac/ActiveIn/L3/V":
      case "N/mockPortalId/vebus/257/Ac/Out/L1/V":
      case "N/mockPortalId/vebus/257/Ac/Out/L2/V":
      case "N/mockPortalId/vebus/257/Ac/Out/L3/V":
        this.sendAlteringNumber(path, 8, 180)
        break

      // Current
      case "N/mockPortalId/system/0/Dc/Battery/Current":
      case "N/mockPortalId/vebus/257/Ac/ActiveIn/L1/I":
      case "N/mockPortalId/vebus/257/Ac/ActiveIn/L2/I":
      case "N/mockPortalId/vebus/257/Ac/ActiveIn/L3/I":
      case "N/mockPortalId/vebus/257/Ac/Out/L1/I":
      case "N/mockPortalId/vebus/257/Ac/Out/L2/I":
      case "N/mockPortalId/vebus/257/Ac/Out/L3/I":
      case "N/mockPortalId/system/0/Dc/Pv/Current":
        this.sendAlteringNumber(path, 2, 15)
        break

      // Power
      case "N/mockPortalId/system/0/Dc/Battery/Power":
      case "N/mockPortalId/system/0/Dc/System/Power":
      case "N/mockPortalId/vebus/257/Ac/ActiveIn/L1/P":
      case "N/mockPortalId/vebus/257/Ac/ActiveIn/L2/P":
      case "N/mockPortalId/vebus/257/Ac/ActiveIn/L3/P":
      case "N/mockPortalId/system/0/Ac/ConsumptionOnOutput/L1/Power":
      case "N/mockPortalId/system/0/Ac/ConsumptionOnOutput/L2/Power":
      case "N/mockPortalId/system/0/Ac/ConsumptionOnOutput/L3/Power":
      case "N/mockPortalId/system/0/Dc/Pv/Power":
        this.sendAlteringNumber(path, 4, 150)
        break

      // Other
      case "N/mockPortalId/system/0/Dc/Battery/Soc":
        this.sendAlteringNumber(path, 1, 50, true)
        break
      case "N/mockPortalId/system/0/Dc/Battery/TimeToGo":
        this.sendAlteringNumber(path, 500, 50000)
        break

      // IGNORE PATHS
      case "N/mockPortalId/settings/0/Settings/SystemSetup/<placeholder>":
        break
      default:
        console.error(`No data for path ${path.toString()}`)
    }
  }
}

const getIncrement = step => {
  return Math.random() * step - step / 2
}
