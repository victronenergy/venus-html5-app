import React from "react"

import { PV_CONF } from "../../utils/constants"
import DonutIndicator from "../../../components/DonutIndicator"
import { usePvCharger } from "../../../modules"
import { Card, SIZE_SMALL } from "../../../components/Card"
import NumericValue from "../../../components/NumericValue"
import { normalizePower, sendUpdate } from "../../utils/helpers"
import { useStatus } from "../../../modules/Status/Status.provider"

export const PvCharger = () => {
  const { statusService } = useStatus()
  const { current, power } = usePvCharger()

  const normalizedPower = normalizePower(power ?? 0, PV_CONF.MAX)
  sendUpdate(normalizedPower, PV_CONF, "DC Loads", statusService)

  return (
    <div className="">
      <Card title={"PV Charger"} size={SIZE_SMALL}>
        <div className="pv_charger gauge">
          <DonutIndicator value={power} percent={normalizedPower} parts={PV_CONF.THRESHOLDS} unit={"W"} />

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

export default PvCharger
