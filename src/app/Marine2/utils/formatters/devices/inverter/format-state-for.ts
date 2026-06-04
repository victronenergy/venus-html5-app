import { VEBUS_STATE } from "@victronenergy/mfd-modules"

export const formatVebusStateFor = (state: number) => {
  switch (state) {
    case VEBUS_STATE.OFF:
      return "common.off"
    case VEBUS_STATE.LOW_POWER:
      return "statusWidget.Low power"
    case VEBUS_STATE.FAULT_CONDITION:
      return "common.fault"
    case VEBUS_STATE.BULK_CHARGING:
      return "statusWidget.Bulk charging"
    case VEBUS_STATE.ABSORPTION_CHARGING:
      return "statusWidget.Absorption charging"
    case VEBUS_STATE.FLOAT_CHARGING:
      return "statusWidget.Float charging"
    case VEBUS_STATE.STORAGE_MODE:
      return "statusWidget.Storage mode"
    case VEBUS_STATE.EQUALISATION_CHARGING:
      return "statusWidget.Equalisation charging"
    case VEBUS_STATE.PASSTHRU:
      return "statusWidget.Passthru"
    case VEBUS_STATE.INVERTING:
      return "statusWidget.Inverting"
    case VEBUS_STATE.ASSISTING:
      return "statusWidget.Assisting"
    case VEBUS_STATE.POWER_SUPPLY_MODE:
      return "common.powerSupplyMode"
    case VEBUS_STATE.SUSTAIN:
      return "statusWidget.Sustain"
    case VEBUS_STATE.EXTERNAL_CONTROL:
      return "statusWidget.External control"
    default:
      return "common.emptyBar"
  }
}
