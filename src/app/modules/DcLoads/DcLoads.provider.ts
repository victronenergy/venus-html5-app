import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"

export interface DcLoadsState {
  voltage: number
  power: number
  current: number
}

export interface DcLoadsTopics extends Topics {
  power?: string
  voltage?: string
  current?: string
}

export function useDcLoads(): DcLoadsState {
  const getTopics = (portalId: PortalId) => ({
    voltage: `N/${portalId}/system/0/Dc/Battery/Voltage`,
    current: `N/${portalId}/system/0/Dc/Battery/Current`,
    power: `N/${portalId}/system/0/Dc/System/Power`,
  })

  const topics$ = useTopicsWithPortalId<DcLoadsTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)
  let { power, voltage, current } = useTopicsState<DcLoadsState>(topics$)

  return { power, voltage, current }
}
