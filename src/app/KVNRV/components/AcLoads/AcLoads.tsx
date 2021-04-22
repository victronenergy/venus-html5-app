import React  from "react"

import { AC_CONF } from "../../constants/constants"
import { useAcLoads } from "../../../modules/AcLoads/AcLoads.provider"
import { Card, SIZE_SMALL } from "../Card"
import DonutIndicator from "../DonutIndicator"
import { NotAvailable } from "../NotAvailable"


export const AcLoads = () => {
  const {current, voltage, power, phases} = useAcLoads()

  let normalized_power = (power || 0) / AC_CONF.MAX
  normalized_power = Math.max(Math.min(normalized_power, 1), 0)

  return (
    <div className="">
      <Card title={'AC Loads'} icon={undefined} size={SIZE_SMALL}>
        <div className="gauge">
          {power ? (
            <DonutIndicator value={power} percent={normalized_power} parts={AC_CONF.THRESHOLDS} unit={"W"} />
          ) : ( <NotAvailable /> )}

          <div className={"info-bar"}>
            <span>{(voltage || '--') + " V"}</span>
            <span>{(current || '--') + " A"}</span>
            <span>{(phases || '--') + " Hz"}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AcLoads
