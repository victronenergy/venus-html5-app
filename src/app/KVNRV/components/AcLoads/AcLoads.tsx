import React  from "react"

import { AC_CONF } from "../../constants/constants"
import { useAcLoads } from "../../../modules/AcLoads/AcLoads.provider"
import { Card, SIZE_SMALL } from "../Card"
import DonutIndicator from "../DonutIndicator"
import { NotAvailable } from "../NotAvailable"
import { CommonProps } from "../Views/Metrics"
import NumericValue from "../../../components/NumericValue"


export const AcLoads = (props: CommonProps) => {
  let {current, voltage, power, phases} = useAcLoads()

  let c = 0, v = 0, p = 0
  if (current && voltage && power) {
    c = current[0] || 0
    v = voltage[0] || 0
    p = power[0] || 0
  }

  let normalized_power = p / AC_CONF.MAX
  normalized_power = Math.max(Math.min(normalized_power, 1), 0)

  return (
    <div className="">
      <Card title={'AC Loads'} size={SIZE_SMALL}>
        <div className="gauge">
          {power ? (
            <DonutIndicator value={p} percent={normalized_power} parts={AC_CONF.THRESHOLDS} unit={"W"} />
          ) : ( <NotAvailable /> )}

          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>
              <NumericValue value={v} unit={"V"} precision={0} />
            </div>
            <div className={"info-bar__cell"}>
              <NumericValue value={c} unit={"A"} precision={0} />
            </div>
            <div className={"info-bar__cell"}>
              <NumericValue value={phases} unit={"Hz"} precision={0} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default React.memo(AcLoads)
