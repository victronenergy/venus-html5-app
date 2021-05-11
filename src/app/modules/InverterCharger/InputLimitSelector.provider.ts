import { mqttQuery, PortalId, Topics } from "../Mqtt"
import {
  useMqtt,
  useTopicsState,
  useTopicSubscriptions,
  useTopicsWithParameters,
  useTopicsWithPortalIdAndInstanceId,
} from "../Mqtt/Mqtt.provider"
import { InstanceId, vebusQuery } from "../Vebus"
import { useObservableState } from "observable-hooks"
import { of } from "rxjs"

export interface InputLimitSelectorState {
  currentLimit: number
  currentLimitMax: number
  productId: number
}

export interface InputLimitSelectorTopics extends Topics {
  currentLimit?: string
  currentLimitMax?: string
  productId?: string
}

export interface InputLimitSelectorProvider extends InputLimitSelectorState {
  updateLimit: (limit: number) => void
}

export function useInputLimitSelector(shorePowerInput: number): InputLimitSelectorProvider {
  const getTopics = (portalId: PortalId, deviceInstanceId: InstanceId) => {
    return {
      currentLimit: `N/${portalId}/vebus/${deviceInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
      currentLimitMax: `N/${portalId}/vebus/${deviceInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitGetMax`,
      productId: `N/${portalId}/vebus/${deviceInstanceId}/ProductId`,
    }
  }

  const topics$ = useTopicsWithPortalIdAndInstanceId<InputLimitSelectorTopics>(
    getTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$
  )

  useTopicSubscriptions(topics$)

  const getWriteTopics = (portalId: PortalId, deviceInstanceId: InstanceId, shorePowerInput: string) => ({
    limit: `W/${portalId}/vebus/${deviceInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
  })

  const writeTopics$ = useTopicsWithParameters(
    getWriteTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$,
    of(shorePowerInput)
  )
  const writeTopics = useObservableState(writeTopics$)

  const mqtt = useMqtt()
  const updateLimit = (limit: number) => mqtt.publish(writeTopics!.limit, limit.toString())

  return { ...useTopicsState<InputLimitSelectorState>(topics$), updateLimit } as InputLimitSelectorProvider
}
