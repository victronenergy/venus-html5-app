import {useObservableState, useSubscription} from 'observable-hooks'
import {mqttQuery} from '../Mqtt'
import {useMqtt} from '../Mqtt/Mqtt.facade'
import { map } from "rxjs/operators"


export interface PvChargerState {
  current: number | undefined
  power: number | undefined
}

export function usePvCharger (): PvChargerState {
  const portalId = useObservableState(mqttQuery.portalId$)
  const mqttService = useMqtt()

  const topics = {
    power: `N/${portalId}/system/0/Dc/Pv/Power`,
    current: `N/${portalId}/system/0/Dc/Pv/Current`
  }

  useSubscription(mqttQuery.portalId$, () => {
    mqttService.subscribeToTopics(topics)

    return () => mqttService.unsubscribeFromTopics(topics)
  })

  const power = useObservableState(mqttQuery.messagesByTopic$(topics.power).pipe(map(v => -1 * parseInt(v as string))))
  const current = useObservableState(mqttQuery.messagesByTopic$(topics.current).pipe(map(v => parseInt(v as string))))

  console.log("PvCharger", power, current);

  return {power, current}

}
