export const SUPPORTED_LANGUAGES = ['en', 'fr', 'ar', 'cs', 'de', 'es', 'it', 'nl', 'ro', 'ru', 'sv', 'tr', 'zh']
export const LANGUAGE_OVERRIDES: { [k: string]: string } = {'zh': 'zh-CN'}
export const DEFAULT_LANGUAGE = 'en'
export const LANGUAGE_KEY_LOCAL_STORAGE = '_last_received_language'
export const BOX_DIRECTORY = 'src/components/boxes/'

export const BATTERY = {
  IDLE: 0,
  CHARGING: 1,
  DISCHARGING: 2
}