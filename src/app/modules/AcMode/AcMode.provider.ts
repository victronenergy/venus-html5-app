import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useMqtt, useTopicsState, useTopicSubscriptions, useTopicsWithParameters } from "../Mqtt/Mqtt.provider"
import { shorePowerInputQuery, useShorePowerInput } from "../ShorePowerInput"
import { vebusQuery, InstanceId, useVebus } from "../Vebus"
import { useObservableState } from "observable-hooks"
import { HeaderTopics } from "../Header"

export interface AcModeState {
  productId: number
  mode: string
  limit?: string
}

export interface AcModeProvider extends AcModeState {
  updateMode: (mode: number) => void
  updateLimit?: (limit: number) => void
}

export interface AcModeTopics extends Topics {
  productId?: string
  mode?: string
  limit?: string
  updateMode?: string
  updateLimit?: string
}

export function useAcMode(): AcModeProvider {
  const getTopics = (portalId: PortalId, deviceInstanceId: InstanceId, shorePowerInput: number) => {
    let res = {
      mode: `N/${portalId}/vebus/${deviceInstanceId}/Mode`,
      productId: `N/${portalId}/vebus/${deviceInstanceId}/ProductId`,
      limit: undefined,
    } as AcModeTopics

    if (shorePowerInput > 0) {
      res.limit = `N/${portalId}/vebus/${deviceInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`
    }

    return res
  }
  useVebus()

  const topics$ = useTopicsWithParameters<HeaderTopics>(
    getTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$,
    shorePowerInputQuery.inputId$
  )

  useTopicSubscriptions(topics$)

  const getWriteTopics = (portalId: PortalId, deviceInstanceId: InstanceId, shorePowerInput: number) => {
    let res = {
      updateMode: `W/${portalId}/vebus/${deviceInstanceId}/Mode`,
      updateLimit: undefined,
    } as AcModeTopics

    if (shorePowerInput > 0) {
      res.updateLimit = `W/${portalId}/vebus/${deviceInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`
    }

    return res
  }

  useShorePowerInput()
  const writeTopics$ = useTopicsWithParameters(
    getWriteTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$,
    shorePowerInputQuery.inputId$
  )
  const writeTopics = useObservableState(writeTopics$)

  const mqtt = useMqtt()
  const updateMode = (mode: number) => mqtt.publish(writeTopics!.updateMode!, mode)
  const updateLimit = writeTopics?.updateLimit
    ? (limit: number) => mqtt.publish(writeTopics!.updateLimit!, limit)
    : undefined

  return { ...useTopicsState<AcModeState>(topics$), updateMode, updateLimit }
}
