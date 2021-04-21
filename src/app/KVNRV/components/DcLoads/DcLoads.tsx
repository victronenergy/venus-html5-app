import React  from "react"
import { Card, SIZE_SMALL } from "../Card"
import DonutIndicator from "../DonutIndicator"
import { useDcLoads } from "../../../modules/DcLoads"
import { DC_CONF } from "../../constants/constants"
import "./DcLoads.scss"
import { NotAvailable } from "../NotAvailable"

export const DcLoads = () => {
  const {voltage, power} = useDcLoads()

  let normalized_power = (power || 0) / DC_CONF.MAX
  normalized_power = Math.max(Math.min(normalized_power, 1), 0)

  return (
    <div className="">
      <Card title={'DC Loads'} icon={undefined} size={SIZE_SMALL}>
        <div className="gauge">
          {power ? (
            <DonutIndicator value={power} percent={normalized_power} parts={[0.5, 0.25, 0.25]} unit={"W"} />
          ) : ( <NotAvailable /> )}

          <div className={"info-bar"}>
            <span>{(voltage || '--') + " A"}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DcLoads
