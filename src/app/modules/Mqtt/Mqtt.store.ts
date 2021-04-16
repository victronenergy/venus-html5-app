import {Store, StoreConfig} from '@datorama/akita'
import {MqttClient} from 'mqtt'
import {RefObject} from 'react'
import {MQTT_STORE_NAME, STATUS} from './Mqtt.constants'

export interface MqttState {
    host: string
    port: number
    client: MqttClient | null
    error: object | null
    status: string
    messages: {[topic: string]: {value: string}}
    topicsSubscribed: Set<string>
    keepAliveHandlerRef: RefObject<any> | null
}

const createInitialState = (): MqttState => ({
    host: 'localhost',
    port: 1883,
    client: null,
    status: STATUS.CONNECTING,
    messages: {},
    topicsSubscribed: new Set(),
    keepAliveHandlerRef: null,
    error: null,
})

@StoreConfig({name: MQTT_STORE_NAME})
export class MqttStore extends Store<MqttState> {
    constructor () {
        super(createInitialState())
    }
}

export const mqttStore = new MqttStore()
