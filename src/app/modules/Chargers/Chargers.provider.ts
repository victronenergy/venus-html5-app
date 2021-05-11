import { mqttQuery, PortalId, Topics } from "../Mqtt"
import {
  useTopicsState,
  useTopicSubscriptions,
  useTopicsWithPortalId,
  useTopicsWithPortalIdAndInstanceId,
} from "../Mqtt/Mqtt.provider"

export interface ChargersState {
  chargers?: Array<number>
}

export interface ChargersTopics extends Topics {
  chargers?: string
}

export function useChargers(): ChargersState {
  const getTopics = (portalId: PortalId) => ({
    chargers: `N/${portalId}/charger/+/DeviceInstance`,
  })

  const topics$ = useTopicsWithPortalId<ChargersTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)
  let { chargers } = useTopicsState<ChargersState>(topics$)

  return { chargers }
}
