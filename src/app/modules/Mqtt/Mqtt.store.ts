import { Store, StoreConfig } from "@datorama/akita"
import { MqttClient } from "mqtt"
import { MQTT_STORE_NAME, STATUS } from "."
import { MqttMessages, PortalId } from "."

export interface MqttState {
  client: MqttClient | null
  error: object | null | boolean
  status: string
  messages: MqttMessages
  topicsSubscribed: Set<string>
  portalId: PortalId
  keepAliveHandlerRef: any
}

const createInitialState = (): MqttState => ({
  client: null,
  status: STATUS.CONNECTING,
  messages: {},
  topicsSubscribed: new Set(),
  error: null,
  portalId: null,
  keepAliveHandlerRef: undefined,
})

@StoreConfig({ name: MQTT_STORE_NAME, resettable: true })
export class MqttStore extends Store<MqttState> {
  constructor() {
    super(createInitialState())
  }
}

export const mqttStore = new MqttStore()
