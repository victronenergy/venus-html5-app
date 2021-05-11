import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useMqtt, useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"
import { useObservableState } from "observable-hooks"

export interface GeneratorRelayState {
  statusCode?: number
  manualStart?: number
  autoStart?: number
}

export interface GeneratorRelayTopics extends Topics {
  statusCode?: string
  manualStart?: string
  autoStart?: string
}

export interface GeneratorRelayProvider extends GeneratorRelayState {
  updateAutoMode: () => void
  updateManualMode: () => void
}

export function useGeneratorRelay(): GeneratorRelayProvider {
  const getTopics = (portalId: PortalId) => {
    return {
      statusCode: `N/${portalId}/generator/0/Generator0/State`,
      manualStart: `N/${portalId}/generator/0/Generator0/ManualStart`,
      autoStart: `N/${portalId}/settings/0/Settings/Generator0/AutoStartEnabled`,
    }
  }

  const getWriteTopics = (portalId: PortalId) => ({
    autoMode: `W/${portalId}/settings/0/Settings/Generator0/AutoStartEnabled`,
    manualMode: `W/${portalId}/generator/0/Generator0/ManualStart`,
  })

  const writeTopics$ = useTopicsWithPortalId(getWriteTopics, mqttQuery.portalId$)
  const writeTopics = useObservableState(writeTopics$)

  const mqtt = useMqtt()
  const updateAutoMode = (mode: string) => mqtt.publish(writeTopics!.autoMode, mode)
  const updateManualMode = (currentLimit: number | string) =>
    mqtt.publish(writeTopics!.manualMode, currentLimit.toString())

  const topics$ = useTopicsWithPortalId<GeneratorRelayTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)

  return {
    ...useTopicsState<GeneratorRelayState>(topics$),
    updateAutoMode,
    updateManualMode,
  } as GeneratorRelayProvider
}
