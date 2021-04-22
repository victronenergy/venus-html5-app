import {useObservableState, useSubscription} from 'observable-hooks'
import {map} from 'rxjs/operators'
import {mqttQuery} from '../Mqtt'
import {useMqtt} from '../Mqtt/Mqtt.provider'
import { vebusQuery } from "../Vebus/Vebus.query"

export interface AcLoadsState {
  phases: number | undefined
  current: number | undefined
  voltage: number | undefined
  power: number | undefined
}

export function useAcLoads (): AcLoadsState {
  const portalId = useObservableState(mqttQuery.portalId$)
  // const instanceId = useObservableState(vebusQuery.instanceId$)
  const mqttService = useMqtt()

  const topics = {
    phases: `N/${portalId}/system/0/Ac/Consumption/NumberOfPhases`,
    // current: [
    //   `N/${portalId}/vebus/${instanceId}/Ac/Out/L1/I`,
    //   `N/${portalId}/vebus/${instanceId}/Ac/Out/L2/I`,
    //   `N/${portalId}/vebus/${instanceId}/Ac/Out/L3/I`
    // ],
    // voltage: [
    //   `N/${portalId}/vebus/${instanceId}/Ac/Out/L1/V`,
    //   `N/${portalId}/vebus/${instanceId}/Ac/Out/L2/V`,
    //   `N/${portalId}/vebus/${instanceId}/Ac/Out/L3/V`
    // ],
    // power: [
    //   `N/${portalId}/vebus/${instanceId}/Ac/Out/L1/P`,
    //   `N/${portalId}/vebus/${instanceId}/Ac/Out/L2/P`,
    //   `N/${portalId}/vebus/${instanceId}/Ac/Out/L3/P`
    // ]
  }

  useSubscription(mqttQuery.portalId$, () => {
    mqttService.subscribeToTopics(topics)

    return () => mqttService.unsubscribeFromTopics(topics)
  })

  const current = 0
  const voltage = 0
  const power = 0
  const phases = useObservableState(mqttQuery.messagesByTopic$(topics.phases).pipe(map(v => -1 * parseInt(v as string))))

  return {current, voltage, power, phases}
}
