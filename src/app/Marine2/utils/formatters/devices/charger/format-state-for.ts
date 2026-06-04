import { CHARGER_STATE } from "@victronenergy/mfd-modules"

export const formatChargerStateFor = (state: number) => {
  switch (state) {
    case CHARGER_STATE.OFF:
      return "common.off"
    case CHARGER_STATE.FAULT_CONDITION:
      return "common.fault"
    case CHARGER_STATE.BULK_CHARGING:
      return "statusWidget.Bulk charging"
    case CHARGER_STATE.ABSORPTION_CHARGING:
      return "statusWidget.Absorption charging"
    case CHARGER_STATE.FLOAT_CHARGING:
      return "statusWidget.Float charging"
    case CHARGER_STATE.STORAGE_MODE:
      return "statusWidget.Storage mode"
    case CHARGER_STATE.EQUALISATION_CHARGING:
      return "statusWidget.Equalisation charging"
    case CHARGER_STATE.POWER_SUPPLY_MODE:
      return "common.powerSupplyMode"
    case CHARGER_STATE.REPEATED_ABSORPTION:
      return "statusWidget.Repeated absorption"
    case CHARGER_STATE.AUTO_EQUALIZE:
      return "statusWidget.Auto equalize/Recondition"
    case CHARGER_STATE.BATTERY_SAFE:
      return "statusWidget.BatterySafe"
    default:
      return "common.emptyBar"
  }
}
