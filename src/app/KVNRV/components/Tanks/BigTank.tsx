import React from "react"

import { Card, SIZE_BIG, SIZE_LONG } from "../../../components/Card"
import { NotAvailable } from "../NotAvailable"
import NumericValue, { formatNumber } from "../../../components/NumericValue"
import WaterTankTop from "../../images/WaterTankTop.svg"

import "./BigTank.scss"
import { useSendUpdate } from "../../utils/helpers"
import { useTank } from "../../../modules/Tanks/Tank.provider"
import { TankProps } from "./index"

export const BigTank = ({ tankId, conf }: TankProps) => {
  const tank = useTank(tankId)
  const footer = useSendUpdate(1 - tank.level / 100, conf, tank.customName)

  console.log("BigTank", tank)

  return (
    <div className="">
      <Card title={tank?.customName ?? "--"} size={[SIZE_BIG, SIZE_LONG]} footer={footer}>
        {tank ? (
          <div className="big-tank">
            <div className="indicator-main">
              <span>
                <NumericValue value={tank.level} unit="%" defaultValue={"--"} precision={0} />
                <span className="name">{formatNumber({ value: tank.capacity * 1000, unit: "L" })}</span>
              </span>
            </div>

            <div className="wrapper">
              <div className={"water-tank"}>
                <div className="water-tank__outline">
                  <div className={"water-tank__water"}>
                    <img src={WaterTankTop} className="water-tank__water__top" alt={"Water wave top"} />
                    <div className={"water-tank__water__body"} style={{ height: tank.level + "%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NotAvailable />
        )}
      </Card>
    </div>
  )
}
