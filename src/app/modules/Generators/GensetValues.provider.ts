import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"

export interface GensetValuesState {
  voltage?: Array<number>
  current?: Array<number>
  power?: Array<number>
  frequency?: Array<number>
  coolant?: number
  winding?: number
  exhaust?: number
}

export interface GensetValuesTopics extends Topics {
  voltage?: Array<string>
  current?: Array<string>
  power?: Array<string>
  frequency?: Array<string>
  coolant?: string
  winding?: string
  exhaust?: string
}

export function useGensetValues(): GensetValuesState {
  const getTopics = (portalId: PortalId) => {
    return {
      voltage: [
        `N/${portalId}/genset/0/Ac/L1/Voltage`,
        `N/${portalId}/genset/0/Ac/L2/Voltage`,
        `N/${portalId}/genset/0/Ac/L3/Voltage`,
      ],
      current: [
        `N/${portalId}/genset/0/Ac/L1/Current`,
        `N/${portalId}/genset/0/Ac/L2/Current`,
        `N/${portalId}/genset/0/Ac/L3/Current`,
      ],
      power: [
        `N/${portalId}/genset/0/Ac/L1/Power`,
        `N/${portalId}/genset/0/Ac/L2/Power`,
        `N/${portalId}/genset/0/Ac/L3/Power`,
      ],
      frequency: [
        `N/${portalId}/genset/0/Ac/L1/Frequency`,
        `N/${portalId}/genset/0/Ac/L2/Frequency`,
        `N/${portalId}/genset/0/Ac/L3/Frequency`,
      ],
      coolant: `N/${portalId}/genset/0/Engine/CoolantTemperature`,
      winding: `N/${portalId}/genset/0/Engine/WindingTemperature`,
      exhaust: `N/${portalId}/genset/0/Engine/ExaustTemperature`,
    }
  }

  const topics$ = useTopicsWithPortalId<GensetValuesTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)
  let { voltage, current, power, frequency, coolant, winding, exhaust } = useTopicsState<GensetValuesState>(topics$)

  return { voltage, current, power, frequency, coolant, winding, exhaust }
}
