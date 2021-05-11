import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"

export interface GeneratorsState {
  relayFunction?: number
  gensetCode?: number
  generatorState?: number
}

export interface GeneratorsTopics extends Topics {
  relayFunction?: string
  gensetCode?: string
  generatorState?: string
}

export function useGenerators(): GeneratorsState {
  const getTopics = (portalId: PortalId) => {
    return {
      relayFunction: `N/${portalId}/settings/0/Settings/Relay/Function`,
      gensetCode: `N/${portalId}/genset/0/StatusCode`,
      generatorState: `N/${portalId}/generator/0/Generator0/State`,
    }
  }

  const topics$ = useTopicsWithPortalId<GeneratorsTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)
  let { relayFunction, gensetCode, generatorState } = useTopicsState<GeneratorsState>(topics$)

  return { relayFunction, gensetCode, generatorState }
}
