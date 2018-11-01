import VenusSystem from "../src/service/venusSystem"
import { DBUS_PATHS } from "../src/config/dbusPaths"
import { AC_SOURCE_TYPE } from "../src/service/topics"

describe("venus system", () => {
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
    describe("system paths", () => {
      test("correctly initializes system paths", () => {
        const system = new VenusSystem()
        system.handleSystemMessage("N/985dadd0c9e4/system/0/Serial", { value: "985dadd0c9e4" })
        system.handleSystemMessage("N/985dadd0c9e4/system/0/DeviceInstance", { value: 0 })

        expect(system.getTopicFromDbusPath("N", DBUS_PATHS.BATTERY.VOLTAGE)).toBe(
          `N/985dadd0c9e4/system/0/Dc/Battery/Voltage`
        )
      })
    })

    describe("vebus paths", () => {
      test("correctly initializes system paths", () => {
        const system = new VenusSystem()
        system.handleSystemMessage("N/985dadd0c9e4/system/0/Serial", { value: "985dadd0c9e4" })
        system.handleSystemMessage("N/985dadd0c9e4/vebus/257/DeviceInstance", { value: 257 })

        expect(system.getTopicFromDbusPath("N", DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_1)).toBe(
          `N/985dadd0c9e4/vebus/257/Ac/Out/L1/I`
        )
      })
    })

    describe("shore power paths", () => {
      test("when two inputs configured, shore and generator", () => {
        const system = new VenusSystem()
        system.handleSystemMessage("N/985dadd0c9e4/system/0/Serial", { value: "985dadd0c9e4" })
        system.handleSystemMessage("N/985dadd0c9e4/vebus/257/DeviceInstance", { value: 257 })
        system.handleSystemMessage("N/985dadd0c9e4/settings/0/Settings/SystemSetup/AcInput1", {
          value: AC_SOURCE_TYPE.GENERATOR
        })
        system.handleSystemMessage("N/985dadd0c9e4/settings/0/Settings/SystemSetup/AcInput2", {
          value: AC_SOURCE_TYPE.SHORE
        })

        expect(system.getTopicFromDbusPath("N", DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT)).toBe(
          `N/985dadd0c9e4/vebus/257/Ac/In/2/CurrentLimit`
        )
      })

      test("when two inputs configured, shore and grid", () => {
        const system = new VenusSystem()
        system.handleSystemMessage("N/985dadd0c9e4/system/0/Serial", { value: "985dadd0c9e4" })
        system.handleSystemMessage("N/985dadd0c9e4/vebus/257/DeviceInstance", { value: 257 })
        system.handleSystemMessage("N/985dadd0c9e4/settings/0/Settings/SystemSetup/AcInput1", {
          value: AC_SOURCE_TYPE.GENERATOR
        })
        system.handleSystemMessage("N/985dadd0c9e4/settings/0/Settings/SystemSetup/AcInput2", {
          value: AC_SOURCE_TYPE.GRID
        })

        expect(system.getTopicFromDbusPath("N", DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT)).toBe(
          `N/985dadd0c9e4/vebus/257/Ac/In/2/CurrentLimit`
        )
      })
    })
  })
})
