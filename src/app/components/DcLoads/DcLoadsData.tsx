import {useObservableState} from 'observable-hooks'
import React, {ReactNode, useEffect} from 'react'
import {appQuery} from '../../modules/App/App.query'
import {dcLoadsService, DcLoadsState, getTopics} from '../../modules/DcLoads'
import {mqttQuery} from '../../modules/Mqtt/Mqtt.query'
import MqttSubscriptions from '../../mqtt/MqttSubscriptions'
import HidingContainer from '../HidingContainer'

export const DcLoadsData = ({children}: { children: ReactNode }) => {
    const portalId = useObservableState(appQuery.portalId$)
    const metricsRef = useObservableState(appQuery.metricsRef$)
    const messages = useObservableState(mqttQuery.messages$)

    useEffect(() => {
        const topics = getTopics(portalId)
        if (messages) {
            // TODO: This is the getMessagesByTopics function from MqttClientProvider, it should be moved to a separate library
            const result = Object.entries(topics).reduce((res: {[topic: string]: string | string[]}, [key, topics]) => {
                res[key] = Array.isArray(topics)
                    ? topics.map(t => (messages[t] || {}).value)
                    : (messages[topics] || {}).value
                return res
            }, {})
            dcLoadsService.updateAll(result)
        }
    }, [messages, portalId])

    return (
        <MqttSubscriptions topics={getTopics(portalId)}>
            {(topics: Partial<DcLoadsState>) => {
                if (topics && !topics.power) {
                    // dcLoadsService.reset()
                    return null
                }
                // dcLoadsService.updateAll(topics)
                return (
                    <HidingContainer metricsRef={metricsRef}>
                        {children}
                    </HidingContainer>
                )
            }}
        </MqttSubscriptions>
    )
}

export default DcLoadsData
