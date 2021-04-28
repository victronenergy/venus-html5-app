import React  from "react"
import { Card, SIZE_SMALL } from "../Card"

import { NotAvailable } from "../NotAvailable"
import { CommonProps } from "../Views/Metrics"
import './ShorePower.scss'

export const ShorePower = (props: CommonProps) => {

  return (
    <div className="">
      <Card title={'Shore Power'} size={SIZE_SMALL}>
        <div className="gauge">
          <NotAvailable />
          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>{'-- A'}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ShorePower
