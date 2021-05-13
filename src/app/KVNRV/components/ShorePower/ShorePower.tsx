import React from "react"
import { Card, SIZE_SMALL } from "../../../components/Card"

import "./ShorePower.scss"
import DonutIndicator from "../../../components/DonutIndicator"
import NumericValue from "../../../components/NumericValue"
import { useActiveInValues } from "../../../modules/ActiveSource/ActiveInValues.provider"
import { SHORE_POWER_CONF } from "../../utils/constants"
import { normalizePower, sendUpdate } from "../../utils/helpers"
import { NotAvailable } from "../NotAvailable"
import { useStatus } from "../../../modules/Status/Status.provider"

export const ShorePower = React.memo(() => {
  const { current, frequency, voltage, power } = useActiveInValues()
  const { statusService } = useStatus()

  if (!(current && voltage && power)) {
    return <NotAvailable />
  }
  const normalizedPower = normalizePower(power[0] ?? 0, SHORE_POWER_CONF.MAX)
  sendUpdate(normalizedPower, SHORE_POWER_CONF, "DC Loads", statusService)

  return (
    <div className="">
      <Card title={"Shore Power"} size={SIZE_SMALL}>
        <div className="gauge">
          <DonutIndicator value={power[0]} percent={normalizedPower} parts={SHORE_POWER_CONF.THRESHOLDS} unit={"W"} />

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
