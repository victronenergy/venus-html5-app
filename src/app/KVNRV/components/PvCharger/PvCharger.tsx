import React from "react"

import { PV_CONF } from "../../utils/constants"
import { usePvCharger } from "@elninotech/mfd-modules"
import { useSendUpdate } from "../../modules"
import { Card, SIZE_NARROW, SIZE_SHORT } from "../../../components/Card"
import NumericValue from "../../../components/NumericValue"
import { normalizePower } from "../../utils/helpers"
import GaugeIndicator from "../../../components/GaugeIndicator"

export const PvCharger = () => {
  const { current, power } = usePvCharger()

  const normalizedPower = normalizePower(power ?? 0, PV_CONF.MAX)
  useSendUpdate(normalizedPower, PV_CONF, "PV Charger")

  return (
    <div className="">
      <Card title={"PV Charger"} size={[SIZE_SHORT, SIZE_NARROW]}>
        <div className="pv_charger gauge">
          <GaugeIndicator value={power} percent={normalizedPower} parts={PV_CONF.THRESHOLDS} unit={"W"} gauge={false} />
          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>
              <NumericValue value={current} unit={"A"} precision={1} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PvCharger
