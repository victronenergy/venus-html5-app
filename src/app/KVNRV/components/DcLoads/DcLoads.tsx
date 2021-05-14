import React from "react"
import { Card, SIZE_SMALL } from "../../../components/Card"
import DonutIndicator from "../../../components/DonutIndicator"
import { useDcLoads, useSendUpdate } from "../../../modules"
import { DC_CONF } from "../../utils/constants"

import "./DcLoads.scss"
import NumericValue from "../../../components/NumericValue"
import { normalizePower } from "../../utils/helpers"

export const DcLoads = () => {
  const { voltage, power } = useDcLoads()
  const normalizedPower = normalizePower(power ?? 0, DC_CONF.MAX)
  useSendUpdate(normalizedPower, DC_CONF, "DC Loads")

  return (
    <div className="">
      <Card title={"DC Loads"} size={SIZE_SMALL}>
        <div className="gauge">
          <DonutIndicator value={power} percent={normalizedPower} parts={DC_CONF.THRESHOLDS} unit={"W"} />

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

export default DcLoads
