import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { InstanceId, useVebus, vebusQuery } from "../Vebus"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalIdAndInstanceId } from "../Mqtt/Mqtt.provider"

export interface ActiveInSourceState {
  current?: Array<number>
  voltage?: Array<number>
  power?: Array<number>
}

export interface ActiveInSourceTopics extends Topics {
  power?: Array<string>
  voltage?: Array<string>
  current?: Array<string>
}

export function useActiveInSource(): ActiveInSourceState {
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

  const topics$ = useTopicsWithPortalIdAndInstanceId<ActiveInSourceTopics>(
    getTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$
  )

  useTopicSubscriptions(topics$)
  let { current, voltage, power } = useTopicsState<ActiveInSourceState>(topics$)

  return { current, voltage, power }
}
