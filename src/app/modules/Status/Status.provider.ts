import { useObservableState } from "observable-hooks"
import { statusQuery } from "./Status.query"

export const useStatus = () => {
  const statuses = useObservableState(statusQuery.status$)

  return { statuses }
}
