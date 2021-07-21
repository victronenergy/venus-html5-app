const path = require("path")
const axios = require("axios").default
const qs = require("qs")
const fs = require("fs")
const { LANGUAGES_PATH } = require("./constants")

require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.local"),
})

// Source languages folder relative to process.cwd()
const MAIN_LANGUAGE = "en"

console.log("Running POEditor Push Script")

const api = axios.create({
  baseURL: process.env.POEDITOR_API_URL,
})

// Add api_token and project_id
// Serialize to x-www-form-urlencoded
api.interceptors.request.use((request) => {
  const data = {
    ...request.data,
    api_token: process.env.POEDITOR_API_KEY,
    id: process.env.POEDITOR_PROJECT_ID,
  }
  request.data = qs.stringify(data)

  return request
})

const getLanguages = () =>
  fs
    .readdirSync(LANGUAGES_PATH)
    .filter((fileName) => fileName.includes(".json"))
    .map((fileName) => fileName.split(".").slice(0, -1).join("."))

const getDictFromFile = (language) => {
  const rawData = fs.readFileSync(`${LANGUAGES_PATH}/${language}.json`)
  return JSON.parse(rawData)
}

/**
 * Build the DTO required by the POEditor API to sync translations
 * @param {*} dict Dictionary namespaced by file name
 */
const buildPOEditorTranslations = (dict, prevCtx = "") => {
  const translations = []
  Object.keys(dict).forEach((term) => {
    let context = prevCtx
    if (typeof dict[term] === "object") {
      context = prevCtx ? prevCtx + "." + term : term
      translations.push(...buildPOEditorTranslations(dict[term], context))
    } else {
      translations.push({
        term: term,
        context,
        translation: {
          content: dict[term],
        },
      })
    }
  })

  return translations
}

/**
 * Add terms from the main language file
 */
async function syncTerms(sync = false) {
  const termsDict = getDictFromFile(MAIN_LANGUAGE)
  const terms = buildPOEditorTranslations(termsDict)
  try {
    if (sync) {
      const res = await api.post("/projects/sync", { data: JSON.stringify(terms) })
      console.log("Terms from the main language synced. Result:", res.data.result.terms)
    } else {
      const res = await api.post("/terms/add", { data: JSON.stringify(terms) })
      console.log("Terms from the main language added. Result:", res.data.result.terms)
    }
  } catch (e) {
    console.error("An error occured while trying to add/sync the terms from the main language. Error:", e)
  }
}

async function addLanguages() {
  try {
    const res = await api.post("/languages/list")
    const projectLanguages = res.data.result.languages.map((language) => language.code)
    const localLanguages = getLanguages()
    const difference = localLanguages.filter((language) => !projectLanguages.includes(language))
    if (difference.length) console.log("Adding the following languages to the POEditor project:", difference)
    difference.forEach(async (language) => {
      const res = await api.post("/languages/add", { language })
      console.log(`${language} to the POEditor project. Result:`, res.data.response)
    })
  } catch (e) {
    console.log(`An error occured while adding languages. Error:`, e)
  }
}

/**
 * Sync the translations
 * Sync the main language first to prevent marking new translations as fuzzy
 */
function syncTranslations() {
  const languages = getLanguages().filter((language) => language !== MAIN_LANGUAGE)
  languages.unshift(MAIN_LANGUAGE)

  languages.forEach(async (language) => {
    const translationDict = getDictFromFile(language)
    const translations = buildPOEditorTranslations(translationDict)

    try {
      const res = await api.post("/languages/update", {
        language,
        fuzzy_trigger: language === MAIN_LANGUAGE ? 1 : 0,
        data: JSON.stringify(translations),
      })
      console.log(`Translations for ${language} synced. Result:`, res.data.result.translations)
    } catch (e) {
      console.error(`An error occurred while trying to sync the translations from ${language}. Error:`, e)
    }
  })
}

;(async () => {
  await syncTerms(process.argv.length === 3 && process.argv[2] === "-f")
  await addLanguages()
  syncTranslations()
})()
