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
  THRESHOLDS: [0.05, 0.1, 0.6, 0.075, 0.025],
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
  MAX: 100,
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
  FRESH_WATER: {
    DEVICE_ID: 1,
    MAX: 1,
    THRESHOLDS: [0.7, 0.2, 0.1],
    MESSAGES: {
      [WARNING]: "water level very low",
      [ALARM]: "water levels critically low",
    },
  } as WidgetConfiguration,
  GRAY_WATER: {
    DEVICE_ID: 2,
    MAX: 1,
    THRESHOLDS: [0.7, 0.2, 0.1],
    MESSAGES: {
      [WARNING]: "water level high",
      [ALARM]: "critical levels of water",
    },
  } as WidgetConfiguration,
  BLACK_WATER: {
    DEVICE_ID: 5,
    MAX: 1,
    THRESHOLDS: [0.7, 0.2, 0.1],
    MESSAGES: {
      [WARNING]: "water level very high",
      [ALARM]: "critical levels of water",
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
  LIMITS_US: [10, 15, 20, 30, 50, 100],
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

export const VIEWS = {
  METRICS: "METRICS",
  LOGIN: "LOGIN",
}
