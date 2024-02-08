import preval from "preval.macro"

export const BUILD_TIMESTAMP = preval`module.exports = new Date().toLocaleDateString() + "." + new Date().getUTCHours() + new Date().getUTCMinutes();`

export const CURRENT_LIMIT_STEP = 0.5

export const POWER_HYSTERESIS_THRESHOLD = 800

export const SYSTEM_MODE = {
  CHARGER_ONLY: 1,
  INVERTER_ONLY: 2,
  ON: 3,
  OFF: 4,
}

export const AC_SOURCE = {
  UNUSED: 0,
  GRID: 1,
  GENERATOR: 2,
  SHORE: 3,
}

export const VEBUS_SYSTEM_STATE = {
  OFF: 0,
  LOW_POWER: 1,
  FAULT_CONDITION: 2,
  BULK_CHARGING: 3,
  ABSORPTION_CHARGING: 4,
  FLOAT_CHARGING: 5,
  STORAGE_MODE: 6,
  EQUALISATION_CHARGING: 7,
  PASSTHRU: 8,
  INVERTING: 9,
  ASSISTING: 10,
  POWER_SUPPLY_MODE: 11,
  WAKE_UP: 245,
  REPEATED_ABSORPTION: 246,
  AUTO_EQUALIZE_RECONDITION: 247,
  BATTERYSAFE: 248,
  EXTERNAL_CONTROL: 252,
  DISCHARGING: 256,
  SUSTAIN: 257,
}

// The order of these is important, as it determines the order of the boxes on the Root view page
export enum BOX_TYPES {
  ENERGY = "Energy",
  BATTERIES = "Batteries",
  TANKS = "Tanks",
  DEVICES = "Devices",
  ENVIRONMENT = "Environment",
}
