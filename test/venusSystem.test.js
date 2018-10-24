import VenusSystem from "../src/service/venusSystem"
import { DBUS_PATHS } from "../src/config/dbusPaths"

describe("initialization", () => {
  test("starts with no portal id", () => {
    const system = new VenusSystem()
    expect(system.portalId).toBe(null)
  })

  test("starts as not initialized", () => {
    const system = new VenusSystem()
    expect(system.isInitialized()).toBeFalsy()
  })

  test("initializes portal id after first `/Serial` notification received", () => {
    const system = new VenusSystem()
    system.handleSystemMessage("N/985dadd0c9e4/system/0/Serial", { value: "985dadd0c9e4" })
    expect(system.portalId).toBe("985dadd0c9e4")
    expect(system.isInitialized()).toBeFalsy()
  })

  test("initializes vebus device id after `/DeviceInstance` notification received", () => {
    const system = new VenusSystem()
    system.handleSystemMessage("N/985dadd0c9e4/vebus/257/DeviceInstance", { value: 257 })
    expect(system.vebusInstanceId).toBe(257)
    expect(system.isInitialized()).toBeFalsy()
  })

  test("is initialized after portal id and vebus device id are set", () => {
    const system = new VenusSystem()
    system.handleSystemMessage("N/985dadd0c9e4/system/0/Serial", { value: "985dadd0c9e4" })
    system.handleSystemMessage("N/985dadd0c9e4/vebus/257/DeviceInstance", { value: 257 })
    expect(system.isInitialized()).toBeFalsy()
  })
})

describe("return topic based on dbus path", () => {
  let system

  beforeEach(() => {
    system = new VenusSystem()
    system.handleSystemMessage("N/985dadd0c9e4/system/0/Serial", { value: "985dadd0c9e4" })
    system.handleSystemMessage("N/985dadd0c9e4/vebus/257/DeviceInstance", { value: 257 })
    system.handleSystemMessage("N/985dadd0c9e4/system/0/DeviceInstance", { value: 0 })
  })

  test("correctly initializes system paths", () => {
    expect(system.getTopicFromDbusPath("N", DBUS_PATHS.BATTERY.VOLTAGE)).toBe(
      `N/985dadd0c9e4/system/0/Dc/Battery/Voltage`
    )
  })

  test("correctly initializes vebus paths", () => {
    expect(system.getTopicFromDbusPath("N", DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.CURRENT)).toBe(
      `N/985dadd0c9e4/vebus/257/Ac/Out/L1/I`
    )
  })
})
