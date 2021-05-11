import { useChargersService } from "./Chargers.service"
import { useMqtt } from "../Mqtt/Mqtt.provider"
import { useEffect } from "react"
import { useObservableState, useSubscription } from "observable-hooks"
import { mqttQuery } from "../Mqtt"
import Logger from "../../utils/logger"
import { ChargerInstanceId } from "./Chargers.store"
import { chargersQuery } from "./Chargers.query"

export const useChargers = () => {
  const portalId = useObservableState(mqttQuery.portalId$)
  const chargersService = useChargersService()
  const mqttService = useMqtt()
  const topic = "N/+/charger/+/DeviceInstance"

  useEffect(() => {
    mqttService.subscribeToTopic(topic)

    return () => mqttService.unsubscribeFromTopic(topic)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portalId])

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
