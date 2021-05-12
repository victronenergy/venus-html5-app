import React from "react"
import { Card, SIZE_SMALL } from "../../../components/Card"

import { NotAvailable } from "../NotAvailable"
import { CommonProps } from "../Views/Metrics"
import "./ShorePower.scss"
import NumericValue from "../../../components/NumericValue"

export const ShorePower = (props: CommonProps) => {
  return (
    <div className="">
      <Card title={"Shore Power"} size={SIZE_SMALL}>
        <div className="gauge">
          <NotAvailable />
          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>
              <NumericValue value={0} unit={"A"} precision={0} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default React.memo(ShorePower)
