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

export type MessagesObj = {
  warning: string
  alarm: string
}

export type WidgetConfiguration = {
  MAX: number
  THRESHOLDS: Array<number>
  MESSAGES: MessagesObj
  DEVICE_ID?: number
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
  THRESHOLDS: [0.8, 0.1, 0.1],
  MESSAGES: {
    [WARNING]: "high power load",
    [ALARM]: "critically high power load",
  },
}

export const TANKS_CONF = {
  FRESH_WATER: {
    DEVICE_ID: 1,
    MAX: 1,
    THRESHOLDS: [0.6, 0.3, 0.1],
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
    ON: 1,
    OFF: 0,
    CHARGER_ONLY: 2,
    INVERTER_ONLY: 3,
  },
  LIMITS: [6, 10, 13, 16, 25, 32, 63],
}
