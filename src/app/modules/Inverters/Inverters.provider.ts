import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalIdAndInstanceId } from "../Mqtt/Mqtt.provider"
import { vebusQuery } from "../Vebus"

export interface InvertersState {
  systemInverters?: any[]
  vebusInverters?: any[]
}

export interface InvertersTopics extends Topics {
  systemInverters?: string
  vebusInverters?: string
}

export function useInverters(): InvertersState {
  const getTopics = (portalId: PortalId) => {
    return {
      systemInverters: `N/${portalId}/inverter/+/DeviceInstance`,
      vebusInverters: `N/${portalId}/vebus/+/DeviceInstance`,
    }
  }

  const topics$ = useTopicsWithPortalIdAndInstanceId<InvertersTopics>(
    getTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$
  )

  useTopicSubscriptions(topics$)

  return { ...useTopicsState<InvertersState>(topics$) }
}
