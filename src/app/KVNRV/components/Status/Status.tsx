import React from "react"

import { Card, SIZE_BIG, SIZE_LONG } from "../../../components/Card"
import { Footer } from "../../../components/Card/Card"
import IconWarning from "../../images/IconWarning.svg"
import IconAlarm from "../../images/IconWarning.svg"
import IconClose from "../../../images/IconClose-Dark.svg"
import "./Status.scss"
import { StatusUpdate } from "../Views/Metrics"
import { STATUS_LEVELS, STATUS_LEVELS_MSG } from "../../utils/constants"

type StatusProps = {
  status_updates: Array<StatusUpdate>
}

export const Status = (props: StatusProps) => {
  const footer: Footer = {
    status: STATUS_LEVELS.SUCCESS,
    property: "Connection",
    message: STATUS_LEVELS_MSG[STATUS_LEVELS.SUCCESS],
  }

  return (
    <div className="metrics__status">
      <Card title={"Status"} size={[SIZE_BIG, SIZE_LONG]} footer={footer}>
        <div className={"title"}>Penny's House</div>
        <div className={"subheading row"}>
          <div className={"subheading__model"}>Class A Motor Home</div>
          <div className={"subheading__year"}>Model: 2016</div>
        </div>

        <div className={"status-updates"}>
          {props.status_updates &&
            props.status_updates.map((update) => (
              <div className={"status-update row " + update.level} key={"status-update-" + update.part}>
                <span className={"row align-items-center"}>
                  <div className={"status-update__icon"}>
                    <img
                      src={update.level === STATUS_LEVELS.WARNING ? IconWarning : IconAlarm}
                      alt={"Status update icon"}
                    />
                  </div>

                  <span>{update.part}: </span>
                  <span>{update.message}</span>
                </span>

                <img src={IconClose} alt={"Close icon"} />
              </div>
            ))}
        </div>
      </Card>
    </div>
  )
}

export default Status
