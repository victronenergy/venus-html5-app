import {useObservableState, useSubscription} from 'observable-hooks'
import {map} from 'rxjs/operators'
import {mqttQuery} from '../Mqtt'
import {useMqtt} from '../Mqtt/Mqtt.facade'
import {getTopics} from './DcLoads.constants'
import {DcLoadsState} from './DcLoads.state'

export function useDcLoads (): DcLoadsState {
    const portalId = useObservableState(mqttQuery.portalId$)
    const mqttService = useMqtt()

    useSubscription(mqttQuery.portalId$, id => {
        const topics = getTopics(id)
        mqttService.subscribeToTopics(getTopics(id))

        return () => mqttService.unsubscribeFromTopics(topics)
    })

    const power = useObservableState(mqttQuery.messagesByTopic$(getTopics(portalId).power).pipe(map(v => parseInt(v as string))))
    const voltage = useObservableState(mqttQuery.messagesByTopic$(getTopics(portalId).voltage).pipe(map(v => parseInt(v as string))))

    return {power, voltage}
}
