import React from "react"

import { Card } from "../../../components/Card"
import { Footer } from "../../../components/Card/Card"
import IconWarning from "../../images/IconWarning.svg"
import "./Status.scss"
import { STATUS_LEVELS, STATUS_LEVELS_MSG } from "../../utils/constants"
import {
  BatteryAlarmsState,
  StatusUpdate,
  useBatteryAlarms,
  useStatus,
  useSystemState,
  useVebusAlarms,
  VebusAlarmsState,
} from "../../../modules"

const SYSTEM_STATE_MAP = {
  0: "Off",
  1: "Low power",
  2: "VE.Bus Fault condition",
  3: "Bulk charging",
  4: "Absorption charging",
  5: "Float charging",
  6: "Storage mode",
  7: "Equalisation charging",
  8: "Passthru",
  9: "Inverting",
  10: "Assisting",
  256: "Discharging",
  257: "Sustain",
}

const keyToString = (key: string) => {
  return key
    .split(/(?=[A-Z])/)
    .map((s) => s.toLowerCase())
    .join(" ")
}

const alarmsToUpdate = (alarms: BatteryAlarmsState | VebusAlarmsState, part?: string) => {
  let updates: StatusUpdate[] = []
  Object.keys(alarms).forEach((key) => {
    if (alarms[key as keyof typeof alarms] > 0) {
      updates.push({
        part: part ? `Venus (${part})` : "Venus",
        message: keyToString(key),
        level: alarms[key as keyof typeof alarms] === 1 ? STATUS_LEVELS.WARNING : STATUS_LEVELS.ALARM,
      } as StatusUpdate)
    }
  })
  return updates
}

type StatusProps = {
  size: string[]
}

export const Status = ({ size }: StatusProps) => {
  const { statuses } = useStatus()
  const { state } = useSystemState()

  const batteryAlarms = useBatteryAlarms()
  const vebusAlarms = useVebusAlarms()

  let notifications: StatusUpdate[] = []

  notifications = notifications.concat(alarmsToUpdate(batteryAlarms, "Battery"))
  notifications = notifications.concat(alarmsToUpdate(vebusAlarms))
  notifications = notifications.concat(statuses?.slice() ?? [])

  return (
    <div className="metrics__status">
      <Card title={"Status"} size={size}>
        <div className={"title"}>Penny's House</div>
        <div className={"status"}>{SYSTEM_STATE_MAP[state?.toString() as keyof Object] ?? "--"}</div>
        <div className={"subheading"}>
          <div className={"subheading__model"}>Geo Pro Travel Trailer</div>
          <div className={"subheading__year"}>Model: 2019</div>
        </div>

        <div className={"status-updates " + size.join(" ")}>
          {notifications.map((update: StatusUpdate) => (
            <div className={"status-update row " + update.level} key={"status-update-" + update.part}>
              <span className={"row align-items-center"}>
                <div className={"row align-items-center status-update__icon"}>
                  <img src={IconWarning} alt={"Status update icon"} />
                </div>

                <span>{update.part}: </span>
                <span className={"status-update__message"}>{update.message}</span>
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
export default Status
