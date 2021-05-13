import React from "react"

import { Card, SIZE_SMALL } from "../../../components/Card"
import { NotAvailable } from "../NotAvailable"
import NumericValue, { formatNumber } from "../../../components/NumericValue"
import ProgressIndicator from "../../components/ProgressIndicator"

import "./SmallTank.scss"
import { sendUpdate } from "../../utils/helpers"
import { TankProps } from "./Tanks"
import { useTank } from "../../../modules/Tanks/Tank.provider"

export const SmallTank = React.memo(({ tankId, conf, addStatusUpdate, removeStatusUpdate }: TankProps) => {
  const tank = useTank(tankId)
  console.log("SmallTank", tank)
  const footer = tank ? sendUpdate(tank.level, conf, tank.customName, addStatusUpdate, removeStatusUpdate) : undefined

  return (
    <div className="">
      <Card title={tank?.customName ?? "--"} size={SIZE_SMALL} footer={footer}>
        <div className="gauge">
          {tank ? (
            <div className={"small-tank"}>
              <div className="indicator-main--small">
                <span>
                  <NumericValue value={tank.level * 100} unit="%" defaultValue={"--"} precision={0} />
                  <span className="name">{formatNumber({ value: tank.capacity * 1000, unit: "L" })}</span>
                </span>
              </div>

              <ProgressIndicator percent={tank.level} level={footer!.status} />
            </div>
          ) : (
            <NotAvailable />
          )}
        </div>
      </Card>
    </div>
  )
})
