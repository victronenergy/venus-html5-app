import { mqttQuery, PortalId } from "../Mqtt"
import { useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"
import { useObservableState, useSubscription } from "observable-hooks"
import Logger from "../../utils/logger"
import { useBatteriesService } from "./Batteries.service"
import { BatteryId } from "./Batteries.store"
import { batteriesQuery } from "./Batteries.query"

export const useBatteries = () => {
  const batteriesService = useBatteriesService()

  const getTopics = (portalId: PortalId) => ({
    batteryInstances: `N/${portalId}/battery/+/DeviceInstance`,
  })

  const topics$ = useTopicsWithPortalId(getTopics, mqttQuery.portalId$)
  const topics = useObservableState(topics$)

  useTopicSubscriptions(topics$)

  useSubscription(mqttQuery.messagesByWildcard$(topics?.batteryInstances ?? ""), (messages) => {
    if (!messages || Object.entries(messages).length === 0) {
      Logger.log("Waiting for batteries...")
    } else {
      // console.error(messages)
      const deviceInstances = Object.values(messages) as BatteryId[]
      if (!batteries || !deviceInstances.every((di) => batteries.includes(di))) {
        batteriesService.setBatteries(deviceInstances)
      }
    }
  })

  const batteries = useObservableState(batteriesQuery.batteries$)

  return { batteries }
}
