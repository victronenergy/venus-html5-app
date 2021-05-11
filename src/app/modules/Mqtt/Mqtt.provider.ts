import { useObservable, useSubscription } from "observable-hooks"
import { useState } from "react"
import { combineLatest, Observable, of } from "rxjs"
import { distinctUntilChanged, map } from "rxjs/operators"
import { InstanceId } from "../Vebus"
import { mqttQuery } from "./Mqtt.query"
import { MqttService } from "./Mqtt.service"
import { mqttStore } from "./Mqtt.store"
import { MqttMessage, PortalId, Topics } from "./Mqtt.types"

export const useMqtt = () => {
  return new MqttService(mqttStore)
}

export const useTopicSubscriptions = (topics: Observable<Topics>) => {
  const mqttService = useMqtt()
  return useSubscription(topics, (topics) => {
    mqttService.subscribeToTopics(topics)
    return () => mqttService.unsubscribeFromTopics(topics)
  })
}

export const useTopicState = <TMessage = MqttMessage>(topic?: string): TMessage | undefined => {
  return useObservableTopicState<TMessage>(of(topic))
}

export const useObservableTopicState = <TMessage = MqttMessage>(
  topic: Observable<string | undefined>
): TMessage | undefined => {
  const [message, setMessage] = useState<TMessage>()

  useSubscription(topic, (topic) => {
    mqttQuery.messagesByTopic$(topic ?? "").subscribe((message) => {
      // @ts-ignore
      setMessage(message)
    })
  })

  return message
}

export const useTopicsState = <TMessages = any>(topics: Observable<Topics | undefined>): TMessages => {
  const [messages, setMessages] = useState({})

  useSubscription(topics, (topics) => {
    const subscription = mqttQuery.messagesByTopics$(topics ?? {}).subscribe((messages) => {
      setMessages(messages)
    })

    return () => subscription.unsubscribe()
  })

  return messages as TMessages
}

export const useTopicsWithPortalId = <TTopics = Topics>(
  getTopicsMethod: (portalId: PortalId) => TTopics,
  portalId$: Observable<PortalId>
) => useTopicsWithParameters<TTopics>(getTopicsMethod, portalId$)

export const useTopicsWithPortalIdAndInstanceId = <TTopics = Topics>(
  getTopicsMethod: (portalId: PortalId, instanceId: InstanceId) => TTopics,
  portalId$: Observable<PortalId>,
  instanceId$: Observable<InstanceId>
) => useTopicsWithParameters<TTopics>(getTopicsMethod, portalId$, instanceId$)

export const useTopicsWithParameters = <TTopics = Topics>(
  getTopicsMethod: (...args: any[]) => TTopics,
  ...observables: Observable<any>[]
) =>
  useObservable<TTopics>(() =>
    combineLatest(observables).pipe(
      distinctUntilChanged(),
      map((parameters) => getTopicsMethod(...parameters))
    )
  )
