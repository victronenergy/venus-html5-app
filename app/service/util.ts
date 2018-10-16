export type Topic = {
  type: "N" | "R" | "W"
  portalId: string
  serviceType: string
  deviceInstance: number | null
  dbusPath: string
}

/**
 * Splits a topic string into an object with properties for each "part"
 *
 * Topic structure is:
 * N/<portal ID>/<service_type>/<device instance>/<D-Bus path>
 *
 * See details at https://github.com/victronenergy/dbus-mqtt
 */
export const parseTopic = (topic: string) => {
  const parts = topic.split("/")
  return {
    type: parts[0],
    portalId: parts[1],
    serviceType: parts[2],
    deviceInstance: parseInt(parts[3]),
    dbusPath: "/" + parts.splice(4).join("/")
  } as Topic
}

export function objectValues(data: any) {
  return Object.keys(data).map(key => data[key])
}

export const isPathOfType = (dbusPath: string, enumObject: any) => {
  const paths = objectValues(enumObject)
  return paths.indexOf(dbusPath) !== -1
}
