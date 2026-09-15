import { VEBUS_STATE } from "@victronenergy/mfd-modules"

export const formatVebusStateFor = (state: number) => {
  switch (state) {
    case VEBUS_STATE.OFF:
      return "common.off"
    case VEBUS_STATE.LOW_POWER:
      return "statusWidget.lowPower"
    case VEBUS_STATE.FAULT_CONDITION:
      return "common.fault"
    case VEBUS_STATE.BULK_CHARGING:
      return "statusWidget.bulkCharging"
    case VEBUS_STATE.ABSORPTION_CHARGING:
      return "statusWidget.absorptionCharging"
    case VEBUS_STATE.FLOAT_CHARGING:
      return "statusWidget.floatCharging"
    case VEBUS_STATE.STORAGE_MODE:
      return "statusWidget.storageMode"
    case VEBUS_STATE.EQUALISATION_CHARGING:
      return "statusWidget.equalisationCharging"
    case VEBUS_STATE.PASSTHRU:
      return "statusWidget.passthru"
    case VEBUS_STATE.INVERTING:
      return "statusWidget.inverting"
    case VEBUS_STATE.ASSISTING:
      return "statusWidget.assisting"
    case VEBUS_STATE.POWER_SUPPLY_MODE:
      return "common.powerSupplyMode"
    case VEBUS_STATE.SUSTAIN:
      return "statusWidget.sustain"
    case VEBUS_STATE.EXTERNAL_CONTROL:
      return "statusWidget.externalControl"
    default:
      return "common.emptyBar"
  }
}
