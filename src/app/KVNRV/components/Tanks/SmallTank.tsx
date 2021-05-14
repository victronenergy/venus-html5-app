import React from "react"

import { Card, SIZE_SMALL } from "../../../components/Card"
import { NotAvailable } from "../NotAvailable"
import NumericValue, { formatNumber } from "../../../components/NumericValue"
import ProgressIndicator from "../../components/ProgressIndicator"

import "./SmallTank.scss"
import { useTank } from "../../../modules"
import { TankProps } from "./index"
import { useSendUpdate } from "../../../modules"

export const SmallTank = ({ tankId, conf }: TankProps) => {
  const tank = useTank(tankId)
  console.log("SmallTank", tank, tankId)
  const footer = useSendUpdate(tank.level / 100, conf, tank.customName)

  return (
    <div className="">
      <Card title={tank?.customName ?? "--"} size={SIZE_SMALL} footer={footer}>
        <div className="gauge">
          {tank ? (
            <div className={"small-tank"}>
              <div className="indicator-main--small">
                <span>
                  <NumericValue value={tank.level} unit="%" defaultValue={"--"} precision={0} />
                  <span className="name">{formatNumber({ value: tank.remaining * 1000, unit: "L" })}</span>
                </span>
              </div>

              <ProgressIndicator percent={tank.level / 100} level={footer!.status} />
            </div>
          ) : (
            <NotAvailable />
          )}
        </div>
      </Card>
    </div>
  )
}
