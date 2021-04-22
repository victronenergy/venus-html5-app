import {useObservableState, useSubscription} from 'observable-hooks'
import {map} from 'rxjs/operators'
import {mqttQuery} from '../Mqtt'
import {useMqtt} from '../Mqtt/Mqtt.provider'

export interface FreshWaterType {
  volume: number,
  size: number,
  level: number
}

export interface WaterState {
  fresh_water: FreshWaterType | undefined
}

export function useWater (): WaterState {
  const portalId = useObservableState(mqttQuery.portalId$)
  const mqttService = useMqtt()

  const topics = {
    fresh_water: `N/${portalId}/system/0/Water`,
  }

  useSubscription(mqttQuery.portalId$, () => {
    mqttService.subscribeToTopics(topics)

    return () => mqttService.unsubscribeFromTopics(topics)
  })


  const fresh_water = {volume: 2, size: 9, level: 0} as FreshWaterType

  return {fresh_water}
}
