import React  from "react"
import { Card, SIZE_SMALL } from "../Card"
import "./WasteWater.scss"
import { NotAvailable } from "../NotAvailable"
import { CommonProps, STATUS_LEVELS } from "../Views/Metrics"
import { Footer } from "../Card/Card"

export const WasteWater = (props: CommonProps) => {
  const footer: Footer = {status: STATUS_LEVELS.SUCCESS, property: "Status"}

  return (
    <div className="">
      <Card title={'Waste Water'} size={SIZE_SMALL} footer={footer}>
        <div className="gauge">
          <NotAvailable />
        </div>
      </Card>
    </div>
  )
}

export default WasteWater
