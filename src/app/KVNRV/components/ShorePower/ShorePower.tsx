import React from "react"
import { Card, SIZE_NARROW, SIZE_SHORT } from "../../../components/Card"

import "./ShorePower.scss"
import NumericValue from "../../../components/NumericValue"
import { useActiveInValues } from "@elninotech/mfd-modules"
import { useSendUpdate } from "../../modules"
import { SHORE_POWER_CONF } from "../../utils/constants"
import { normalizePower } from "../../utils/helpers"
import { NotAvailable } from "../NotAvailable"
import GaugeIndicator from "../../../components/GaugeIndicator"

export const ShorePower = () => {
  const { current, frequency, voltage, power } = useActiveInValues()
  const normalizedPower = normalizePower(power && power[0] ? power[0] : 0, SHORE_POWER_CONF.MAX)
  useSendUpdate(normalizedPower, SHORE_POWER_CONF, "Shore Power")

  return (
    <div className="">
      <Card title={"Shore Power"} size={[SIZE_SHORT, SIZE_NARROW]}>
        <div className="gauge">
          {power ? (
            <GaugeIndicator
              value={power[0]}
              percent={normalizedPower}
              parts={SHORE_POWER_CONF.THRESHOLDS}
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
              <NumericValue value={current ? current[0] : undefined} unit={"A"} precision={1} />
            </div>
            <div className={"info-bar__cell"}>
              <NumericValue value={frequency ? frequency[0] : undefined} unit={"Hz"} precision={0} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ShorePower
