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
  state: string
  mode: string
  customName: string
  productName: string
  modeIsAdjustable: boolean
}

export interface InputLimitSelectorTopics extends Topics {
  state?: string
  mode?: string
  customName?: string
  productName?: string
  modeIsAdjustable?: string
}

export interface InputLimitSelectorProvider extends InputLimitSelectorState {
  updateLimit: () => void
}

export function useInputLimitSelector(shorePowerInput: string): InputLimitSelectorProvider {
  const getTopics = (portalId: PortalId, deviceInstanceId: InstanceId) => {
    return {
      state: `N/${portalId}/system/0/SystemState/State`,
      mode: `N/${portalId}/vebus/${deviceInstanceId}/Mode`,
      customName: `N/${portalId}/vebus/${deviceInstanceId}/CustomName`,
      productName: `N/${portalId}/vebus/${deviceInstanceId}/ProductName`,
      modeIsAdjustable: `N/${portalId}/vebus/${deviceInstanceId}/ModeIsAdjustable`,
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
  const updateLimit = (limit: string) => mqtt.publish(writeTopics!.limit, limit)

  return { ...useTopicsState<InputLimitSelectorState>(topics$), updateLimit } as InputLimitSelectorProvider
}
