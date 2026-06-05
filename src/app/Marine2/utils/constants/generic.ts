import preval from "preval.macro"

export const BUILD_TIMESTAMP = preval`module.exports = new Date().toLocaleDateString() + "." + new Date().getUTCHours() + new Date().getUTCMinutes();`

export const CURRENT_LIMIT_STEP = 0.5

export const POWER_HYSTERESIS_THRESHOLD = 800

// The order of these is important, as it determines the order of the boxes on the Root view page
export enum BOX_TYPES {
  ENERGY = "Energy",
  BATTERIES = "Batteries",
  TANKS = "Tanks",
  DEVICES = "Devices",
  ENVIRONMENT = "Environment",
}
