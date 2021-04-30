export const DC_CONF = {
  MAX: 500,
  THRESHOLDS: [0.5, 0.25, 0.25]
};

export const AC_CONF = {
  MAX: 300,
  THRESHOLDS: [0.6, 0.2, 0.2]
};

export const PV_CONF = {
  MAX: 100,
  THRESHOLDS: [0.8, 0.1, 0.1]
};

export const AC_MODE = {
  MODES: {
    ON: 1,
    OFF: 0,
    CHARGER_ONLY: 2,
    INVERTER_ONLY: 3,
  },
  LIMITS: [
    6,
    10,
    13,
    16,
    25,
    32,
    63,
  ]
}

export const FRESH_WATER_CONF = {
  THRESHOLDS: [0.7, 0.2, 0.1]
}
export const BLACK_WATER_CONF = {
  THRESHOLDS: [0.7, 0.2, 0.1]
}
export const WASTE_WATER_CONF = {
  THRESHOLDS: [0.7, 0.2, 0.1]
}
