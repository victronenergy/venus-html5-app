import React from "react"

import { useAcLoads, useSendUpdate } from "../../../modules"
import { Card, SIZE_NARROW, SIZE_SHORT } from "../../../components/Card"
import { normalizePower } from "../../utils/helpers"
import { AC_CONF } from "../../utils/constants"
import NumericValue from "../../../components/NumericValue"
import { NotAvailable } from "../NotAvailable"
import GaugeIndicator from "../../../components/GaugeIndicator"

export const AcLoads = () => {
  const { current, voltage, power, frequency } = useAcLoads()
  const normalizedPower = normalizePower(power && power[0] ? power[0] : 0, AC_CONF.MAX)
  useSendUpdate(normalizedPower, AC_CONF, "AC Loads")

  return (
    <Card title={"AC Loads"} size={[SIZE_SHORT, SIZE_NARROW]}>
      <div className="gauge">
        {power ? (
          <GaugeIndicator
            value={power[0] ?? 0}
            percent={normalizedPower}
            parts={AC_CONF.THRESHOLDS}
            unit={"W"}
            gauge={false}
          />
        ) : (
          <NotAvailable />
        )}

        <div className={"info-bar"}>
          <div className={"info-bar__cell"}>
            <NumericValue value={voltage ? voltage[0] : undefined} unit={"V"} precision={0} />
          </div>
          <div className={"info-bar__cell"}>
            <NumericValue value={current ? current[0] : undefined} unit={"A"} precision={0} />
          </div>
          <div className={"info-bar__cell"}>
            <NumericValue value={frequency ? frequency[0] : undefined} unit={"Hz"} precision={0} />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AcLoads
