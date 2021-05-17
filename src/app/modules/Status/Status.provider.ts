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
  const footer: Footer = {
    message: STATUS_LEVELS_MSG[level],
    property: "Status",
    status: level,
  }

  useEffect(() => {
    if (percent > conf.THRESHOLDS[0]) {
      if (percent < conf.THRESHOLDS[0] + conf.THRESHOLDS[1]) {
        setLevel(STATUS_LEVELS.WARNING)
        footer.status = level
        footer.message = STATUS_LEVELS_MSG[level]
      } else {
        setLevel(STATUS_LEVELS.ALARM)
        footer.status = level
        footer.message = STATUS_LEVELS_MSG[level]
      }
    } else {
      statusService.removeStatus(part)
      setLevel(STATUS_LEVELS.SUCCESS)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent])

  if (level !== STATUS_LEVELS.SUCCESS) {
    statusService.addStatus({ part, message: conf.MESSAGES[level as keyof MessagesObj] ?? "", level: level })
  }

  return footer
}
