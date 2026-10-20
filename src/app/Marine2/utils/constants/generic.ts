// NOTE: __BUILD_DATE__ and __BUILD_TIME__ are defined at build time via vite define
export const BUILD_TIMESTAMP = `${__BUILD_DATE__}.${__BUILD_TIME__}`

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
