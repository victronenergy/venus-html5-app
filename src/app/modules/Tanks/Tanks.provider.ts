import { useObservableState, useSubscription } from "observable-hooks"
import { useEffect } from "react"
import Logger from "../../utils/logger"
import { mqttQuery } from "../Mqtt"
import { useTanksService } from "./Tanks.service"
import { useMqtt } from "../Mqtt/Mqtt.provider"
import { tanksQuery } from "./Tanks.query"
import { TankInstanceId } from "./Tanks.store"

export const useTanks = () => {
  const portalId = useObservableState(mqttQuery.portalId$)
  const tanksService = useTanksService()
  const mqttService = useMqtt()
  const topic = "N/dca632c080c9/tank/+/DeviceInstance"

  useEffect(() => {
    mqttService.subscribeToTopic(topic)

    return () => mqttService.unsubscribeFromTopic(topic)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portalId])

  useSubscription(mqttQuery.messagesByWildcard$(topic), (messages) => {
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
