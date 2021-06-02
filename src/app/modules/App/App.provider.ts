import { useEffect } from "react"
import { of } from "rxjs"
import { useTopicState, useTopicSubscriptions } from "../Mqtt/Mqtt.provider"
import { useAppService } from "./App.service"
import { AppState } from "./App.store"
import { useObservableState } from "observable-hooks"
import { appQuery } from "./App.query"

export const LOCK_STATE_TOPIC = "Settings/VenusApp/LockState"

export const useApp = (): AppState | undefined => {
  const appState = useObservableState(appQuery.all$)
  const appService = useAppService()
  const topics = {
    locked: LOCK_STATE_TOPIC,
  }

  useTopicSubscriptions(of(topics))
  const locked = useTopicState<number>(topics.locked)

  useEffect(() => {
    if (locked !== undefined) {
      appService.setLockedWithoutPersistence(!!locked)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked])

  return appState
}
