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

export type Conf = {
  MAX: number
  THRESHOLDS: Array<number>
  MESSAGES: MessagesObj
  DEVICE_ID?: number
}

export const DC_CONF: Conf = {
  MAX: 500,
  THRESHOLDS: [0.5, 0.25, 0.25],
  MESSAGES: {
    [WARNING]: "slightly too much",
    [ALARM]: "really, too much power",
  },
}

export const AC_CONF: Conf = {
  MAX: 300,
  THRESHOLDS: [0.6, 0.2, 0.2],
  MESSAGES: {
    [WARNING]: "slightly too much",
    [ALARM]: "really, too much power",
  },
}

export const PV_CONF: Conf = {
  MAX: 100,
  THRESHOLDS: [0.8, 0.1, 0.1],
  MESSAGES: {
    [WARNING]: "slightly too much",
    [ALARM]: "really, too much power",
  },
}

export const SHORE_POWER_CONF: Conf = {
  MAX: 100,
  THRESHOLDS: [0.8, 0.1, 0.1],
  MESSAGES: {
    [WARNING]: "slightly too much",
    [ALARM]: "really, too much power",
  },
}

export const TANKS_CONF = {
  FRESH_WATER: {
    DEVICE_ID: 1,
    MAX: 1,
    THRESHOLDS: [0.6, 0.3, 0.1],
    MESSAGES: {
      [WARNING]: "not enough water",
      [ALARM]: "you're gonna die of thirst",
    },
  } as Conf,
  GRAY_WATER: {
    DEVICE_ID: 2,
    MAX: 1,
    THRESHOLDS: [0.7, 0.2, 0.1],
    MESSAGES: {
      [WARNING]: "too much water",
      [ALARM]: "way too much water",
    },
  } as Conf,
  BLACK_WATER: {
    DEVICE_ID: 5,
    MAX: 1,
    THRESHOLDS: [0.7, 0.2, 0.1],
    MESSAGES: {
      [WARNING]: "too much water",
      [ALARM]: "way too much water",
    },
  } as Conf,
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
