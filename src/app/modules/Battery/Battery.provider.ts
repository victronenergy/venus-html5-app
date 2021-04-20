import {useObservableState, useSubscription} from 'observable-hooks'
import {mqttQuery} from '../Mqtt'
import {useMqtt} from '../Mqtt/Mqtt.facade'

export interface Battery {
  current: number | undefined
  voltage: number | undefined
  soc: number | undefined
  power: number | undefined
  temperature: number | undefined
  timeToGo: number | undefined
  instance: number | undefined
  state: number | undefined
  id: string | undefined
  name: string | undefined
}

export interface BatteryState {
  batteries: Array<Battery> | undefined
}

export function useBattery (): BatteryState {
  const portalId = useObservableState(mqttQuery.portalId$)
  const mqttService = useMqtt()

  const topics = {
    batteries: `N/${portalId}/system/0/Batteries`,
  }

  useSubscription(mqttQuery.portalId$, () => {
    mqttService.subscribeToTopics(topics)

    return () => mqttService.unsubscribeFromTopics(topics)
  })

  let batteries = useObservableState(mqttQuery.messagesByTopic$(topics.batteries)) as Battery[]
  if (batteries) {
    batteries = batteries.sort((a, b) => (a.state ? -1 : b.state ? 1 : 0))
  }

  return {batteries}

}
