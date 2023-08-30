import {
  InstanceId,
  PortalId,
  Topics,
  useMqtt,
  useTopicsState,
  useTopicSubscriptions,
  useVebusStore,
} from "@victronenergy/mfd-modules"
import { useMemo } from "react"

export interface VebusAlarmsState {
  voltage: number
  power: number
  current: number
}

export interface AlarmsTopics extends Topics {
  power?: string
  voltage?: string
  current?: string
}

export function useVebusAlarms(): VebusAlarmsState {
  const getTopics = (portalId: PortalId, instanceId: InstanceId) => ({
    lowBattery: `N/${portalId}/vebus/${instanceId}/Alarms/LowBattery`,
    phaseRotation: `N/${portalId}/vebus/${instanceId}/Alarms/PhaseRotation`,
    ripple: `N/${portalId}/vebus/${instanceId}/Alarms/Ripple`,
    batteryTemperatureSensor: `N/${portalId}/vebus/${instanceId}/Alarms/TemperatureSensor`,

    phaseHighTemperature: [
      `N/${portalId}/vebus/${instanceId}/Alarms/L1/HighTemperature`,
      `N/${portalId}/vebus/${instanceId}/Alarms/L2/HighTemperature`,
      `N/${portalId}/vebus/${instanceId}/Alarms/L3/HighTemperature`,
    ],
    phaseLowBattery: [
      `N/${portalId}/vebus/${instanceId}/Alarms/L1/LowBattery`,
      `N/${portalId}/vebus/${instanceId}/Alarms/L2/LowBattery`,
      `N/${portalId}/vebus/${instanceId}/Alarms/L3/LowBattery`,
    ],
    phaseOverload: [
      `N/${portalId}/vebus/${instanceId}/Alarms/L1/Overload`,
      `N/${portalId}/vebus/${instanceId}/Alarms/L2/Overload`,
      `N/${portalId}/vebus/${instanceId}/Alarms/L3/Overload`,
    ],
    phaseRipple: [
      `N/${portalId}/vebus/${instanceId}/Alarms/L1/Ripple`,
      `N/${portalId}/vebus/${instanceId}/Alarms/L2/Ripple`,
      `N/${portalId}/vebus/${instanceId}/Alarms/L3/Ripple`,
    ],
  })

  const { portalId } = useMqtt()
  const { instanceId } = useVebusStore()
  const topics = useMemo(() => getTopics(portalId, instanceId), [portalId, instanceId])

  useTopicSubscriptions(topics)

  return useTopicsState<VebusAlarmsState>(topics)
}
