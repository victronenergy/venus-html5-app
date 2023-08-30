import { MessagesObj, STATUS_LEVELS, STATUS_LEVELS_MSG, WidgetConfiguration } from "../../utils/constants"
import { useEffect, useState } from "react"
import { Footer } from "../../../components/Card/Card"
import { sum } from "../../utils/helpers"
import { useApp } from "@victronenergy/mfd-modules"
import { useStatusStore } from "./Status.store"

export const useStatus = () => {
  const { status: statuses } = useStatusStore()

  const { remote } = useApp()
  const statusStore = useStatusStore()

  useEffect(() => {
    statusStore.clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remote])

  return { statuses }
}

export const useSendUpdate = (percent: number, conf: WidgetConfiguration, part: string) => {
  const statusStore = useStatusStore()
  const [level, setLevel] = useState(STATUS_LEVELS.SUCCESS)

  const footer: Footer = {
    message: STATUS_LEVELS_MSG[level],
    property: "Status",
    status: level,
  }

  useEffect(() => {
    let currLevel: string
    if (conf.THRESHOLDS.length === 3) {
      if (percent > conf.THRESHOLDS[0]) {
        if (percent < conf.THRESHOLDS[0] + conf.THRESHOLDS[1]) {
          currLevel = STATUS_LEVELS.WARNING
        } else {
          currLevel = STATUS_LEVELS.ALARM
        }
        footer.status = currLevel
        footer.message = STATUS_LEVELS_MSG[currLevel]
        statusStore.addStatus({
          part,
          message: conf.MESSAGES[currLevel as keyof MessagesObj] ?? "",
          level: currLevel,
        })
        setLevel(currLevel)
      } else {
        currLevel = STATUS_LEVELS.SUCCESS
        statusStore.removeStatus(part)
        setLevel(currLevel)
      }
    } else {
      const zeroOffset = conf.ZERO_OFFSET! * -1
      const green =
        percent > zeroOffset + sum(conf.THRESHOLDS.slice(0, 2)) &&
        percent < zeroOffset + sum(conf.THRESHOLDS.slice(0, 3))
      const red = percent < zeroOffset + conf.THRESHOLDS[0] || percent > zeroOffset + sum(conf.THRESHOLDS.slice(0, 4))
      if (!green) {
        if (red) {
          currLevel = STATUS_LEVELS.ALARM
        } else {
          currLevel = STATUS_LEVELS.WARNING
        }
        footer.status = currLevel
        footer.message = STATUS_LEVELS_MSG[currLevel]
        statusStore.addStatus({
          part,
          message: conf.MESSAGES[currLevel as keyof MessagesObj] ?? "",
          level: currLevel,
        })
        setLevel(currLevel)
      } else {
        currLevel = STATUS_LEVELS.SUCCESS
        statusStore.removeStatus(part)
        setLevel(currLevel)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent, part])

  return footer
}
