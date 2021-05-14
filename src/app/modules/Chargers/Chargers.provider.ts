import { useChargersService } from "./Chargers.service"
import { useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"
import { useObservableState, useSubscription } from "observable-hooks"
import { mqttQuery, PortalId } from "../Mqtt"
import Logger from "../../utils/logger"
import { ChargerInstanceId } from "./Chargers.store"
import { chargersQuery } from "./Chargers.query"

export const useChargers = () => {
  const chargersService = useChargersService()
  const topic = "N/+/charger/+/DeviceInstance" // TODO: Into getTopics

  const getTopics = (portalId: PortalId) => ({
    chargerInstances: `N/${portalId}/charger/+/DeviceInstance`,
  })

  const topics$ = useTopicsWithPortalId(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)

  useSubscription(mqttQuery.messagesByWildcard$(topic), (messages) => {
    if (!messages || Object.entries(messages).length === 0) {
      Logger.log("Waiting for chargers...")
    } else {
      const deviceInstances = Object.values(messages) as ChargerInstanceId[]
      chargersService.setChargers(deviceInstances)
    }
  })

  const chargers = useObservableState(chargersQuery.chargers$)

  return { chargers }
}
