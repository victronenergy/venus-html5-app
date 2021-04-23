import {useObservableState} from 'observable-hooks'
import {useSubscription} from 'observable-hooks/dist/esm2015'
import {useEffect} from 'react'
import Logger from '../../utils/logger'
import {mqttQuery} from '../Mqtt'
import {useMqtt} from '../Mqtt/Mqtt.provider'
import {vebusQuery} from './Vebus.query'
import {VebusService} from './Vebus.service'
import {VebusState, vebusStore} from './Vebus.store'

export const useVebusService = () => new VebusService(vebusStore)

export const useVebus = (): VebusState => {
    const portalId = useObservableState(mqttQuery.portalId$)
    const instanceId = useObservableState(vebusQuery.instanceId$)
    const vebusService = useVebusService()
    const mqttService = useMqtt()
    const topic = 'N/+/vebus/+/DeviceInstance'

    useEffect(() => {
        mqttService.subscribeToTopic(topic)

        return () => mqttService.unsubscribeFromTopic(topic)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portalId])

    useSubscription(mqttQuery.messagesByWildcard$(topic), messages => {
        if (!messages || Object.entries(messages).length === 0) {
            Logger.log('Waiting for VE.Bus device instance...')
        } else {
            const deviceInstances = Object.values(messages)
            const subs = deviceInstances.reduce((acc: { [key: string]: string }, id) => {
                acc[id as string] = `N/${portalId}/vebus/${id}/Ac/NumberOfAcInputs`
                return acc
            }, {})

            const [multiInstance] = Object.entries(subs).filter(([_, nAcInputs]) => {
                // Take only "Multi" devices -> must have more than one AcInput
                return nAcInputs && parseInt(nAcInputs) !== 0
            })

            vebusService.setInstanceId(multiInstance ? parseInt(multiInstance[0]) : null)
        }
    })

    return {instanceId}
}
