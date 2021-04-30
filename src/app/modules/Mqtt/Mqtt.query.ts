import { Query } from "@datorama/akita"
import { filter, map, pluck } from "rxjs/operators"
import { MqttMessage, STATUS, Topics } from "."
import { MqttState, mqttStore, MqttStore } from "./Mqtt.store"

export class MqttQuery extends Query<MqttState> {
  all$ = this.select()
  client$ = this.select((s) => s.client)
  status$ = this.select((s) => s.status)
  messages$ = this.select((s) => s.messages)
  topicsSubscribed$ = this.select((s) => s.topicsSubscribed)
  portalId$ = this.select((s) => s.portalId)
  isConnected$ = this.select((s) => s.status === STATUS.CONNECTED)
  keepAliveHandlerRef$ = this.select((s) => s.keepAliveHandlerRef)
  error$ = this.selectError()

  constructor(protected store: MqttStore) {
    super(store)
  }

  messagesByTopic$ = (topic: string) => this.select((s) => s.messages).pipe(pluck(topic))

  messagesByTopics$ = (topics: Topics) => {
    return this.select(({ messages }) => {
      if (topics === undefined) {
        return {}
      }

      const result: { [key: string]: MqttMessage | MqttMessage[] } = {}
      Object.entries(topics).forEach(([label, topic]) => {
        if (Array.isArray(topic)) {
          result[label] = topic.map((t) => messages[t])
        } else if (topic === undefined) {
          result[label] = undefined
        } else {
          result[label] = messages[topic]
        }
      })
      return result
    })
  }

  messagesByWildcard$ = (wildcard: string) => {
    const re = new RegExp(wildcard.replace(/\+/g, ".*")) // + in mqtt is anything -> .*
    return this.select((s) => s.messages).pipe(
      map((messages) =>
        Object.fromEntries(
          Object.entries(messages)
            .filter(([label]) => label.match(re))
            .map(([label, topic]) => [label, messages[label]])
        )
      ),
      filter((value) => Object.values(value).length > 0)
    )
  }
}

export const mqttQuery = new MqttQuery(mqttStore)
