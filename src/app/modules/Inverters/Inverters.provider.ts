import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"
import { useObservableState, useSubscription } from "observable-hooks"
import Logger from "../../utils/logger"
import { useInvertersService } from "./Inverters.service"
import { InverterInstanceId } from "./Inverters.store"
import { invertersQuery } from "./Inverters.query"

export interface InvertersState {
  inverters: Array<number>
}

export interface InvertersTopics extends Topics {
  inverters?: string
}

export function useInverters(): InvertersState {
  const invertersService = useInvertersService()

  const getTopics = (portalId: PortalId) => {
    return {
      inverters: `N/${portalId}/inverter/+/DeviceInstance`,
    }
  }

  const topics$ = useTopicsWithPortalId<InvertersTopics>(getTopics, mqttQuery.portalId$)
  const topics = useObservableState(topics$)

  useTopicSubscriptions(topics$)

  useSubscription(mqttQuery.messagesByWildcard$(topics?.inverters ?? ""), (messages) => {
    if (!messages || Object.entries(messages).length === 0) {
      Logger.log("Waiting for inverters...")
    } else {
      const deviceInstances = Object.values(messages) as InverterInstanceId[]
      if (!inverters || !deviceInstances.every((di) => inverters.includes(di))) {
        invertersService.setInverters(deviceInstances)
      }
    }
  })

  const inverters = useObservableState(invertersQuery.inverters$)

  return { inverters }
}
