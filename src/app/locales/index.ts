import { setTranslations, setLocale, setHandleMissingTranslation, translate } from "react-i18nify"
import { __LOCAL_STORAGE_LANG_KEY__, LANGAUGES, DEFAULT_LANGUAGE } from "./constants"
import { get } from "lodash-es"

type LangObj = {
  [key: string]: Record<string, any>
}

const languagesJSONS: LangObj = LANGAUGES.reduce(
  (rx, l) => ({
    ...rx,
    [l]: require(`./languages/${l}.json`),
  }),
  {}
)

setHandleMissingTranslation((key, replacements) => {
  if (!get(languagesJSONS[DEFAULT_LANGUAGE], key)) {
    console.warn(`Missing translation for ${key}`)
    return `Missing translation for ${key}`
  }
  return translate(key, replacements, { locale: DEFAULT_LANGUAGE })
})

setTranslations(languagesJSONS)

setLocale(localStorage.getItem(__LOCAL_STORAGE_LANG_KEY__) || DEFAULT_LANGUAGE)
