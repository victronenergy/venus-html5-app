import { mqttQuery, PortalId, Topics } from "../Mqtt"
import { useMqtt, useTopicsWithParameters } from "../Mqtt/Mqtt.provider"
import { vebusQuery, InstanceId } from "../Vebus"
import { useObservableState } from "observable-hooks"
import { of } from "rxjs"

export interface AcModeProvider {
  updateMode: (mode: number) => void
  updateLimit?: (limit: number) => void
}

export interface AcModeTopics extends Topics {
  mode?: string
  limit?: string
}

export function useAcMode(shorePowerInput?: number): AcModeProvider {
  const getWriteTopics = (portalId: PortalId, deviceInstanceId: InstanceId, shorePowerInput?: number) => {
    let res = {
      mode: `W/${portalId}/vebus/${deviceInstanceId}/Mode`,
      limit: undefined,
    } as AcModeTopics

    if (shorePowerInput) {
      res.limit = `W/${portalId}/vebus/${deviceInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`
    }

    return res
  }

  const writeTopics$ = useTopicsWithParameters(
    getWriteTopics,
    mqttQuery.portalId$,
    vebusQuery.instanceId$,
    of(shorePowerInput)
  )
  const writeTopics = useObservableState(writeTopics$)

  const mqtt = useMqtt()
  const updateMode = (mode: number) => mqtt.publish(writeTopics!.mode!, mode.toString())
  const updateLimit = writeTopics?.limit
    ? (limit: number) => mqtt.publish(writeTopics!.limit!, limit.toString())
    : undefined

  return { updateMode, updateLimit }
}
