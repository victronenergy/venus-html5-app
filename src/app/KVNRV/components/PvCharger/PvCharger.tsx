import React from "react"

import { PV_CONF } from "../../utils/constants"
import DonutIndicator from "../../../components/DonutIndicator"
import { usePvCharger } from "../../../modules"
import { Card, SIZE_SMALL } from "../../../components/Card"
import { CommonProps } from "../Views/Metrics"
import NumericValue from "../../../components/NumericValue"

const PvCharger = (props: CommonProps) => {
  const { current, power } = usePvCharger()

  let normalized_power = (power || 0) / PV_CONF.MAX
  normalized_power = Math.max(Math.min(normalized_power, 1), 0)

  return (
    <div className="">
      <Card title={"PV Charger"} size={SIZE_SMALL}>
        <div className="pv_charger gauge">
          <DonutIndicator value={power} percent={normalized_power} parts={PV_CONF.THRESHOLDS} unit={"W"} />

          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>
              <NumericValue value={current} unit={"A"} precision={0} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default React.memo(PvCharger)
