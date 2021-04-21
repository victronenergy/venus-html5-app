import {useObservableState, useSubscription} from 'observable-hooks'
import {map} from 'rxjs/operators'
import {mqttQuery} from '../Mqtt'
import {useMqtt} from '../Mqtt/Mqtt.facade'

export interface DcLoadsState {
    power: number | undefined
    voltage: number | undefined
}

export function useDcLoads (): DcLoadsState {
    const portalId = useObservableState(mqttQuery.portalId$)
    const mqttService = useMqtt()

    const topics = {
        voltage: `N/${portalId}/system/0/Dc/Battery/Voltage`,
        power: `N/${portalId}/system/0/Dc/System/Power`,
    }

    useSubscription(mqttQuery.portalId$, () => {
        mqttService.subscribeToTopics(topics)

        return () => mqttService.unsubscribeFromTopics(topics)
    })

    const power = useObservableState(mqttQuery.messagesByTopic$(topics.power).pipe(map(v => -1 * parseInt(v as string))))
    const voltage = useObservableState(mqttQuery.messagesByTopic$(topics.voltage).pipe(map(v => parseInt(v as string))))

    return {power, voltage}
}
