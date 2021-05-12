import React from "react"
import { Card, SIZE_SMALL } from "../../../components/Card"
import DonutIndicator from "../../../components/DonutIndicator"
import { useDcLoads } from "../../../modules"
import { DC_CONF } from "../../utils/constants"

import { CommonProps } from "../Views/Metrics"
import "./DcLoads.scss"
import NumericValue from "../../../components/NumericValue"

export const DcLoads = (props: CommonProps) => {
  const { voltage, power } = useDcLoads()

  let normalized_power = (power || 0) / DC_CONF.MAX
  normalized_power = Math.max(Math.min(normalized_power, 1), 0)

  return (
    <div className="">
      <Card title={"DC Loads"} size={SIZE_SMALL}>
        <div className="gauge">
          <DonutIndicator value={power} percent={normalized_power} parts={DC_CONF.THRESHOLDS} unit={"W"} />
          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>
              <NumericValue value={voltage} unit={"A"} precision={0} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default React.memo(DcLoads)
