import React from "react"

import { useAcLoads, useSendUpdate } from "../../../modules"
import { Card, SIZE_SMALL } from "../../../components/Card"
import { normalizePower } from "../../utils/helpers"
import { AC_CONF } from "../../utils/constants"
import NumericValue from "../../../components/NumericValue"
import DonutIndicator from "../../../components/DonutIndicator"
import { NotAvailable } from "../NotAvailable"

export const AcLoads = () => {
  const { current, voltage, power, frequency } = useAcLoads()
  const normalizedPower = normalizePower(power && power[0] ? power[0] : 0, AC_CONF.MAX)
  useSendUpdate(normalizedPower, AC_CONF, "AC Loads")

  if (!(current && voltage && power && frequency)) {
    return <NotAvailable />
  }

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
}

export default AcLoads
