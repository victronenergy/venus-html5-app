import { useObservableState } from "observable-hooks"
import { statusQuery } from "./Status.query"
import { WidgetConfiguration, MessagesObj, STATUS_LEVELS, STATUS_LEVELS_MSG } from "../../KVNRV/utils/constants"
import { useStatusService } from "./Status.service"
import { useEffect, useState } from "react"
import { Footer } from "../../components/Card/Card"

export const useStatus = () => {
  const statuses = useObservableState(statusQuery.status$)

  return { statuses }
}

export const useSendUpdate = (percent: number, conf: WidgetConfiguration, part: string) => {
  const statusService = useStatusService()
  const [level, setLevel] = useState(STATUS_LEVELS.SUCCESS)
  let currLevel = level
  const footer: Footer = {
    message: STATUS_LEVELS_MSG[level],
    property: "Status",
    status: currLevel,
  }

  useEffect(() => {
    if (percent > conf.THRESHOLDS[0]) {
      if (percent < conf.THRESHOLDS[0] + conf.THRESHOLDS[1]) {
        currLevel = STATUS_LEVELS.WARNING
        footer.status = currLevel
        footer.message = STATUS_LEVELS_MSG[level]
      } else {
        currLevel = STATUS_LEVELS.ALARM
        footer.status = currLevel
        footer.message = STATUS_LEVELS_MSG[level]
      }
      setLevel(currLevel)
      statusService.addStatus({ part, message: conf.MESSAGES[currLevel as keyof MessagesObj] ?? "", level: currLevel })
    } else {
      currLevel = STATUS_LEVELS.SUCCESS
      setLevel(currLevel)
      statusService.removeStatus(part)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent, part])

  footer.status = currLevel

  return footer
}
