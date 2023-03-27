import { setLocale } from "react-i18nify"

export const LANGUAGES = ["en", "fr", "ar", "cs", "de", "es", "it", "nl", "ro", "ru", "sv", "tr", "zh"]
export const __LOCAL_STORAGE_LANG_KEY__ = "__LOCAL_STORAGE_LANG_KEY__"
export const DEFAULT_LANGUAGE = "en"

export const mfdLanguageOptions = {
  supportedLanguages: LANGUAGES,
  localStorageKey: __LOCAL_STORAGE_LANG_KEY__,
  defaultLanguage: DEFAULT_LANGUAGE,
  onLangChange: (lang: string) => {
    // override the language with the value of the lang URL parameter, if present and enabled
    // NB: do not rely on `lang=` param here because some MFD devices like Simrad add optional qs
    // params with additional data, including default system `&lang=en` which overrides the language we get
    // from mqtt in the case if app was built with REACT_APP_ENABLE_LANG_OVERRIDE flag set to true
    // (which is usually true for debugging and demo versions)
    const overrideLang = (window.location.search.match(/[?&]overrideLang=([a-zA-Z-_]{2,5})/) || [])[1]
    setLocale(
      process.env.REACT_APP_ENABLE_LANG_OVERRIDE === "true" && LANGUAGES.includes(overrideLang) ? overrideLang : lang
    )
  },
}
