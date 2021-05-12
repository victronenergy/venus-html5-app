import React from "react"

import { PV_CONF } from "../../utils/constants"
import DonutIndicator from "../../../components/DonutIndicator"
import { usePvCharger } from "../../../modules"
import { Card, SIZE_SMALL } from "../../../components/Card"
import { CommonProps } from "../Views/Metrics"
import NumericValue from "../../../components/NumericValue"
import { normalizePower } from "../../utils/helpers"

export const PvCharger = React.memo((props: CommonProps) => {
  const { current, power } = usePvCharger()

  return (
    <div className="">
      <Card title={"PV Charger"} size={SIZE_SMALL}>
        <div className="pv_charger gauge">
          <DonutIndicator
            value={power}
            percent={normalizePower(power ?? 0, PV_CONF.MAX)}
            parts={PV_CONF.THRESHOLDS}
            unit={"W"}
          />

          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>
              <NumericValue value={current} unit={"A"} precision={0} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
})

export default PvCharger
