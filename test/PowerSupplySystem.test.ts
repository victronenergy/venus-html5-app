import PowerSupplySystem from "../src/service/PowerSupplySystem"
import { DBUS_PATHS } from "../src/config/dbusPaths"

describe("initialization", () => {
  test("starts with no portal id", () => {
    const system = new PowerSupplySystem()
    expect(system.portalId).toBe(null)
  })

  test("starts as not initialized", () => {
    const system = new PowerSupplySystem()
    expect(system.isInitialized()).toBe(false)
  })

  test("initializes portal id after first `/Serial` notification received", () => {
    const system = new PowerSupplySystem()
    system.handleNotification("N/985dadd0c9e4/system/0/Serial", Buffer.from('{"value": "985dadd0c9e4"}'))
    expect(system.portalId).toBe("985dadd0c9e4")
    expect(system.isInitialized()).toBe(false)
  })

  test("initializes vebus device id after `/DeviceInstance` notification received", () => {
    const system = new PowerSupplySystem()
    system.handleNotification("N/985dadd0c9e4/vebus/257/DeviceInstance", Buffer.from('{"value": 257}'))
    expect(system.vebusInstanceId).toBe(257)
    expect(system.isInitialized()).toBe(false)
  })

  test("is initialized after portal id and vebus device id are set", () => {
    const system = new PowerSupplySystem()
    system.handleNotification("N/985dadd0c9e4/system/0/Serial", Buffer.from('{"value": "985dadd0c9e4"}'))
    system.handleNotification("N/985dadd0c9e4/vebus/257/DeviceInstance", Buffer.from('{"value": 257}'))
    expect(system.isInitialized()).toBe(true)
  })
})

describe("return topic based on dbus path", () => {
  let system: PowerSupplySystem

  beforeEach(() => {
    system = new PowerSupplySystem()
    system.handleNotification("N/985dadd0c9e4/system/0/Serial", Buffer.from('{"value": "985dadd0c9e4"}'))
    system.handleNotification("N/985dadd0c9e4/vebus/257/DeviceInstance", Buffer.from('{"value": 257}'))
  })

  test("correctly initializes system paths", () => {
    expect(system.getTopicFromDbusPath("N", DBUS_PATHS.BATTERY.VOLTAGE)).toBe(
      `N/985dadd0c9e4/system/0/Dc/Battery/Voltage`
    )
  })

  test("correctly initializes vebus paths", () => {
    expect(system.getTopicFromDbusPath("N", DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.CURRENT)).toBe(
      `N/985dadd0c9e4/vebus/257/Ac/Out/L1/V`
    )
  })
})
