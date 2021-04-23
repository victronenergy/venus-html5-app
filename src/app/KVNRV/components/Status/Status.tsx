import React  from "react"

import { Card, SIZE_BIG, SIZE_LONG } from "../Card"
import { Footer } from "../Card/Card"
import IconWarning from "../../images/IconWarning.svg"
import IconAlarm from "../../images/IconWarning.svg"
import IconClose from "../../images/IconClose.svg"
import { STATUS_LEVELS, StatusUpdate } from "../Views/Metrics"
import "./Status.scss"

type StatusProps = {
  status_updates: Array<StatusUpdate>
}

export const Status = (props: StatusProps) => {
  const footer: Footer = {status: STATUS_LEVELS.SUCCESS, property: "Connection"}

  return (
    <div className="metrics__status">
      <Card title={'Status'} size={[SIZE_BIG, SIZE_LONG]} footer={footer}>
        <div className={"title"}>Penny's House</div>
        <div className={"subheading row"}>
          <div className={"subheading__model"}>Class A Motor Home</div>
          <div className={"subheading__year"}>Model: 2016</div>
        </div>

        <div className={"status-updates"}>
          {props.status_updates && props.status_updates.map(update => (
            <div className={"status-update row " + update.level} key={'status-update-' + update.part}>
              <span className={"row align-items-center"}>
                <div className={"status-update__icon"}>
                  <img src={update.level === STATUS_LEVELS.WARNING ? IconWarning : IconAlarm}  alt={"Status update icon"}/>
                </div>

                <span>{update.part}: </span>
                <span>{update.message}</span>
              </span>

              <img src={IconClose} alt={"Close icon"}/>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
