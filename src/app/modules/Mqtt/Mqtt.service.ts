import {stat} from 'fs'
import {MqttState, mqttStore, MqttStore} from './Mqtt.store'

export class MqttService {
    constructor (private store: MqttStore) {}

    update (data: Partial<MqttState>) {
        this.store.update(data)
    }

    subscribeToTopic (topic: string) {
        this.store.update(state => {
            if (!state.topicsSubscribed.has(topic)) {
                state.topicsSubscribed.add(topic)
            }
            return state
        })
    }

    unsubscribeFromTopic (topic: string) {
        this.store.update(state => {
            if (state.topicsSubscribed.has(topic)) {
                state.topicsSubscribed.delete(topic)
            }
            return state
        })
    }
}

export const mqttService = new MqttService(mqttStore)
