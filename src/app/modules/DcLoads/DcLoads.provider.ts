import {mqttQuery, PortalId, Topics} from '../Mqtt'
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"

export interface DcLoadsState {
    power?: number
    voltage?: number
}

export interface DcLoadsTopics extends Topics {
    power?: string
    voltage?: string
}

export function useDcLoads (): DcLoadsState {
    const getTopics = (portalId: PortalId) => ({
        voltage: `N/${portalId}/system/0/Dc/Battery/Voltage`,
        power: `N/${portalId}/system/0/Dc/System/Power`,
    })

    const topics$ = useTopicsWithPortalId<DcLoadsTopics>(getTopics, mqttQuery.portalId$)

    useTopicSubscriptions(topics$)
    let { power, voltage } = useTopicsState<DcLoadsState>(topics$)

    // const power = -1 * parseInt(useTopicState(topics.power) as string)
    // const voltage = parseInt(useTopicState(topics.voltage) as string)

    return {power, voltage}
}
