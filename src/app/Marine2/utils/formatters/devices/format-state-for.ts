import { VEBUS_SYSTEM_STATE } from "../../constants"

export const formatStateFor = (state: number) => {
  switch (state) {
    case VEBUS_SYSTEM_STATE.OFF:
      return "common.off"
    case VEBUS_SYSTEM_STATE.LOW_POWER:
      return "statusWidget.Low power"
    case VEBUS_SYSTEM_STATE.FAULT_CONDITION:
      return "common.fault"
    case VEBUS_SYSTEM_STATE.BULK_CHARGING:
      return "statusWidget.Bulk charging"
    case VEBUS_SYSTEM_STATE.ABSORPTION_CHARGING:
      return "statusWidget.Absorption charging"
    case VEBUS_SYSTEM_STATE.FLOAT_CHARGING:
      return "statusWidget.Float charging"
    case VEBUS_SYSTEM_STATE.STORAGE_MODE:
      return "statusWidget.Storage mode"
    case VEBUS_SYSTEM_STATE.EQUALISATION_CHARGING:
      return "statusWidget.Equalisation charging"
    case VEBUS_SYSTEM_STATE.PASSTHRU:
      return "statusWidget.Passthru"
    case VEBUS_SYSTEM_STATE.INVERTING:
      return "statusWidget.Inverting"
    case VEBUS_SYSTEM_STATE.ASSISTING:
      return "statusWidget.Assisting"
    case VEBUS_SYSTEM_STATE.POWER_SUPPLY_MODE:
      return "common.powerSupplyMode"
    case VEBUS_SYSTEM_STATE.WAKE_UP:
      return "statusWidget.Wake-up"
    case VEBUS_SYSTEM_STATE.REPEATED_ABSORPTION:
      return "statusWidget.Repeated absorption"
    case VEBUS_SYSTEM_STATE.AUTO_EQUALIZE_RECONDITION:
      return "statusWidget.Auto equalize/Recondition"
    case VEBUS_SYSTEM_STATE.BATTERYSAFE:
      return "statusWidget.BatterySafe"
    case VEBUS_SYSTEM_STATE.EXTERNAL_CONTROL:
      return "statusWidget.External control"
    case VEBUS_SYSTEM_STATE.DISCHARGING:
      return "common.discharging"
    case VEBUS_SYSTEM_STATE.SUSTAIN:
      return "statusWidget.Sustain"
    default:
      return "common.emptyBar"
  }
}
