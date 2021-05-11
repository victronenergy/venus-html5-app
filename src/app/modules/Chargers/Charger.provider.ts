import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useMqtt, useTopicsState, useTopicSubscriptions, useTopicsWithParameters } from "../Mqtt/Mqtt.provider"
import { useObservableState } from "observable-hooks"
import { ChargerInstanceId } from "./Chargers.store"
import { of } from "rxjs"

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
  customName: string
  productName: string
  currentLimit: number
  state: number
  mode: number
  nrOfOutputs: number
  current: [number?, number?, number?]
}

export interface ChargerProvider extends ChargerState {
  updateMode: (mode: number) => void
  updateCurrentLimit: (limit: number) => void
}

export const useCharger = (chargerId: ChargerInstanceId) => {
  const getTopics = (portalId: PortalId, chargerInstanceId: ChargerInstanceId) => ({
    customName: `N/${portalId}/charger/${chargerInstanceId}/CustomName`,
    productName: `N/${portalId}/charger/${chargerInstanceId}/ProductName`,
    currentLimit: `N/${portalId}/charger/${chargerInstanceId}/Ac/In/CurrentLimit`,
    state: `N/${portalId}/charger/${chargerInstanceId}/State`,
    mode: `N/${portalId}/charger/${chargerInstanceId}/Mode`,
    nrOfOutputs: `N/${portalId}/charger/${chargerInstanceId}/NrOfOutputs`,
    current: [
      `N/${portalId}/charger/${chargerInstanceId}/Dc/0/Current`,
      `N/${portalId}/charger/${chargerInstanceId}/Dc/1/Current`,
      `N/${portalId}/charger/${chargerInstanceId}/Dc/2/Current`,
    ],
  })

  const topics$ = useTopicsWithParameters<ChargerTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)

  const getWriteTopics = (portalId: PortalId, chargerInstanceId: ChargerInstanceId) => ({
    mode: `W/${portalId}/charger/${chargerInstanceId}/Mode`,
    currentLimit: `W/${portalId}/charger/${chargerInstanceId}/Ac/In/CurrentLimit`,
  })

  const writeTopics$ = useTopicsWithParameters(getWriteTopics, mqttQuery.portalId$, of(chargerId))
  const writeTopics = useObservableState(writeTopics$)

  const mqtt = useMqtt()
  const updateMode = (mode: number) => mqtt.publish(writeTopics!.mode, mode.toString())
  const updateCurrentLimit = (currentLimit: number | string) =>
    mqtt.publish(writeTopics!.currentLimit, currentLimit.toString())

  return {
    ...useTopicsState<ChargerState>(topics$),
    updateMode,
    updateCurrentLimit,
  } as ChargerProvider
}
