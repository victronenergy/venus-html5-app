import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalIdAndInstanceId } from "../Mqtt/Mqtt.provider"
import { vebusQuery } from "../Vebus/Vebus.query"
import { InstanceId } from "../Vebus/Vebus.store"
import { useVebus } from "../Vebus/Vebus.provider"

export interface ActiveSourceState {
  activeInput?: number
  phases?: number
  settings?: Array<number>
}

export interface ActiveSourceTopics extends Topics {
  activeInput?: string
  phases?: string
  settings?: Array<string>
}

export function useActiveSource(): ActiveSourceState {
  const getTopics = (portalId: PortalId, instanceId: InstanceId) => ({
    activeInput: `N/${portalId}/vebus/${instanceId}/Ac/ActiveIn/ActiveInput`,
    phases: `N/${portalId}/vebus/${instanceId}/Ac/NumberOfPhases`,
    settings: [
      `N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`,
      `N/${portalId}/settings/0/Settings/SystemSetup/AcInput2`,
    ],
  })
  useVebus()

  const topics$ = useTopicsWithPortalIdAndInstanceId<ActiveSourceTopics>(
    getTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$
  )

  useTopicSubscriptions(topics$)
  let { activeInput, phases, settings } = useTopicsState<ActiveSourceState>(topics$)

  return { activeInput, phases, settings }
}
