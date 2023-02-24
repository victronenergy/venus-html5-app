import preval from "preval.macro"

export const BUILD_TIMESTAMP = preval`module.exports = new Date().toLocaleDateString();`

export enum BoxTypes {
  BATTERIES = "Batteries",
  ENERGY = "Energy",
  TANKS = "Tanks",
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
