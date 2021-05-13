import { useStatusService } from "./Status.service"
import { useObservableState } from "observable-hooks"
import { statusQuery } from "./Status.query"

export const useStatus = () => {
  const statusService = useStatusService()

  const [statuses, _] = useObservableState(statusQuery.status$)

  return { statuses, statusService }
}
