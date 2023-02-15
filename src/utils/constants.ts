export const SUPPORTED_LANGUAGES = ['en', 'fr', 'ar', 'cs', 'de', 'es', 'it', 'nl', 'ro', 'ru', 'sv', 'tr', 'zh']
export const LANGUAGE_OVERRIDES: { [k: string]: string } = {'zh': 'zh-CN'}
export const DEFAULT_LANGUAGE = 'en'
export const LANGUAGE_KEY_LOCAL_STORAGE = '_last_received_language'
export const BOX_DIRECTORY = 'src/components/boxes/'

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
