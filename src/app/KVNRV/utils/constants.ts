const WARNING = "warning"
const ALARM = "alarm"

export const STATUS_LEVELS = {
  SUCCESS: "success",
  WARNING: WARNING,
  ALARM: ALARM,
}

export const STATUS_LEVELS_MSG = {
  [STATUS_LEVELS.SUCCESS]: "Optimal",
  [WARNING]: "Warning",
  [ALARM]: "Critical",
}

export const CRITICAL_MULTIPLIER = 1.2

export type MessagesObj = {
  warning: string
  alarm: string
}

export type WidgetConfiguration = {
  MAX: number
  THRESHOLDS: Array<number>
  MESSAGES: MessagesObj
  DEVICE_ID?: number
  ZERO_OFFSET?: number
}

export const BATTERY_CONF: WidgetConfiguration = {
  MAX: 300,
  THRESHOLDS: [0.3, 0.3, 0.4],
  MESSAGES: {
    [WARNING]: "battery usage high",
    [ALARM]: "critically high battery usage",
  },
  ZERO_OFFSET: 2 / 3,
}

export const DC_CONF: WidgetConfiguration = {
  MAX: 500,
  THRESHOLDS: [0.5, 0.25, 0.25],
  MESSAGES: {
    [WARNING]: "high power load",
    [ALARM]: "critically high power load",
  },
}

export const AC_CONF: WidgetConfiguration = {
  MAX: 300,
  THRESHOLDS: [0.6, 0.2, 0.2],
  MESSAGES: {
    [WARNING]: "high power load",
    [ALARM]: "critically high power load",
  },
}

export const PV_CONF: WidgetConfiguration = {
  MAX: 30 * 12,
  THRESHOLDS: [0.8, 0.1, 0.1],
  MESSAGES: {
    [WARNING]: "high power load",
    [ALARM]: "critically high power load",
  },
}

export const SHORE_POWER_CONF: WidgetConfiguration = {
  MAX: 100,
  THRESHOLDS: [0.6, 0.2, 0.2],
  MESSAGES: {
    [WARNING]: "high power load",
    [ALARM]: "critically high power load",
  },
}

export const TANKS_CONF = {
  STANDART_TANK: {
    MAX: 1,
    THRESHOLDS: [0.7, 0.2, 0.1],
    MESSAGES: {
      [WARNING]: "level very low",
      [ALARM]: "levels critically low",
    },
  } as WidgetConfiguration,
  REVERSE_TANK: {
    MAX: 1,
    THRESHOLDS: [0.7, 0.2, 0.1],
    MESSAGES: {
      [WARNING]: "level high",
      [ALARM]: "levels critically high",
    },
  } as WidgetConfiguration,
}

export const AC_MODE = {
  MODES: {
    CHARGER_ONLY: 1,
    INVERTER_ONLY: 2,
    ON: 3,
    OFF: 4,
  },
  LIMITS_US: [10, 12, 15, 20, 30],
  LIMITS_EU: [3, 6, 10, 13, 16, 25, 32, 63],
}

export type VolumeUnit = {
  precision: number
  stepSize: number
  unit: string
  factor: number
}

export type VolumeUnits = {
  1: VolumeUnit
  2: VolumeUnit
  3: VolumeUnit
  default: VolumeUnit
}

export const VOLUME_UNITS: VolumeUnits = {
  "1": {
    precision: 0,
    stepSize: 1,
    unit: "L",
    factor: 1000.0,
  },
  "2": {
    precision: 0,
    stepSize: 1,
    unit: "gal",
    factor: 219.969157,
  },
  "3": {
    precision: 0,
    stepSize: 1,
    unit: "gal",
    factor: 264.172052,
  },
  default: {
    precision: 3,
    stepSize: 0.005,
    unit: "m3",
    factor: 1.0,
  },
}

export const FLUID_TYPES = {
  FUEL: 0,
  FRESH_WATER: 1,
  WASTE_WATER: 2,
  LIVE_WELL: 3,
  OIL: 4,
  BLACK_WATER: 5,
}

export const VIEWS = {
  CONSOLE: "CONSOLE",
  METRICS: "METRICS",
  LOGIN: "LOGIN",
}

export const VRM_URL = "https://vrm.victronenergy.com/"

export const REVERSE_CONFIG_FLUID_TYPES = [FLUID_TYPES.WASTE_WATER, FLUID_TYPES.BLACK_WATER, FLUID_TYPES.LIVE_WELL]
