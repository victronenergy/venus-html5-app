import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"
import { AC_SOURCE_TYPE } from "../../utils/constants"

export interface ShorePowerInputState {
  shorePowerInput?: number
}

export interface TopicState {
  acInput1: number
  acInput2: number
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

  let { acInput1, acInput2 } = useTopicsState<TopicState>(topics$)

  let shorePowerInput = undefined
  if (acInput1 === AC_SOURCE_TYPE.SHORE || acInput1 === AC_SOURCE_TYPE.GRID) {
    shorePowerInput = 1
  } else if (acInput2 === AC_SOURCE_TYPE.SHORE || acInput2 === AC_SOURCE_TYPE.GRID) {
    shorePowerInput = 2
  }

  return { shorePowerInput }
}
