import { useObservableState } from "observable-hooks"
import Logger from "../../utils/logger"
import { mqttQuery, PortalId } from "../Mqtt"
import { useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"
import { vebusQuery } from "./Vebus.query"
import { VebusService } from "./Vebus.service"
import { VebusState, vebusStore } from "./Vebus.store"
import { useEffect } from "react"
import { tap } from "rxjs/operators"

export const useVebusService = () => new VebusService(vebusStore)

export const useVebus = (): VebusState => {
  const portalId = useObservableState(mqttQuery.portalId$)
  const instanceId = useObservableState(vebusQuery.instanceId$)
  const vebusService = useVebusService()

  const getTopics = (portalId: PortalId) => ({
    deviceInstances: `N/${portalId}/vebus/+/DeviceInstance`,
  })

  const topics$ = useTopicsWithPortalId(getTopics, mqttQuery.portalId$)
  const topics = useObservableState(topics$)

  useTopicSubscriptions(topics$)

  useEffect(() => {
    const subscription = mqttQuery
      .messagesByWildcard$(topics?.deviceInstances)
      .pipe(
        tap((messages) => {
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
              Logger.log(`New VE.Bus instance ID: ${newInstanceId}`)
              vebusService.setInstanceId(newInstanceId)
            }
          }
        })
      )
      .subscribe()

    return () => subscription.unsubscribe()
  }, [portalId])

  return { instanceId }
}
