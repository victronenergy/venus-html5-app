import { setLocale } from "react-i18nify"

export const LANGAUGES = ["en", "fr", "ar", "cs", "de", "es", "it", "nl", "ro", "ru", "sv", "tr", "zh-CN"]
export const __LOCAL_STORAGE_LANG_KEY__ = "__LOCAL_STORAGE_LANG_KEY__"
export const DEFAULT_LANGUAGE = "en"

export const mfdLanguageOptions = {
  supportedLanguages: LANGAUGES,
  localStorageKey: __LOCAL_STORAGE_LANG_KEY__,
  defaultLanguage: DEFAULT_LANGUAGE,
  onLangChange: setLocale,
}
