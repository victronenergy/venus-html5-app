import React from "react"

import { Card } from "../../../components/Card"
import { Footer } from "../../../components/Card/Card"
import IconWarning from "../../images/IconWarning.svg"
import "./Status.scss"
import { STATUS_LEVELS, STATUS_LEVELS_MSG } from "../../utils/constants"
import { StatusUpdate, useStatus } from "../../../modules"
import { useSystemState } from "../../../modules/SystemState/SystemState.provider"

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

type StatusProps = {
  size: string[]
}

export const Status = ({ size }: StatusProps) => {
  const { statuses } = useStatus()
  const { state } = useSystemState()

  const footer: Footer = {
    status: STATUS_LEVELS.SUCCESS,
    property: "Connection",
    message: STATUS_LEVELS_MSG[STATUS_LEVELS.SUCCESS],
  }

  return (
    <div className="metrics__status">
      <Card title={"Status"} size={size} footer={footer}>
        <div className={"title"}>Penny's House</div>
        <div className={"status"}>{SYSTEM_STATE_MAP[state?.toString() as keyof Object] ?? "--"}</div>
        <div className={"subheading row"}>
          <div className={"subheading__model"}>Class A Motor Home</div>
          <div className={"subheading__year"}>Model: 2016</div>
        </div>

        <div className={"status-updates " + size.join(" ")}>
          {statuses &&
            statuses.map((update: StatusUpdate) => (
              <div className={"status-update row " + update.level} key={"status-update-" + update.part}>
                <span className={"row align-items-center"}>
                  <div className={"status-update__icon"}>
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
