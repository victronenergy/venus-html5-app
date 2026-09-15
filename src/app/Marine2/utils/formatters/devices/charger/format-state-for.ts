import { CHARGER_STATE } from "@victronenergy/mfd-modules"

export const formatChargerStateFor = (state: number) => {
  switch (state) {
    case CHARGER_STATE.OFF:
      return "common.off"
    case CHARGER_STATE.FAULT_CONDITION:
      return "common.fault"
    case CHARGER_STATE.BULK_CHARGING:
      return "statusWidget.bulkCharging"
    case CHARGER_STATE.ABSORPTION_CHARGING:
      return "statusWidget.absorptionCharging"
    case CHARGER_STATE.FLOAT_CHARGING:
      return "statusWidget.floatCharging"
    case CHARGER_STATE.STORAGE_MODE:
      return "statusWidget.storageMode"
    case CHARGER_STATE.EQUALISATION_CHARGING:
      return "statusWidget.equalisationCharging"
    case CHARGER_STATE.POWER_SUPPLY_MODE:
      return "common.powerSupplyMode"
    case CHARGER_STATE.REPEATED_ABSORPTION:
      return "statusWidget.repeatedAbsorption"
    case CHARGER_STATE.AUTO_EQUALIZE:
      return "statusWidget.autoEqualizeRecondition"
    case CHARGER_STATE.BATTERY_SAFE:
      return "statusWidget.batterySafe"
    default:
      return "common.emptyBar"
  }
}
