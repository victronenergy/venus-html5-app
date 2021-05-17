import React from "react"

import { Card } from "../../../components/Card"
import { Footer } from "../../../components/Card/Card"
import IconWarning from "../../images/IconWarning.svg"
import "./Status.scss"
import { STATUS_LEVELS, STATUS_LEVELS_MSG } from "../../utils/constants"
import { StatusUpdate, useStatus } from "../../../modules"

type StatusProps = {
  size: string[]
}

export const Status = ({ size }: StatusProps) => {
  const { statuses } = useStatus()

  const footer: Footer = {
    status: STATUS_LEVELS.SUCCESS,
    property: "Connection",
    message: STATUS_LEVELS_MSG[STATUS_LEVELS.SUCCESS],
  }

  return (
    <div className="metrics__status">
      <Card title={"Status"} size={size} footer={footer}>
        <div className={"title"}>Penny's House</div>
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
