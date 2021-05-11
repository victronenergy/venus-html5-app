import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { InstanceId, vebusQuery } from "../Vebus"
import {
  useMqtt,
  useTopicsState,
  useTopicSubscriptions,
  useTopicsWithPortalIdAndInstanceId,
} from "../Mqtt/Mqtt.provider"
import { useObservableState } from "observable-hooks"

export interface ChargerTopics extends Topics {
  customName?: string
  productName?: string
  currentLimit?: string
  state?: string
  mode?: string
  nrOfOutputs?: string
  current?: string[]
}

export interface ChargerState {
  customName?: string
  productName: string
  currentLimit?: number
  state?: string
  mode?: string
  nrOfOutputs?: number
  current?: [number?, number?, number?]
}

export interface ChargerProvider extends ChargerState {
  updateMode: () => void
  updateCurrentLimit: () => void
}

export const useCharger = () => {
  const getTopics = (portalId: PortalId, deviceInstanceId: InstanceId) => ({
    customName: `N/${portalId}/charger/${deviceInstanceId}/CustomName`,
    productName: `N/${portalId}/charger/${deviceInstanceId}/ProductName`,
    currentLimit: `N/${portalId}/charger/${deviceInstanceId}/Ac/In/CurrentLimit`,
    state: `N/${portalId}/charger/${deviceInstanceId}/State`,
    mode: `N/${portalId}/charger/${deviceInstanceId}/Mode`,
    nrOfOutputs: `N/${portalId}/charger/${deviceInstanceId}/NrOfOutputs`,
    current: [
      `N/${portalId}/charger/${deviceInstanceId}/Dc/0/Current`,
      `N/${portalId}/charger/${deviceInstanceId}/Dc/1/Current`,
      `N/${portalId}/charger/${deviceInstanceId}/Dc/2/Current`,
    ],
  })

  const topics$ = useTopicsWithPortalIdAndInstanceId<ChargerTopics>(
    getTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$
  )

  useTopicSubscriptions(topics$)

  const getWriteTopics = (portalId: PortalId, deviceInstanceId: InstanceId) => ({
    mode: `W/${portalId}/charger/${deviceInstanceId}/Mode`,
    currentLimit: `W/${portalId}/charger/${deviceInstanceId}/Ac/In/CurrentLimit`,
  })

  const writeTopics$ = useTopicsWithPortalIdAndInstanceId(getWriteTopics, mqttQuery.portalId$, vebusQuery.instanceId$)
  const writeTopics = useObservableState(writeTopics$)

  const mqtt = useMqtt()
  const updateMode = (mode: string) => mqtt.publish(writeTopics!.mode, mode)
  const updateCurrentLimit = (currentLimit: number | string) =>
    mqtt.publish(writeTopics!.currentLimit, currentLimit.toString())

  return {
    ...useTopicsState<ChargerState>(topics$),
    updateMode,
    updateCurrentLimit,
  } as ChargerProvider
}
