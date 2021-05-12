import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalIdAndInstanceId } from "../Mqtt/Mqtt.provider"
import { vebusQuery, InstanceId, useVebus } from "../Vebus"

export interface AcLoadsState {
  phases: number
  frequency: Array<number>
  current: Array<number>
  voltage: Array<number>
  power: Array<number>
}

export interface AcLoadsTopics extends Topics {
  frequency?: Array<string>
  power?: Array<string>
  voltage?: Array<string>
  current?: Array<string>
  phases?: string
}

export function useAcLoads(): AcLoadsState {
  const getTopics = (portalId: PortalId, instanceId: InstanceId) => ({
    phases: `N/${portalId}/system/0/Ac/Consumption/NumberOfPhases`,
    frequency: [
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L1/F`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L2/F`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L3/F`,
    ],
    current: [
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L1/I`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L2/I`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L3/I`,
    ],
    voltage: [
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L1/V`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L2/V`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L3/V`,
    ],
    power: [
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L1/P`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L2/P`,
      `N/${portalId}/vebus/${instanceId}/Ac/Out/L3/P`,
    ],
  })
  useVebus()

  const topics$ = useTopicsWithPortalIdAndInstanceId<AcLoadsTopics>(
    getTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$
  )

  useTopicSubscriptions(topics$)
  const { current, voltage, power, frequency, phases } = useTopicsState<AcLoadsState>(topics$)

  return { current, voltage, power, frequency, phases }
}
