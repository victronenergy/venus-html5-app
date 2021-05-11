import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"

export interface ShorePowerInputState {
  acInput1?: string
  acInput2?: string
}

export interface ShorePowerInputTopics extends Topics {
  acInput1?: string
  acInput2?: string
}

export function useShorePowerInput(): ShorePowerInputState {
  const getTopics = (portalId: PortalId) => {
    return {
      acInput1: `N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`,
      acInput2: `N/${portalId}/settings/0/Settings/SystemSetup/AcInput2`,
    }
  }

  const topics$ = useTopicsWithPortalId<ShorePowerInputTopics>(getTopics, mqttQuery.portalId$)

  useTopicSubscriptions(topics$)

  return { ...useTopicsState<ShorePowerInputState>(topics$) }
}
