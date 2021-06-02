import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithParameters } from "../Mqtt/Mqtt.provider"
import { TankInstanceId } from "./Tanks.store"
import { of } from "rxjs"

export interface TankState {
  capacity: number
  level: number
  remaining: number
  fluidType: string
  unit: string
}

export interface TankTopics extends Topics {
  capacity?: string
  level?: string
  remaining?: string
  fluidType?: string
  unit?: string
}

export function useTank(tankId: TankInstanceId): TankState {
  const getTopics = (portalId: PortalId, tankId: TankInstanceId) => ({
    capacity: `N/${portalId}/tank/${tankId}/Capacity`,
    level: `N/${portalId}/tank/${tankId}/Level`,
    remaining: `N/${portalId}/tank/${tankId}/Remaining`,
    fluidType: `N/${portalId}/tank/${tankId}/FluidType`,
    unit: `N/${portalId}/settings/0/Settings/System/VolumeUnit`,
  })

  const topics$ = useTopicsWithParameters<TankTopics>(getTopics, mqttQuery.portalId$, of(tankId))

  useTopicSubscriptions(topics$)

  return useTopicsState<TankState>(topics$)
}
