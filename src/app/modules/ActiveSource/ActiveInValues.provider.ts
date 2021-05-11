import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { InstanceId, useVebus, vebusQuery } from "../Vebus"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalIdAndInstanceId } from "../Mqtt/Mqtt.provider"

export interface ActiveInValuesState {
  current: Array<number>
  voltage: Array<number>
  power: Array<number>
}

export interface ActiveInValuesTopics extends Topics {
  power?: Array<string>
  voltage?: Array<string>
  current?: Array<string>
}

export function useActiveInValues(): ActiveInValuesState {
  const getTopics = (portalId: PortalId, instanceId: InstanceId) => ({
    current: [
      `N/${portalId}/vebus/${instanceId}/Ac/ActiveIn/L1/I`,
      `N/${portalId}/vebus/${instanceId}/Ac/ActiveIn/L2/I`,
      `N/${portalId}/vebus/${instanceId}/Ac/ActiveIn/L3/I`,
    ],
    voltage: [
      `N/${portalId}/vebus/${instanceId}/Ac/ActiveIn/L1/V`,
      `N/${portalId}/vebus/${instanceId}/Ac/ActiveIn/L2/V`,
      `N/${portalId}/vebus/${instanceId}/Ac/ActiveIn/L3/V`,
    ],
    power: [
      `N/${portalId}/vebus/${instanceId}/Ac/ActiveIn/L1/P`,
      `N/${portalId}/vebus/${instanceId}/Ac/ActiveIn/L2/P`,
      `N/${portalId}/vebus/${instanceId}/Ac/ActiveIn/L3/P`,
    ],
  })
  useVebus()

  const topics$ = useTopicsWithPortalIdAndInstanceId<ActiveInValuesTopics>(
    getTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$
  )

  useTopicSubscriptions(topics$)

  return useTopicsState<ActiveInValuesState>(topics$)
}
