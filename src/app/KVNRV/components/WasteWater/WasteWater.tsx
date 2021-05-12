import React from "react"
import { Card, SIZE_SMALL } from "../../../components/Card"

import { NotAvailable } from "../NotAvailable"
import { CommonProps } from "../Views/Metrics"
import NumericValue from "../../../components/NumericValue"
import { useWater } from "../../../modules"
import ProgressIndicator from "../ProgressIndicator"
import { WASTE_WATER_CONF } from "../../utils/constants"

import "./WasteWater.scss"
import { sendUpdate } from "../../utils/helpers"

export const WasteWater = (props: CommonProps) => {
  const { waste_water } = useWater()

  const footer = sendUpdate(
    waste_water?.level ?? 0,
    WASTE_WATER_CONF,
    "Waste Water",
    props.addStatusUpdate,
    props.removeStatusUpdate
  )

  return (
    <div className="">
      <Card title={"Waste Water"} size={SIZE_SMALL} footer={footer}>
        <div className="gauge">
          {waste_water ? (
            <div className={"waste-water"}>
              <div className="indicator-main--small">
                <span>
                  <NumericValue value={waste_water.level * 100} unit="%" defaultValue={"--"} precision={0} />
                  <span className="name">{waste_water.size + " gal."}</span>
                </span>
              </div>

              <ProgressIndicator percent={waste_water.level} level={footer.status} />
            </div>
          ) : (
            <NotAvailable />
          )}
        </div>
      </Card>
    </div>
  )
}

export default WasteWater
