import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"

export interface PvChargerState {
  current?: number
  power?: number
}

export interface PvChargerTopics extends Topics {
  current?: string
  power?: string
}
export function usePvCharger(): PvChargerState {
  const getTopics = (portalId: PortalId) => ({
    power: [`N/${portalId}/system/0/Dc/Pv/Power`],
    current: [`N/${portalId}/system/0/Dc/Pv/Current`],
  })

  const topics$ = useTopicsWithPortalId<PvChargerTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)
  let { power, current } = useTopicsState<PvChargerState>(topics$)

  return { power, current }
}
