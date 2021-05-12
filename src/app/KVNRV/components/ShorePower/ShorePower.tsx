import React from "react"
import { Card, SIZE_SMALL } from "../../../components/Card"

import { CommonProps } from "../Views/Metrics"
import "./ShorePower.scss"
import DonutIndicator from "../../../components/DonutIndicator"
import NumericValue from "../../../components/NumericValue"
import { useActiveInValues } from "../../../modules/ActiveSource/ActiveInValues.provider"
import { SHORE_POWER_CONF } from "../../utils/constants"
import { normalizePower } from "../../utils/helpers"
import { NotAvailable } from "../NotAvailable"

export const ShorePower = React.memo((props: CommonProps) => {
  const { current, frequency, voltage, power } = useActiveInValues()

  if (!(current && voltage && power)) {
    return <NotAvailable />
  }

  return (
    <div className="">
      <Card title={"Shore Power"} size={SIZE_SMALL}>
        <div className="gauge">
          <DonutIndicator
            value={power[0]}
            percent={normalizePower(power[0] ?? 0, SHORE_POWER_CONF.MAX)}
            parts={SHORE_POWER_CONF.THRESHOLDS}
            unit={"W"}
          />

          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>
              <NumericValue value={voltage[0] ?? 0} unit={"V"} precision={0} />
            </div>
            <div className={"info-bar__cell"}>
              <NumericValue value={current[0] ?? 0} unit={"A"} precision={0} />
            </div>
            <div className={"info-bar__cell"}>
              <NumericValue value={frequency[0] ?? 0} unit={"Hz"} precision={0} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
})

export default ShorePower
