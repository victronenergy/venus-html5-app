import {Query} from '@datorama/akita'
import {MqttState, mqttStore, MqttStore} from './Mqtt.store'

export class MqttQuery extends Query<MqttState> {
    constructor (protected store: MqttStore) {
        super(store)
    }

    all$ = this.select()
    client$ = this.select(s => s.client)
    host$ = this.select(s => s.host)
    port$ = this.select(s => s.port)
    status$ = this.select(s => s.status)
    messages$ = this.select(s => s.messages)
    topicsSubscribed$ = this.select(s => s.topicsSubscribed)
}

export const mqttQuery = new MqttQuery(mqttStore)
