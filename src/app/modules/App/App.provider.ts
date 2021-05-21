import { AppState } from "./App.store"
import { useObservableState } from "observable-hooks"
import { appQuery } from "./App.query"

export const useApp = (): AppState | undefined => {
  return useObservableState(appQuery.all$)
}
