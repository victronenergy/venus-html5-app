import React  from "react"

import { PV_CONF } from "../../constants/constants"
import DonutIndicator from "../DonutIndicator"
import { usePvCharger } from "../../../modules/PvCharger/PvCharger.provider"
import { Card, SIZE_SMALL } from "../Card"
import { NotAvailable } from "../NotAvailable"


const PvCharger = () => {
  const {current, power} = usePvCharger()

  let pow = power
  if (pow != undefined && isNaN(pow)) { pow = 0; }

  let normalized_power = (pow || 0) / PV_CONF.MAX
  normalized_power = Math.max(Math.min(normalized_power, 1), 0)

  return (
    <div className="">
      <Card title={'PV Charger'} icon={undefined} size={SIZE_SMALL}>
        <div className="pv_charger gauge">
          {pow ? (
            <DonutIndicator value={pow} percent={normalized_power} parts={PV_CONF.THRESHOLDS} unit={"W"} />
          ) : ( <NotAvailable /> )}

          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>{(current || '--') + " A"}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PvCharger
