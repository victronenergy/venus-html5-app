import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"

export interface HeaderState {
  showRemoteConsoleSetting: boolean
}

export interface HeaderTopics extends Topics {
  showRemoteConsoleSetting?: string
}

export function useHeader(): HeaderState {
  const getTopics = (portalId: PortalId) => {
    return {
      showRemoteConsoleSetting: `N/${portalId}/settings/0/Settings/System/VncLocal`,
    }
  }

  const topics$ = useTopicsWithPortalId<HeaderTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)

  return useTopicsState<HeaderState>(topics$)
}
