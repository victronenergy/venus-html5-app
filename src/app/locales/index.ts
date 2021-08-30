import { setTranslations, setLocale, setHandleMissingTranslation, translate } from "react-i18nify"
import { __LOCAL_STORAGE_LANG_KEY__, LANGUAGES, DEFAULT_LANGUAGE } from "./constants"
import { get } from "lodash-es"

type TranslationRecord = {
  [key: string]: Record<string, any>
}

const translations: TranslationRecord = LANGUAGES.reduce(
  (rx, l) => ({
    ...rx,
    [l]: require(`./languages/${l}.json`),
  }),
  {}
)

// override the language with the value of the lang URL parameter, if present
const languageOverride = (window.location.search.match(/[?&]lang=([a-zA-Z-_]{2,5})/) || [])[1]

// add chinese mapping to correspond with possibleValues from: https://github.com/victronenergy/gui/blob/master/qml/PageSettingsDisplay.qml#L73
// because POEditor uses zh-CN for chinese
translations["zh"] = translations["zh-CN"]

// set the partially translated languages to fall back to English
if (!languageOverride) {
  translations["ar"] = translations["en"]
  translations["cs"] = translations["en"]
  translations["es"] = translations["en"]
  translations["ro"] = translations["en"]
  translations["ru"] = translations["en"]
  translations["sv"] = translations["en"]
  translations["tr"] = translations["en"]
}

setHandleMissingTranslation((key, replacements) => {
  if (!get(translations[DEFAULT_LANGUAGE], key)) {
    console.warn(`Missing translation for ${key}`)
    return `Missing translation for ${key}`
  }
  return translate(key, replacements, { locale: DEFAULT_LANGUAGE })
})

setTranslations(translations)

setLocale(languageOverride || localStorage.getItem(__LOCAL_STORAGE_LANG_KEY__) || DEFAULT_LANGUAGE)
