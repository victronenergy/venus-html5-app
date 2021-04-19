import {MqttService} from './Mqtt.service'
import {mqttStore} from './Mqtt.store'

export const useMqtt = () => {
    return new MqttService(mqttStore)
}
