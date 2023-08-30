import React from "react"

import { PV_CONF } from "../../utils/constants"
import { usePvCharger } from "@victronenergy/mfd-modules"
import { useSendUpdate } from "../../modules"
import { Card, SIZE_NARROW, SIZE_SHORT } from "../../../components/Card"
import NumericValue from "../../../components/NumericValue"
import { normalizePower } from "../../utils/helpers"
import { Translate } from "react-i18nify"
import { observer } from "mobx-react"
import { KVNGauge } from "../KVNGauge"

export const PvCharger = observer(() => {
  const { current, power } = usePvCharger()

  const normalizedPower = normalizePower(power ?? 0, PV_CONF.MAX)
  useSendUpdate(normalizedPower, PV_CONF, "PV Charger")

  return (
    <div className="">
      <Card title={<Translate value="widgets.pvCharger" />} size={[SIZE_SHORT, SIZE_NARROW]}>
        <div className="pv_charger gauge">
          <KVNGauge value={power} percent={normalizedPower} parts={PV_CONF.THRESHOLDS} unit={"W"} />
          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>
              <NumericValue value={current} unit={"A"} precision={1} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
})

export default PvCharger
