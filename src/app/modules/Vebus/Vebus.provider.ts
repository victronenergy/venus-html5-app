import { useObservableState } from "observable-hooks"
import { useSubscription } from "observable-hooks/dist/esm2015"
import { useEffect } from "react"
import Logger from "../../utils/logger"
import { mqttQuery, PortalId } from "../Mqtt"
import { useMqtt, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"
import { vebusQuery } from "./Vebus.query"
import { VebusService } from "./Vebus.service"
import { VebusState, vebusStore } from "./Vebus.store"

export const useVebusService = () => new VebusService(vebusStore)

export const useVebus = (): VebusState => {
  const portalId = useObservableState(mqttQuery.portalId$)
  const instanceId = useObservableState(vebusQuery.instanceId$)
  const vebusService = useVebusService()
  const mqttService = useMqtt()

  const getTopics = (portalId: PortalId) => ({
    deviceInstances: `N/${portalId}/vebus/+/DeviceInstance`,
  })

  const topics$ = useTopicsWithPortalId(getTopics, mqttQuery.portalId$)
  const topics = useObservableState(topics$)

  useEffect(() => {
    mqttService.subscribeToTopic(topics?.deviceInstances)

    return () => mqttService.unsubscribeFromTopic(topics?.deviceInstances)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portalId])

  useSubscription(mqttQuery.messagesByWildcard$(topics?.deviceInstances ?? ""), (messages) => {
    if (!messages || Object.entries(messages).length === 0) {
      Logger.log("Waiting for VE.Bus device instance...")
    } else {
      const deviceInstances = Object.values(messages)
      const subs = deviceInstances.reduce((acc: { [key: string]: string }, id) => {
        acc[id as string] = `N/${portalId}/vebus/${id}/Ac/NumberOfAcInputs`
        return acc
      }, {})

      // Sometimes "ghost" instances of devices linger in MQTT, so we need to select the highest (ie. latest) instance ID
      const instances = Object.entries(subs)
        .filter(([_, nAcInputs]) => {
          // Take only "Multi" devices -> must have more than one AcInput
          return nAcInputs && parseInt(nAcInputs) !== 0
        })
        .map((instance) => parseInt(instance[0]))
        .sort((a, b) => b - a)

      if (!instances || instances.length === 0) return

      const newInstanceId = instances[0]

      if (newInstanceId && newInstanceId !== instanceId) {
        vebusService.setInstanceId(newInstanceId)
      }
    }
  })

  return { instanceId }
}
