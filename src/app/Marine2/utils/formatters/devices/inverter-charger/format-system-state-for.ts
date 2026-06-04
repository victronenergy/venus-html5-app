import { SYSTEM_STATE } from "@victronenergy/mfd-modules"

export const formatSystemStateFor = (state: number) => {
  switch (state) {
    case SYSTEM_STATE.OFF:
      return "common.off"
    case SYSTEM_STATE.LOW_POWER:
      return "statusWidget.Low power"
    case SYSTEM_STATE.FAULT_CONDITION:
      return "common.fault"
    case SYSTEM_STATE.BULK_CHARGING:
      return "statusWidget.Bulk charging"
    case SYSTEM_STATE.ABSORPTION_CHARGING:
      return "statusWidget.Absorption charging"
    case SYSTEM_STATE.FLOAT_CHARGING:
      return "statusWidget.Float charging"
    case SYSTEM_STATE.STORAGE_MODE:
      return "statusWidget.Storage mode"
    case SYSTEM_STATE.EQUALISATION_CHARGING:
      return "statusWidget.Equalisation charging"
    case SYSTEM_STATE.PASSTHRU:
      return "statusWidget.Passthru"
    case SYSTEM_STATE.INVERTING:
      return "statusWidget.Inverting"
    case SYSTEM_STATE.ASSISTING:
      return "statusWidget.Assisting"
    case SYSTEM_STATE.SUSTAIN:
      return "statusWidget.Sustain"
    case SYSTEM_STATE.EXTERNAL_CONTROL:
      return "statusWidget.External control"
    case SYSTEM_STATE.DISCHARGING:
      return "common.discharging"
    case SYSTEM_STATE.ESS_SUSTAIN:
      return "statusWidget.ESS Sustain"
    case SYSTEM_STATE.RECHARGE:
      return "statusWidget.Recharge"
    case SYSTEM_STATE.SCHEDULED_RECHARGE:
      return "statusWidget.Scheduled recharge"
    default:
      return "common.emptyBar"
  }
}
