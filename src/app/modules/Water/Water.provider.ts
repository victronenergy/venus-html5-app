import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"

export interface WaterType {
  volume: number,
  size: number,
  level: number
}

export interface WaterState {
  fresh_water?: WaterType
  waste_water?: WaterType
  black_water?: WaterType
}

export interface WaterTopics extends Topics {
  fresh_water?: string
  waste_water?: string
  black_water?: string
}

export function useWater (): WaterState {
  const getTopics = (portalId: PortalId) => ({
    fresh_water: `N/${portalId}/system/0/Water`,
    waste_water: `N/${portalId}/system/0/Water`,
    black_water: `N/${portalId}/system/0/Water`,
  })

  const topics$ = useTopicsWithPortalId<WaterTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)
  let { fresh_water, waste_water, black_water } = useTopicsState<WaterState>(topics$)

  fresh_water = {volume: 2, size: 9, level: 0} as WaterType
  waste_water = {volume: 2, size: 9, level: 0.4} as WaterType
  black_water = {volume: 2, size: 9, level: 0.4} as WaterType

  return {fresh_water, waste_water, black_water}
}
