import React  from "react"
import { Card, SIZE_SMALL } from "../Card"
import "./BlackWater.scss"
import { NotAvailable } from "../NotAvailable"
import { CommonProps, STATUS_LEVELS } from "../Views/Metrics"
import { Footer } from "../Card/Card"

export const BlackWater = (props: CommonProps) => {
  const footer: Footer = {status: STATUS_LEVELS.ALARM, property: "Status"}

  return (
    <div className="">
      <Card title={'Black Water'} size={SIZE_SMALL} footer={footer}>
        <div className="gauge">
          <NotAvailable />
        </div>
      </Card>
    </div>
  )
}

export default BlackWater
