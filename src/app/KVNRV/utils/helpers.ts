import { Conf, MessagesObj, STATUS_LEVELS, STATUS_LEVELS_MSG } from "./constants"
import { Footer } from "../../components/Card/Card"
import { useStatusService } from "../../modules/Status/Status.service"
import { useEffect, useState } from "react"

// TODO: Move to a different file
export const useSendUpdate = (percent: number, conf: Conf, part: string) => {
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
        statusService.addStatus({ part, message: conf.MESSAGES[level as keyof MessagesObj] ?? "", level: level })
        footer.status = level
        footer.message = STATUS_LEVELS_MSG[level]
      } else {
        setLevel(STATUS_LEVELS.ALARM)
        statusService.addStatus({ part, message: conf.MESSAGES[level as keyof MessagesObj], level: level })
        footer.status = level
        footer.message = STATUS_LEVELS_MSG[level]
      }
    } else {
      statusService.removeStatus(part)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent])

  return footer
}

export const normalizePower = (power: number, max: number) => {
  return Math.max(Math.min(power / max, 1), 0)
}
