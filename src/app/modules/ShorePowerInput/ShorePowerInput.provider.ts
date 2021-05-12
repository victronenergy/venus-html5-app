import {useObservableState, useSubscription} from 'observable-hooks'
import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useTopicsState, useTopicSubscriptions, useTopicsWithPortalId } from "../Mqtt/Mqtt.provider"
import { AC_SOURCE_TYPE } from "../../utils/constants"
import {shorePowerInputQuery} from './ShorePowerInput.query'
import {useShorePowerInputService} from './ShorePowerInput.service'
import {ShorePowerInputState, shorePowerInputStore} from './ShorePowerInput.store'

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
  const topics = useObservableState(topics$)
  const shorePowerInputService = useShorePowerInputService()

  useSubscription(mqttQuery.messagesByTopics$(topics!), ({acInput1, acInput2}) => {
    let inputId = 0

    if (acInput1 === AC_SOURCE_TYPE.SHORE.toString() || acInput1 === AC_SOURCE_TYPE.GRID.toString()) {
      inputId = 1
    } else if (acInput2 === AC_SOURCE_TYPE.SHORE.toString() || acInput2 === AC_SOURCE_TYPE.GRID.toString()) {
      inputId = 2
    }

    shorePowerInputService.setInputId(inputId)
  })

  const inputId = useObservableState(shorePowerInputQuery.inputId$)

  return { inputId }
}
