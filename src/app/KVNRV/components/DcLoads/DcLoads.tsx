import React from "react"
import { Card, SIZE_NARROW, SIZE_SHORT } from "../../../components/Card"
import { useDcLoads, useSendUpdate } from "../../../modules"
import { DC_CONF } from "../../utils/constants"

import "./DcLoads.scss"
import NumericValue from "../../../components/NumericValue"
import { normalizePower } from "../../utils/helpers"
import GaugeIndicator from "../../../components/GaugeIndicator"

export const DcLoads = () => {
  const { voltage, power } = useDcLoads()
  const normalizedPower = normalizePower(power ?? 0, DC_CONF.MAX)
  useSendUpdate(normalizedPower, DC_CONF, "DC Loads")

  return (
    <Card title={"DC Loads"} size={[SIZE_SHORT, SIZE_NARROW]}>
      <div className="gauge">
        <GaugeIndicator value={power} percent={normalizedPower} parts={DC_CONF.THRESHOLDS} unit={"W"} gauge={false} />
        <div className={"info-bar"}>
          <div className={"info-bar__cell"}>
            <NumericValue value={voltage} unit={"A"} precision={0} />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default DcLoads
