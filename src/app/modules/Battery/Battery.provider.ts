import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"

export interface Battery {
  active_battery_service: boolean
  current: number
  voltage: number
  soc: number
  power: number
  temperature: number
  timetogo: number
  instance: number
  state: number
  id: string
  name: string
}

export interface BatteryState {
  batteries: Array<Battery>
}

export interface BatteryTopics extends Topics {
  batteries?: string
}

export function useBattery(): BatteryState {
  const getTopics = (portalId: PortalId) => ({
    batteries: `N/${portalId}/system/0/Batteries`,
  })

  const topics$ = useTopicsWithPortalId<BatteryTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)

  return useTopicsState<BatteryState>(topics$)
}
