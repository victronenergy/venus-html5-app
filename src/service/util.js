import Logger from "../logging/logger"
/**
 * @typedef {object} Topic
 *
 * @prop {"N" | "R" | "W"} type
 * @prop {string} portalId
 * @prop {string} serviceType
 * @prop {string} deviceInstance
 * @prop {string} dbusPath
 */

/**
 * Splits a topic string into an object with properties for each "part"
 *
 * Topic structure is:
 * N/<portal ID>/<service_type>/<device instance>/<D-Bus path>
 *
 * See details at https://github.com/victronenergy/dbus-mqtt
 * @returns {Topic}
 */
export const parseTopic = topic => {
  const parts = topic.split("/")
  const dbusPathParts = parts.splice(4)
  const isAcIn = dbusPathParts[0] === "Ac" && dbusPathParts[1] === "In"
  return {
    type: parts[0],
    portalId: parts[1],
    serviceType: parts[2],
    deviceInstance: parseInt(parts[3]),
    dbusPath: "/" + (isAcIn ? dbusPathParts.splice(3).join("/") : dbusPathParts.join("/"))
  }
}

export const parseMessage = (topic, message) => {
  let data
  try {
    data = JSON.parse(message.toString())
  } catch (e) {
    data = {}
    Logger.error(topic, `[${message.toString()}]`, e)
  }

  const { dbusPath } = parseTopic(topic)

  return {
    path: dbusPath,
    value: data.value !== undefined ? data.value : null
  }
}

export function objectValues(data) {
  return Object.keys(data).map(key => data[key])
}

export const isPathOfType = (dbusPath, enumObject) => {
  const paths = objectValues(enumObject)
  return paths.includes(dbusPath)
}

export const arrayToSubscriptionMap = toSubscribe => {
  return toSubscribe.reduce((acc, value) => {
    acc[value] = 0
    return acc
  }, {})
}

export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}
