import { mqttQuery, PortalId, Topics } from "../Mqtt"
import {
  useMqtt,
  useTopicsState,
  useTopicSubscriptions,
  useTopicsWithParameters,
  useTopicsWithPortalId,
} from "../Mqtt/Mqtt.provider"
import { useObservableState } from "observable-hooks"
import { InstanceId, useVebus, vebusQuery } from "../Vebus"

export interface GeneratorRelayState {
  relayFunction: number
  statusCode: number
  manualStart: number
  autoStart: number

  activeInput?: number
  phases?: number
  settings?: number[]
}

export interface GeneratorRelayTopics extends Topics {
  relayFunction?: string
  statusCode?: string
  manualStart?: string
  autoStart?: string

  activeInput?: string
  phases?: string
  settings?: string[]
}

export interface GeneratorRelayProvider extends GeneratorRelayState {
  updateAutoMode: () => void
  updateManualMode: () => void
}

export function useGeneratorRelay(): GeneratorRelayProvider {
  const getTopics = (portalId: PortalId, vebusInstanceId: InstanceId) => {
    const relayTopics = {
      relayFunction: `N/${portalId}/settings/0/Settings/Relay/Function`,
      statusCode: `N/${portalId}/generator/0/Generator0/State`,
      manualStart: `N/${portalId}/generator/0/Generator0/ManualStart`,
      autoStart: `N/${portalId}/settings/0/Settings/Generator0/AutoStartEnabled`,
    }

    const vebusTopics = {
      activeInput: `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/ActiveInput`,
      phases: `N/${portalId}/vebus/${vebusInstanceId}/Ac/NumberOfPhases`,
      settings: [
        `N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`,
        `N/${portalId}/settings/0/Settings/SystemSetup/AcInput2`,
      ],
    }

    return vebusInstanceId ? { ...relayTopics, ...vebusTopics } : relayTopics
  }

  const getWriteTopics = (portalId: PortalId) => ({
    autoMode: `W/${portalId}/settings/0/Settings/Generator0/AutoStartEnabled`,
    manualMode: `W/${portalId}/generator/0/Generator0/ManualStart`,
  })
  useVebus()

  const writeTopics$ = useTopicsWithPortalId(getWriteTopics, mqttQuery.portalId$)
  const writeTopics = useObservableState(writeTopics$)

  const mqtt = useMqtt()
  const updateAutoMode = (mode: string) => mqtt.publish(writeTopics!.autoMode, mode)
  const updateManualMode = (currentLimit: number | string) => mqtt.publish(writeTopics!.manualMode, currentLimit)

  const topics$ = useTopicsWithParameters<GeneratorRelayTopics>(getTopics, mqttQuery.portalId$, vebusQuery.instanceId$)

  useTopicSubscriptions(topics$)

  return {
    ...useTopicsState<GeneratorRelayState>(topics$),
    updateAutoMode,
    updateManualMode,
  } as GeneratorRelayProvider
}
