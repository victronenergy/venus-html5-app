import React from "react"
import { Card, SIZE_SMALL } from "../../../components/Card"

import { NotAvailable } from "../NotAvailable"
import { CommonProps } from "../Views/Metrics"
import "./BlackWater.scss"
import { sendUpdate } from "../../utils/helpers"
import { BLACK_WATER_CONF } from "../../utils/constants"
import { useWater } from "../../../modules"
import NumericValue from "../../../components/NumericValue"
import ProgressIndicator from "../ProgressIndicator"

export const BlackWater = (props: CommonProps) => {
  const { black_water } = useWater()

  const footer = sendUpdate(
    black_water?.level ?? 0,
    BLACK_WATER_CONF,
    "Black Water",
    props.addStatusUpdate,
    props.removeStatusUpdate
  )

  return (
    <div className="">
      <Card title={"Black Water"} size={SIZE_SMALL} footer={footer}>
        <div className="gauge">
          {black_water ? (
            <div className={"waste-water"}>
              <div className="indicator-main--small">
                <span>
                  <NumericValue value={black_water.level * 100} unit="%" defaultValue={"--"} precision={0} />
                  <span className="name">{black_water.size + " gal."}</span>
                </span>
              </div>

              <ProgressIndicator percent={black_water.level} level={footer.status} />
            </div>
          ) : (
            <NotAvailable />
          )}
        </div>
      </Card>
    </div>
  )
}

export default BlackWater
