import { SWITCHABLE_OUTPUT_TYPE } from "@victronenergy/mfd-modules/dist/src/utils/constants"
import { getSwitchableOutputStatusPill, isSwitchableOutputDisabled } from "./statusHelper"

jest.mock("react-i18nify", function () {
  return {
    translate: function (key) {
      return key
    },
  }
})

var GENERIC = SWITCHABLE_OUTPUT_TYPE.TOGGLE_SWITCH
var BILGE = SWITCHABLE_OUTPUT_TYPE.BILGE_PUMP_CONTROL

describe("isSwitchableOutputDisabled", function () {
  test("returns true when DISABLED bit is set", function () {
    expect(isSwitchableOutputDisabled(0x20)).toBe(true)
    expect(isSwitchableOutputDisabled(0x22)).toBe(true)
    expect(isSwitchableOutputDisabled(0x24)).toBe(true)
    expect(isSwitchableOutputDisabled(0x29)).toBe(true)
  })

  test("returns false when DISABLED bit is not set", function () {
    expect(isSwitchableOutputDisabled(0x00)).toBe(false)
    expect(isSwitchableOutputDisabled(0x01)).toBe(false)
    expect(isSwitchableOutputDisabled(0x09)).toBe(false)
    expect(isSwitchableOutputDisabled(0x02)).toBe(false)
    expect(isSwitchableOutputDisabled(0x04)).toBe(false)
    expect(isSwitchableOutputDisabled(0x10)).toBe(false)
    expect(isSwitchableOutputDisabled(0x40)).toBe(false)
    expect(isSwitchableOutputDisabled(0x80)).toBe(false)
  })
})

describe("getSwitchableOutputStatusPill — generic type", function () {
  test("normal states return null", function () {
    expect(getSwitchableOutputStatusPill(0x00, GENERIC)).toBeNull()
    expect(getSwitchableOutputStatusPill(0x01, GENERIC)).toBeNull()
    expect(getSwitchableOutputStatusPill(0x09, GENERIC)).toBeNull()
  })

  test("fault states", function () {
    expect(getSwitchableOutputStatusPill(0x02, GENERIC)).toEqual({
      label: "switches.tripped",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x04, GENERIC)).toEqual({
      label: "switches.overTemperature",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x06, GENERIC)).toEqual({
      label: "switches.overTempTripped",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x08, GENERIC)).toEqual({
      label: "switches.fault",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x10, GENERIC)).toEqual({
      label: "switches.short",
      variant: "red",
    })
  })

  test("disabled combinations", function () {
    expect(getSwitchableOutputStatusPill(0x20, GENERIC)).toEqual({
      label: "switches.disabled",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x22, GENERIC)).toEqual({
      label: "switches.disabledTripped",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x24, GENERIC)).toEqual({
      label: "switches.disabledOverTemp",
      variant: "red",
    })
  })

  test("bypassed combinations", function () {
    expect(getSwitchableOutputStatusPill(0x40, GENERIC)).toEqual({
      label: "switches.bypassed",
      variant: "yellow",
    })
    expect(getSwitchableOutputStatusPill(0x42, GENERIC)).toEqual({
      label: "switches.bypassedTripped",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x44, GENERIC)).toEqual({
      label: "switches.bypassedOverTemp",
      variant: "red",
    })
  })

  test("external control combinations", function () {
    expect(getSwitchableOutputStatusPill(0x80, GENERIC)).toEqual({
      label: "switches.externalControl",
      variant: "green",
    })
    expect(getSwitchableOutputStatusPill(0x82, GENERIC)).toEqual({
      label: "switches.externalControlTripped",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x84, GENERIC)).toEqual({
      label: "switches.externalControlOverTemp",
      variant: "red",
    })
  })

  test("On bits are masked out when combined with flags", function () {
    expect(getSwitchableOutputStatusPill(0x29, GENERIC)).toEqual({
      label: "switches.disabled",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x49, GENERIC)).toEqual({
      label: "switches.bypassed",
      variant: "yellow",
    })
    expect(getSwitchableOutputStatusPill(0x89, GENERIC)).toEqual({
      label: "switches.externalControl",
      variant: "green",
    })
  })

  test("invalid combinations return unknown status", function () {
    expect(getSwitchableOutputStatusPill(0x03, GENERIC)).toEqual({
      label: "switches.unknownStatus",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x05, GENERIC)).toEqual({
      label: "switches.unknownStatus",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x07, GENERIC)).toEqual({
      label: "switches.unknownStatus",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0xff, GENERIC)).toEqual({
      label: "switches.unknownStatus",
      variant: "red",
    })
  })
})

describe("getSwitchableOutputStatusPill — bilge pump", function () {
  test("not running (0x00) shows gray pill", function () {
    expect(getSwitchableOutputStatusPill(0x00, BILGE)).toEqual({
      label: "switches.notRunning",
      variant: "gray",
    })
  })

  test("powered (0x01) shows green pill", function () {
    expect(getSwitchableOutputStatusPill(0x01, BILGE)).toEqual({
      label: "switches.powered",
      variant: "green",
    })
  })

  test("running (0x09) shows yellow pill", function () {
    expect(getSwitchableOutputStatusPill(0x09, BILGE)).toEqual({
      label: "switches.running",
      variant: "yellow",
    })
  })

  test("running with over temperature (0x0d)", function () {
    expect(getSwitchableOutputStatusPill(0x0d, BILGE)).toEqual({
      label: "switches.runningOverTemperature",
      variant: "red",
    })
  })

  test("running with disabled (0x29)", function () {
    expect(getSwitchableOutputStatusPill(0x29, BILGE)).toEqual({
      label: "switches.runningDisabled",
      variant: "red",
    })
  })

  test("not running disabled (0x20)", function () {
    expect(getSwitchableOutputStatusPill(0x20, BILGE)).toEqual({
      label: "switches.notRunningDisabled",
      variant: "red",
    })
  })

  test("bilge pump falls through to common handling for non-bilge-specific statuses", function () {
    expect(getSwitchableOutputStatusPill(0x02, BILGE)).toEqual({
      label: "switches.tripped",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x04, BILGE)).toEqual({
      label: "switches.overTemperature",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x06, BILGE)).toEqual({
      label: "switches.overTempTripped",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x08, BILGE)).toEqual({
      label: "switches.fault",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x10, BILGE)).toEqual({
      label: "switches.short",
      variant: "red",
    })
  })

  test("bilge pump invalid combinations return unknown status", function () {
    expect(getSwitchableOutputStatusPill(0x03, BILGE)).toEqual({
      label: "switches.unknownStatus",
      variant: "red",
    })
    expect(getSwitchableOutputStatusPill(0x05, BILGE)).toEqual({
      label: "switches.unknownStatus",
      variant: "red",
    })
  })
})
