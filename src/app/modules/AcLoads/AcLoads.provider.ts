import {useObservableState, useSubscription} from 'observable-hooks'
import { mqttQuery, PortalId, Topics } from "../Mqtt"
import {
  useTopicsState,
  useTopicSubscriptions,
  useTopicsWithPortalIdAndInstanceId
} from "../Mqtt/Mqtt.provider"
import { vebusQuery } from "../Vebus/Vebus.query"
import { InstanceId } from "../Vebus/Vebus.store"

export interface AcLoadsState {
  phases: number | undefined
  current: number | undefined
  voltage: number | undefined
  power: number | undefined
}

export interface AcLoadsTopics extends Topics {
  power?: Array<string>
  voltage?: Array<string>
  current?: Array<string>
  phases?: string
}

export function useAcLoads (): AcLoadsState {
  const getTopics = (portalId: PortalId, instanceId: InstanceId) => ({
    phases: `N/${portalId}/system/0/Ac/Consumption/NumberOfPhases`,
    current: [
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L1/I`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L2/I`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L3/I`
    ],
    voltage: [
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L1/V`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L2/V`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L3/V`
    ],
    power: [
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L1/P`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L2/P`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L3/P`
    ]
  })

  const topics$ = useTopicsWithPortalIdAndInstanceId<AcLoadsTopics>(getTopics, mqttQuery.portalId$, vebusQuery.instanceId$)
  const topics = useObservableState(topics$, {})

  useTopicSubscriptions(topics$)
  // const msg = useTopicsState(topics)

  return {phases: undefined, current: undefined, voltage: undefined, power: undefined}
}
