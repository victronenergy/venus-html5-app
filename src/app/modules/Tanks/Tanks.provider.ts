import { useObservableState, useSubscription } from "observable-hooks"
import { useEffect } from "react"
import Logger from "../../utils/logger"
import { mqttQuery, PortalId } from "../Mqtt"
import { useTanksService } from "./Tanks.service"
import { useMqtt, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"
import { tanksQuery } from "./Tanks.query"
import { TankInstanceId } from "./Tanks.store"

export const useTanks = () => {
  const portalId = useObservableState(mqttQuery.portalId$)
  const tanksService = useTanksService()
  const mqttService = useMqtt()

  const getTopics = (portalId: PortalId) => ({
    tanks: `N/${portalId}/tank/+/DeviceInstance`,
  })

  const topics$ = useTopicsWithPortalId(getTopics, mqttQuery.portalId$)
  const topics = useObservableState(topics$)

  useEffect(() => {
    mqttService.subscribeToTopic(topics?.tanks)

    return () => mqttService.unsubscribeFromTopic(topics?.tanks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portalId])

  useSubscription(mqttQuery.messagesByWildcard$(topics?.tanks ?? ""), (messages) => {
    if (!messages || Object.entries(messages).length === 0) {
      Logger.log("Waiting for tanks...")
    } else {
      const deviceInstances = Object.values(messages) as TankInstanceId[]
      tanksService.setTanks(deviceInstances)
    }
  })

  const tanks = useObservableState(tanksQuery.tanks$)

  return { tanks }
}
