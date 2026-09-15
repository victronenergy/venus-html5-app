import { SYSTEM_STATE } from "@victronenergy/mfd-modules"

export const formatSystemStateFor = (state: number) => {
  switch (state) {
    case SYSTEM_STATE.OFF:
      return "common.off"
    case SYSTEM_STATE.LOW_POWER:
      return "statusWidget.lowPower"
    case SYSTEM_STATE.FAULT_CONDITION:
      return "common.fault"
    case SYSTEM_STATE.BULK_CHARGING:
      return "statusWidget.bulkCharging"
    case SYSTEM_STATE.ABSORPTION_CHARGING:
      return "statusWidget.absorptionCharging"
    case SYSTEM_STATE.FLOAT_CHARGING:
      return "statusWidget.floatCharging"
    case SYSTEM_STATE.STORAGE_MODE:
      return "statusWidget.storageMode"
    case SYSTEM_STATE.EQUALISATION_CHARGING:
      return "statusWidget.equalisationCharging"
    case SYSTEM_STATE.PASSTHRU:
      return "statusWidget.passthru"
    case SYSTEM_STATE.INVERTING:
      return "statusWidget.inverting"
    case SYSTEM_STATE.ASSISTING:
      return "statusWidget.assisting"
    case SYSTEM_STATE.SUSTAIN:
      return "statusWidget.sustain"
    case SYSTEM_STATE.EXTERNAL_CONTROL:
      return "statusWidget.externalControl"
    case SYSTEM_STATE.DISCHARGING:
      return "common.discharging"
    case SYSTEM_STATE.ESS_SUSTAIN:
      return "statusWidget.essSustain"
    case SYSTEM_STATE.RECHARGE:
      return "statusWidget.recharge"
    case SYSTEM_STATE.SCHEDULED_RECHARGE:
      return "statusWidget.scheduledRecharge"
    default:
      return "common.emptyBar"
  }
}
