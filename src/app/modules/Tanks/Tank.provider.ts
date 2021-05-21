import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithParameters } from "../Mqtt/Mqtt.provider"
import { TankInstanceId } from "./Tanks.store"
import { of } from "rxjs"

export interface TankState {
  capacity: number
  level: number
  remaining: number
  customName: string
  productName: string
}

export interface TankTopics extends Topics {
  capacity?: string
  level?: string
  remaining?: string
  customName?: string
  productName?: string
}

export function useTank(tankId: TankInstanceId): TankState {
  const getTopics = (portalId: PortalId, tankId: TankInstanceId) => ({
    capacity: `N/${portalId}/tank/${tankId}/Capacity`,
    level: `N/${portalId}/tank/${tankId}/Level`,
    remaining: `N/${portalId}/tank/${tankId}/Remaining`,
    customName: `N/${portalId}/tank/${tankId}/CustomName`,
    productName: `N/${portalId}/tank/${tankId}/ProductName`,
  })

  // Capacity = capacity of tank in kLiters (multiply by 1000)
  // Level = percentage of tank
  // Remaining = remaining in kLiters (multiply by 1000)
  // CustomName for title
  // change name to tanks

  const topics$ = useTopicsWithParameters<TankTopics>(getTopics, mqttQuery.portalId$, of(tankId))

  useTopicSubscriptions(topics$)

  return useTopicsState<TankState>(topics$)
}
