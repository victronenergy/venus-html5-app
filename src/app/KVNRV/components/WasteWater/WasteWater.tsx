import React from "react"
import { Card, SIZE_SMALL } from "../Card"

import { NotAvailable } from "../NotAvailable"
import { CommonProps, STATUS_LEVELS } from "../Views/Metrics"
import { Footer } from "../Card/Card"
import NumericValue from "../../../components/NumericValue"
import { useWater } from "../../../modules/Water/Water.provider"
import ProgressIndicator from "../ProgressIndicator"
import { WASTE_WATER_CONF } from "../../constants/constants"

import "./WasteWater.scss"

export const WasteWater = (props: CommonProps) => {
  const { waste_water } = useWater()

  const footer: Footer = { status: STATUS_LEVELS.SUCCESS, property: "Status" }

  let level = ""
  if (waste_water) {
    level =
      waste_water.level < WASTE_WATER_CONF.THRESHOLDS[0]
        ? STATUS_LEVELS.SUCCESS
        : waste_water.level < WASTE_WATER_CONF.THRESHOLDS[0] + WASTE_WATER_CONF.THRESHOLDS[1]
        ? STATUS_LEVELS.WARNING
        : STATUS_LEVELS.ALARM
  }

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

              <ProgressIndicator percent={waste_water.level} level={level} />
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
