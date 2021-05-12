import React from "react"
import { Card, SIZE_SMALL } from "../../../components/Card"

import { NotAvailable } from "../NotAvailable"
import { CommonProps, STATUS_LEVELS, STATUS_LEVELS_MSG } from "../Views/Metrics"
import { Footer } from "../../../components/Card/Card"
import "./BlackWater.scss"

export const BlackWater = (props: CommonProps) => {
  const footer: Footer = {
    status: STATUS_LEVELS.ALARM,
    property: "Status",
    message: STATUS_LEVELS_MSG[STATUS_LEVELS.ALARM],
  }

  return (
    <div className="">
      <Card title={"Black Water"} size={SIZE_SMALL} footer={footer}>
        <div className="gauge">
          <NotAvailable />
        </div>
      </Card>
    </div>
  )
}

export default BlackWater
