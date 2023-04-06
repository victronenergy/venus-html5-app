import preval from "preval.macro"

export const BUILD_TIMESTAMP = preval`module.exports = new Date().toLocaleDateString() + "." + new Date().getUTCHours() + new Date().getUTCMinutes();`

// The order of these is important, as it determines the order of the boxes on the Root view page
export enum BoxTypes {
  ENERGY = "Energy",
  BATTERIES = "Batteries",
  TANKS = "Tanks",
  DEVICES = "Devices",
  ENVIRONMENT = "Environment",
}

export const BATTERY = {
  IDLE: 0,
  CHARGING: 1,
  DISCHARGING: 2,
}

export const AC_SOURCE = {
  UNUSED: 0,
  GRID: 1,
  GENERATOR: 2,
  SHORE: 3,
}

export const ACTIVE_INPUT = {
  NONE: 240, // Most likely inverting
}

export const SYSTEM_MODE = {
  CHARGER_ONLY: 1,
  INVERTER_ONLY: 2,
  ON: 3,
  OFF: 4,
}

export const CHARGER_MODE = {
  OFF: 4,
  ON: 1,
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

export const INVERTER_MODE = {
  ON: 2,
  VEBUS_ON: 3, // Vebus inverters use mode 3 in stead of 2 for ON.
  OFF: 4,
  ECO: 5,
}

export const GENSET_STATE = {
  STANDBY: 0,
  STARTING: [1, 2, 3, 4, 5, 6, 7],
  RUNNING: 8,
  STOPPING: 9,
  ERROR: 10,
}

export const RELAY_FUNCTION = {
  GENERATOR_START_STOP: 1,
}

export const GENERATOR_START_STOP = {
  STOP: 0,
  START: 1,
  AUTO_ON: 1,
  AUTO_OFF: 0,
}
