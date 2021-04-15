import {useObservableState} from 'observable-hooks'
import React, {ReactNode} from 'react'
import {appQuery} from '../../modules/App/App.query'
import {dcLoadsService, getTopics} from '../../modules/DcLoads'
import MqttSubscriptions from '../../mqtt/MqttSubscriptions'
import HidingContainer from '../HidingContainer'

export const DcLoadsData = ({children}: { children: ReactNode }) => {
    // @ts-ignore
    const [portalId] = useObservableState(() => appQuery.portalId$)
    const [metricsRef] = useObservableState(() => appQuery.metricsRef$)

    return (
        <MqttSubscriptions topics={getTopics(portalId)}>
            {(topics: { voltage: number; power: number }) => {
                if (topics && !topics.power) return null
                dcLoadsService.updatePower(topics.power)
                dcLoadsService.updateVoltage(topics.voltage)
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
