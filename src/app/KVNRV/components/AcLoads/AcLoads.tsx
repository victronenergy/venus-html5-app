import React from "react"

import { useAcLoads } from "../../../modules"
import { Card, SIZE_SMALL } from "../../../components/Card"
import { normalizePower, sendUpdate } from "../../utils/helpers"
import { AC_CONF } from "../../utils/constants"
import NumericValue from "../../../components/NumericValue"
import DonutIndicator from "../../../components/DonutIndicator"
import { NotAvailable } from "../NotAvailable"
import { useStatus } from "../../../modules/Status/Status.provider"

export const AcLoads = React.memo(() => {
  const { statusService } = useStatus()

  let { current, voltage, power, frequency } = useAcLoads()
  if (!(current && voltage && power && frequency)) {
    return <NotAvailable />
  }
  const normalizedPower = normalizePower(power[0] ?? 0, AC_CONF.MAX)

  sendUpdate(normalizedPower, AC_CONF, "AC Loads", statusService)

  return (
    <div className="">
      <Card title={"AC Loads"} size={SIZE_SMALL}>
        <div className="gauge">
          <DonutIndicator value={power[0] ?? 0} percent={normalizedPower} parts={AC_CONF.THRESHOLDS} unit={"W"} />

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

export default AcLoads
