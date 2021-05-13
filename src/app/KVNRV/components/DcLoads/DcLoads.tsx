import React from "react"
import { Card, SIZE_SMALL } from "../../../components/Card"
import DonutIndicator from "../../../components/DonutIndicator"
import { useDcLoads } from "../../../modules"
import { DC_CONF } from "../../utils/constants"

import "./DcLoads.scss"
import NumericValue from "../../../components/NumericValue"
import { normalizePower, sendUpdate } from "../../utils/helpers"
import { useStatus } from "../../../modules/Status/Status.provider"

export const DcLoads = React.memo(() => {
  const { statusService } = useStatus()
  const { voltage, power } = useDcLoads()

  const normalizedPower = normalizePower(power ?? 0, DC_CONF.MAX)
  sendUpdate(normalizedPower, DC_CONF, "DC Loads", statusService)

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
})

export default DcLoads
