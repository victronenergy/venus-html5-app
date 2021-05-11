import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useMqtt, useTopicsState, useTopicSubscriptions, useTopicsWithParameters } from "../Mqtt/Mqtt.provider"
import { InstanceId, vebusQuery } from "../Vebus"
import { useObservableState } from "observable-hooks"
import { of } from "rxjs"

export interface InverterState {
  state?: string
  mode?: string
  voltage?: number
  current?: number
  power?: number
  customName?: string
  productName?: string
  nAcInputs?: number
}

export interface InverterTopics extends Topics {
  state?: string
  mode?: string
  voltage?: string
  current?: string
  power?: string
  customName?: string
  productName?: string
  nAcInputs?: string
}

export interface InverterProvider extends InverterState {
  updateMode: () => void
}

export function useInverter(source: string): InverterProvider {
  const getTopics = (portalId: PortalId, deviceInstanceId: InstanceId, source: string) => {
    return {
      state: `N/${portalId}/${source}/${deviceInstanceId}/State`,
      mode: `N/${portalId}/${source}/${deviceInstanceId}/Mode`,
      voltage: `N/${portalId}/${source}/${deviceInstanceId}/Ac/Out/L1/V`,
      current: `N/${portalId}/${source}/${deviceInstanceId}/Ac/Out/L1/I`,
      power: `N/${portalId}/${source}/${deviceInstanceId}/Ac/Out/L1/P`,
      customName: `N/${portalId}/${source}/${deviceInstanceId}/CustomName`,
      productName: `N/${portalId}/${source}/${deviceInstanceId}/ProductName`,
      nAcInputs: `N/${portalId}/${source}/${deviceInstanceId}/Ac/NumberOfAcInputs`,
    }
  }

  const topics$ = useTopicsWithParameters<InverterTopics>(
    getTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$,
    of(source)
  )

  useTopicSubscriptions(topics$)

  const getWriteTopics = (portalId: PortalId, deviceInstanceId: InstanceId, source: string) => ({
    mode: `W/${portalId}/${source}/${deviceInstanceId}/Mode`,
  })

  const writeTopics$ = useTopicsWithParameters(getWriteTopics, mqttQuery.portalId$, vebusQuery.instanceId$, of(source))
  const writeTopics = useObservableState(writeTopics$)

  const mqtt = useMqtt()
  const updateMode = (mode: string) => mqtt.publish(writeTopics!.mode, mode)

  return { ...useTopicsState<InverterState>(topics$), updateMode } as InverterProvider
}
