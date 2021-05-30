import { Query } from "@datorama/akita"
import { distinctUntilChanged, filter, map, pluck, tap } from "rxjs/operators"
import { MqttMessage, STATUS, Topics } from "."
import { MqttState, mqttStore, MqttStore } from "./Mqtt.store"
import { isEqual } from "lodash-es"
import { of } from "rxjs"

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
    return this.select((s) => s.messages).pipe(
      distinctUntilChanged((a, b) => {
        return Object.values(topics)
          .flat()
          .every((topic) => topic === undefined || b[topic] === a[topic])
      }),
      map((messages) => {
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
      }),
      filter(
        (messages) =>
          !Object.values(messages).every((value) => {
            if (Array.isArray(value)) {
              return value.length === 0 || value.every((v) => v === undefined || v === null)
            } else {
              return value === undefined || value === null
            }
          })
      )
    )
  }

  messagesByWildcard$ = (wildcard?: string) => {
    if (wildcard === undefined || wildcard === "" || wildcard === null) return of({})
    const topicRegex = new RegExp(wildcard.replace(/\+/g, "\\w*")) // + in mqtt is anything -> .*
    return this.select((s) => s.messages).pipe(
      distinctUntilChanged((a, b) => isEqual(Object.entries(a), Object.entries(b))),
      map((messages) =>
        Object.fromEntries(
          Object.entries(messages)
            .filter(([topic]) => topic.match(topicRegex))
            .map(([topic]) => [topic, messages[topic]])
        )
      ),
      filter((value) => Object.values(value).length > 0),
      // Make sure we don't only have undefined and null values
      filter(
        (messages) =>
          !Object.values(messages).every((value) => {
            if (Array.isArray(value)) {
              return value.length === 0 || value.every((v) => v === undefined || v === null)
            } else {
              return value === undefined || value === null
            }
          })
      ),
      distinctUntilChanged((a, b) => isEqual(Object.entries(a), Object.entries(b)))
    )
  }
}

export const mqttQuery = new MqttQuery(mqttStore)
