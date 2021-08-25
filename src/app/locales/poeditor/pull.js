const path = require("path")
const axios = require("axios").default
const qs = require("qs")
const fs = require("fs")
const { LANGUAGES_PATH } = require("./constants")

require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.local"),
})

console.log("Running POEditor Pull Script")

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

const getLanguages = async () => {
  try {
    const res = await api.post("/languages/list")
    return res.data.result.languages.map((language) => language.code)
  } catch (e) {
    console.error(`An error occured while fetching the languages of the project. Error:`, e)
  }
}

const getExportFileURL = async (language) => {
  try {
    const res = await api.post("projects/export", { language, type: "key_value_json" })
    return res.data.result.url
  } catch (e) {
    console.error(`An error occured while getting the export file URL. Error:`, e)
  }
}

const unflatten = (data) => {
  if (Object(data) !== data || Array.isArray(data)) return data
  var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
    resultholder = {}
  for (var p of Object.keys(data).sort()) {
    var cur = resultholder,
      prop = "",
      m
    while ((m = regex.exec(p))) {
      cur = cur[prop] || (cur[prop] = m[2] ? [] : {})
      prop = m[2] || m[1]
    }
    cur[prop] = data[p]
  }
  return resultholder[""] || resultholder
}

const jsonSerializerReplacer = (_, value) => {
  if (typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((s, k) => {
        s[k] = value[k]
        return s
      }, {})
  }

  if (value === "") return undefined
  return value
}

;(async () => {
  ;(await getLanguages()).forEach(async (language) => {
    try {
      console.log(`Exporting translations for ${language}`)
      const url = await getExportFileURL(language)
      const res = await api.get(url)
      fs.writeFileSync(
        `${LANGUAGES_PATH}/${language}.json`,
        JSON.stringify(unflatten(res.data || {}), jsonSerializerReplacer, 4)
      )
    } catch (e) {
      console.error(`An error occured while saving the exported translations for ${language}. Error:`, e)
    }
  })
})()
