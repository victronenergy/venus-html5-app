import { setTranslations, setLocale } from "react-i18nify"
import { __LOCAL_STORAGE_LANG_KEY__, LANGAUGES, DEFAULT_LANGUAGE } from "./constants"

const languagesJSONS = LANGAUGES.reduce(
  (rx, l) => ({
    ...rx,
    [l]: require(`./languages/${l}.json`),
  }),
  {}
)

setTranslations(languagesJSONS)

setLocale(localStorage.getItem(__LOCAL_STORAGE_LANG_KEY__) || DEFAULT_LANGUAGE)
