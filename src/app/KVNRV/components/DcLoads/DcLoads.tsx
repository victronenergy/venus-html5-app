import { Card, SIZE_NARROW, SIZE_SHORT } from "../../../components/Card"
import { useDcLoads } from "@victronenergy/mfd-modules"
import { useSendUpdate } from "../../modules"
import { CRITICAL_MULTIPLIER, DC_CONF } from "../../utils/constants"

import "./DcLoads.scss"
import NumericValue from "../../../components/NumericValue"
import { normalizePower } from "../../utils/helpers"
import { Translate } from "react-i18nify"
import { observer } from "mobx-react"
import { KVNGauge } from "../KVNGauge"

export const DcLoads = observer(() => {
  const { voltage, current, power } = useDcLoads()

  const powerMax = (voltage ?? 1) * 60 * CRITICAL_MULTIPLIER
  const normalizedPower = normalizePower(power ?? 0, powerMax)
  useSendUpdate(normalizedPower, DC_CONF, "DC Loads")

  return (
    <Card title={<Translate value="widgets.dcLoads" />} size={[SIZE_SHORT, SIZE_NARROW]}>
      <div className="gauge">
        <KVNGauge value={power} percent={normalizedPower} parts={DC_CONF.THRESHOLDS} unit={"W"} />
        <div className={"info-bar"}>
          <div className={"info-bar__cell"}>
            <NumericValue value={voltage} unit={"V"} precision={2} />
          </div>
          <div className={"info-bar__cell"}>
            <NumericValue value={current} unit={"A"} precision={1} />
          </div>
        </div>
      </div>
    </Card>
  )
})

export default DcLoads
