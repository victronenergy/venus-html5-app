import {mqttQuery, PortalId, Topics} from '../Mqtt'
import {
    useTopicsState,
    useTopicSubscriptions,
    useTopicsWithPortalId,
} from "../Mqtt/Mqtt.provider"

export interface Battery {
    current?: number
    voltage?: number
    soc?: number
    power?: number
    temperature?: number
    timeToGo?: number
    instance?: number
    state?: number
    id?: string
    name?: string
}

export interface BatteryState {
    batteries?: Array<Battery>
}

export interface BatteryTopics extends Topics {
    batteries?: string
}

export function useBattery (): BatteryState {
    const getTopics = (portalId: PortalId) => ({
        batteries: `N/${portalId}/system/0/Batteries`,
    })

    const topics$ = useTopicsWithPortalId<BatteryTopics>(getTopics, mqttQuery.portalId$)

    useTopicSubscriptions(topics$)
    let { batteries } = useTopicsState<BatteryState>(topics$)

    if (batteries) {
        batteries = batteries.sort((a, b) => (a.state ? -1 : b.state ? 1 : 0))
    }

    return {batteries}
}
