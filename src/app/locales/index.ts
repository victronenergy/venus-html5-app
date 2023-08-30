import { setTranslations, setLocale, setHandleMissingTranslation, translate } from "react-i18nify"
import { __LOCAL_STORAGE_LANG_KEY__, LANGUAGES, DEFAULT_LANGUAGE } from "./constants"
import { get } from "lodash-es"
import { Storage } from "@victronenergy/mfd-modules"

type TranslationRecord = {
  [key: string]: Record<string, any>
}

// Override language file names
const fileNameOverrides: { [language: string]: string } = {
  // add chinese mapping to correspond with possibleValues from: https://github.com/victronenergy/gui/blob/master/qml/PageSettingsDisplay.qml#L73
  // because POEditor uses zh-CN for chinese
  zh: "zh-CN",
}

const translations: TranslationRecord = Object.fromEntries(
  LANGUAGES.map((language) => [language, require(`./languages/${fileNameOverrides[language] || language}.json`)])
)

// override the language with the value of the lang URL parameter, if present
const languageOverride = (window.location.search.match(/[?&]lang=([a-zA-Z-_]{2,5})/) || [])[1]

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

const setupLocale = async () => {
  setLocale(
    (process.env.REACT_APP_ENABLE_LANG_OVERRIDE === "true" && languageOverride) ||
      (await Storage.getItem(__LOCAL_STORAGE_LANG_KEY__)) ||
      DEFAULT_LANGUAGE
  )
}

setupLocale().then()
