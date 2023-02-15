import { VEBUS_SYSTEM_STATE } from "./constants"

export const formatStateForTranslation = (state: number) => {
  switch (state) {
    case VEBUS_SYSTEM_STATE.OFF:
      return "common.off"
    case VEBUS_SYSTEM_STATE.LOW_POWER:
      return "status.Low power"
    case VEBUS_SYSTEM_STATE.FAULT_CONDITION:
      return "common.fault"
    case VEBUS_SYSTEM_STATE.BULK_CHARGING:
      return "status.Bulk charging"
    case VEBUS_SYSTEM_STATE.ABSORPTION_CHARGING:
      return "status.Absorption charging"
    case VEBUS_SYSTEM_STATE.FLOAT_CHARGING:
      return "status.Float charging"
    case VEBUS_SYSTEM_STATE.STORAGE_MODE:
      return "status.Storage mode"
    case VEBUS_SYSTEM_STATE.EQUALISATION_CHARGING:
      return "status.Equalisation charging"
    case VEBUS_SYSTEM_STATE.PASSTHRU:
      return "status.Passthru"
    case VEBUS_SYSTEM_STATE.INVERTING:
      return "status.Inverting"
    case VEBUS_SYSTEM_STATE.ASSISTING:
      return "status.Assisting"
    case VEBUS_SYSTEM_STATE.POWER_SUPPLY_MODE:
      return "common.powerSupplyMode"
    case VEBUS_SYSTEM_STATE.WAKE_UP:
      return "status.Wake-up"
    case VEBUS_SYSTEM_STATE.REPEATED_ABSORPTION:
      return "status.Repeated absorption"
    case VEBUS_SYSTEM_STATE.AUTO_EQUALIZE_RECONDITION:
      return "status.Auto equalize/Recondition"
    case VEBUS_SYSTEM_STATE.BATTERYSAFE:
      return "status.BatterySafe"
    case VEBUS_SYSTEM_STATE.EXTERNAL_CONTROL:
      return "status.External control"
    case VEBUS_SYSTEM_STATE.DISCHARGING:
      return "common.discharging"
    case VEBUS_SYSTEM_STATE.SUSTAIN:
      return "status.Sustain"
    default:
      return "common.emptyBar"
  }
}

export const formatPower = (power: number) => {
  // check if power is undefined
  if (power === undefined) {
    return "--"
  }

  if (power >= 1000) {
    return (power / 1000).toFixed(1)
  }

  return power.toFixed(1)
}

export const formatValue = (value: number) => {
  if (value === undefined) {
    return "--"
  }

  return value.toFixed(1)
}
