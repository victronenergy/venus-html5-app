import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithParameters } from "../Mqtt/Mqtt.provider"
import { InstanceId, vebusQuery } from "../Vebus"
import { of } from "rxjs"

export interface InputLimitState {
  currentLimit?: string
  currentLimitIsAdjustable?: string
}

export interface InputLimitTopics extends Topics {
  currentLimit?: string
  currentLimitIsAdjustable?: string
}

export function useInputLimit(shorePowerInput: string): InputLimitState {
  const getTopics = (portalId: PortalId, deviceInstanceId: InstanceId, shorePowerInput: string) => {
    return {
      currentLimit: `N/${portalId}/vebus/${deviceInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
      currentLimitIsAdjustable: `N/${portalId}/vebus/${deviceInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitIsAdjustable`,
    }
  }

  const topics$ = useTopicsWithParameters<InputLimitTopics>(
    getTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$,
    of(shorePowerInput)
  )

  useTopicSubscriptions(topics$)

  return { ...useTopicsState<InputLimitState>(topics$) }
}
