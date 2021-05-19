import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"

export interface SystemStateState {
  state: number
}

export interface SystemStateTopics extends Topics {
  state?: string
}

export function useSystemState(): SystemStateState {
  const getTopics = (portalId: PortalId) => ({
    state: `N/${portalId}/system/0/SystemState/State`,
  })

  const topics$ = useTopicsWithPortalId<SystemStateTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)

  return useTopicsState<SystemStateState>(topics$)
}
