import React from "react"
import { VEBUS_SYSTEM_STATE } from "../utils/constants"

const systemStateFormatter = value => {
  switch (value) {
    case VEBUS_SYSTEM_STATE.OFF:
      return "Off"
    case VEBUS_SYSTEM_STATE.LOW_POWER:
      return "Low power"
    case VEBUS_SYSTEM_STATE.FAULT_CONDITION:
      return "VE.Bus Fault condition"
    case VEBUS_SYSTEM_STATE.BULK_CHARGING:
      return "Bulk charging"
    case VEBUS_SYSTEM_STATE.ABSORPTION_CHARGINNG:
      return "Absorption charging"
    case VEBUS_SYSTEM_STATE.FLOAT_CHARGING:
      return "Float charging"
    case VEBUS_SYSTEM_STATE.STORAGE_MODE:
      return "Storage mode"
    case VEBUS_SYSTEM_STATE.EQUALISATION_CHARGING:
      return "Equalisation charging"
    case VEBUS_SYSTEM_STATE.PASSTHRU:
      return "Passthru"
    case VEBUS_SYSTEM_STATE.INVERTING:
      return "Inverting"
    case VEBUS_SYSTEM_STATE.ASSISTING:
      return "Assisting"
    case VEBUS_SYSTEM_STATE.POWER_SUPPLY_MODE:
      return "Power supply mode"
    case VEBUS_SYSTEM_STATE.DISCHARGING:
      return "Discharging"
    case VEBUS_SYSTEM_STATE.SUSTAIN:
      return "Sustain"
    default:
      return "--"
  }
}

export default ({ value }) => <>{systemStateFormatter(value)}</>
