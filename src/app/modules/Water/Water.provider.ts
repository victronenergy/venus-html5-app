import {useObservableState, useSubscription} from 'observable-hooks'
import {map} from 'rxjs/operators'
import { mqttQuery, PortalId } from "../Mqtt"
import { useMqtt, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"
import { DcLoadsTopics } from "../DcLoads"

export interface WaterType {
  volume: number,
  size: number,
  level: number
}

export interface WaterState {
  fresh_water: WaterType | undefined
  waste_water: WaterType | undefined
  black_water: WaterType | undefined
}

export function useWater (): WaterState {
  const getTopics = (portalId: PortalId) => ({
    fresh_water: `N/${portalId}/system/0/Water`,
    waste_water: `N/${portalId}/system/0/Water`,
    black_water: `N/${portalId}/system/0/Water`,
  })
  const topics$ = useTopicsWithPortalId<DcLoadsTopics>(getTopics, mqttQuery.portalId$)
  const topics = useObservableState(topics$, {})

  // useTopicSubscriptions(topics$)

  const fresh_water = {volume: 2, size: 9, level: 0} as WaterType
  const waste_water = {volume: 2, size: 9, level: 0.4} as WaterType
  const black_water = {volume: 2, size: 9, level: 0.4} as WaterType

  return {fresh_water, waste_water, black_water}
}
