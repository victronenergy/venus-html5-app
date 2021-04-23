import {useObservable, useObservableState, useSubscription} from 'observable-hooks'
import { combineLatest, Observable } from "rxjs"
import {map} from 'rxjs/operators'
import {mqttQuery} from './Mqtt.query'
import {MqttService} from './Mqtt.service'
import {mqttStore} from './Mqtt.store'
import {PortalId, Topics} from './Mqtt.types'
import { InstanceId } from "../Vebus/Vebus.store"

export const useMqtt = () => {
    return new MqttService(mqttStore)
}

export const useTopicSubscriptions = (topics: Observable<Topics>) => {
    const mqttService = useMqtt()
    return useSubscription(topics, topics => {
        mqttService.subscribeToTopics(topics)
        return () => mqttService.unsubscribeFromTopics(topics)
    })
}

export const useTopicState = (topic?: string) => {
    return useObservableState(mqttQuery.messagesByTopic$(topic ?? ''))
}

export const useTopicsState = (topics: Topics) => {
    return useObservableState(mqttQuery.messagesByTopics$(topics))
}

export const useTopicsWithPortalId = <TTopics = Topics> (
    getTopicsMethod: (portalId: PortalId) => TTopics,
    portalId$: Observable<PortalId>
) => useObservable<TTopics>(() => portalId$.pipe(map(getTopicsMethod)))

export const useTopicsWithPortalIdAndInstanceId = <TTopics = Topics> (
  getTopicsMethod: (portalId: PortalId, instanceId: InstanceId) => TTopics,
  portalId$: Observable<PortalId>,
  instanceId$: Observable<InstanceId>,
) => useObservable<TTopics>(() => combineLatest([portalId$, instanceId$]).pipe(
  map(([portalId, instanceId]) => getTopicsMethod(portalId, instanceId)),
))
