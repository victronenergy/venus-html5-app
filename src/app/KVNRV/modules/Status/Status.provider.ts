import { useObservableState } from "observable-hooks"
import { statusQuery } from "./Status.query"
import { WidgetConfiguration, MessagesObj, STATUS_LEVELS, STATUS_LEVELS_MSG } from "../../utils/constants"
import { useStatusService } from "./Status.service"
import { useEffect, useState } from "react"
import { Footer } from "../../../components/Card/Card"
import { sum } from "../../utils/helpers"
import { appQuery } from "@elninotech/mfd-modules"

export const useStatus = () => {
  const statuses = useObservableState(statusQuery.status$)

  const remote = useObservableState(appQuery.remote$)
  const statusService = useStatusService()

  useEffect(() => {
    statusService.clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remote])

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
    if (conf.THRESHOLDS.length === 3) {
      if (percent > conf.THRESHOLDS[0]) {
        if (percent < conf.THRESHOLDS[0] + conf.THRESHOLDS[1]) {
          currLevel = STATUS_LEVELS.WARNING
        } else {
          currLevel = STATUS_LEVELS.ALARM
        }
        footer.status = currLevel
        footer.message = STATUS_LEVELS_MSG[currLevel]
        statusService.addStatus({
          part,
          message: conf.MESSAGES[currLevel as keyof MessagesObj] ?? "",
          level: currLevel,
        })
        setLevel(currLevel)
      } else {
        currLevel = STATUS_LEVELS.SUCCESS
        statusService.removeStatus(part)
        setLevel(currLevel)
      }
    } else {
      const zeroOffset = conf.ZERO_OFFSET! * -1
      const green =
        percent > zeroOffset + sum(conf.THRESHOLDS.slice(0, 2)) &&
        percent < zeroOffset + sum(conf.THRESHOLDS.slice(0, 4))
      const red = percent < zeroOffset + conf.THRESHOLDS[0] || percent > zeroOffset + sum(conf.THRESHOLDS.slice(0, 5))
      if (!green) {
        if (red) {
          currLevel = STATUS_LEVELS.ALARM
        } else {
          currLevel = STATUS_LEVELS.WARNING
        }
        footer.status = currLevel
        footer.message = STATUS_LEVELS_MSG[currLevel]
        statusService.addStatus({
          part,
          message: conf.MESSAGES[currLevel as keyof MessagesObj] ?? "",
          level: currLevel,
        })
        setLevel(currLevel)
      } else {
        currLevel = STATUS_LEVELS.SUCCESS
        statusService.removeStatus(part)
        setLevel(currLevel)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent, part])

  footer.status = currLevel

  return footer
}
