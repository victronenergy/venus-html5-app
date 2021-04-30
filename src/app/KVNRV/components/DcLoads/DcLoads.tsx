import React from "react"
import { Card, SIZE_SMALL } from "../Card"
import DonutIndicator from "../DonutIndicator"
import { useDcLoads } from "../../../modules/DcLoads"
import { DC_CONF } from "../../constants/constants"

import { NotAvailable } from "../NotAvailable"
import { CommonProps } from "../Views/Metrics"
import './DcLoads.scss'
import NumericValue from "../../../components/NumericValue"

export const DcLoads = (props: CommonProps) => {
  const {voltage, power} = useDcLoads()

  let v = 0, p = 0
  if (voltage && power) {
    v = voltage[0] || 0
    p = power[0] || 0
  }

  let normalized_power = (p || 0) / DC_CONF.MAX
  normalized_power = Math.max(Math.min(normalized_power, 1), 0)


  return (
    <div className="">
      <Card title={'DC Loads'} size={SIZE_SMALL}>
        <div className="gauge">
          {power ? (
            <DonutIndicator value={p} percent={normalized_power} parts={DC_CONF.THRESHOLDS} unit={"W"} />
          ) : ( <NotAvailable /> )}

          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>
              <NumericValue value={v} unit={"A"} precision={0} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default React.memo(DcLoads)
