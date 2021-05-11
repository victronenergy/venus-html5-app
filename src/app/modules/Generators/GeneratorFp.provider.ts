import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useMqtt, useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"
import { useObservableState } from "observable-hooks"

export interface GeneratorFpState {
  statusCode: number
  productId: number
  productName: string
  phases: number
  gensetAutoStart: number
  autoStart: number
}

export interface GeneratorFpTopics extends Topics {
  statusCode?: string
  productId?: string
  productName?: string
  phases?: string
  gensetAutoStart?: string
  autoStart?: string
}

export interface GeneratorFpProvider extends GeneratorFpState {
  updateAutoMode: (mode: number) => void
  updateManualMode: (currentLimit: number) => void
}

export function useGeneratorFp(): GeneratorFpProvider {
  const getTopics = (portalId: PortalId) => {
    return {
      statusCode: `N/${portalId}/genset/0/StatusCode`,
      productId: `N/${portalId}/genset/0/ProductId`,
      productName: `N/${portalId}/genset/0/ProductName`,
      phases: `N/${portalId}/genset/0/NrOfPhases`,
      gensetAutoStart: `N/${portalId}/genset/0/AutoStart`,
      autoStart: `N/${portalId}/settings/0/Settings/Services/FischerPandaAutoStartStop`,
    }
  }

  const getWriteTopics = (portalId: PortalId) => ({
    autoMode: `W/${portalId}/settings/0/Settings/Services/FischerPandaAutoStartStop`,
    manualMode: `W/${portalId}/genset/0/Start`,
  })

  const writeTopics$ = useTopicsWithPortalId(getWriteTopics, mqttQuery.portalId$)
  const writeTopics = useObservableState(writeTopics$)

  const mqtt = useMqtt()
  const updateAutoMode = (mode: number) => mqtt.publish(writeTopics!.autoMode, mode.toString())
  const updateManualMode = (currentLimit: number) => mqtt.publish(writeTopics!.manualMode, currentLimit.toString())

  const topics$ = useTopicsWithPortalId<GeneratorFpTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)

  return {
    ...useTopicsState<GeneratorFpState>(topics$),
    updateAutoMode,
    updateManualMode,
  } as GeneratorFpProvider
}
