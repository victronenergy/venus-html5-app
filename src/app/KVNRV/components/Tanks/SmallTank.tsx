import React from "react"

import { Card, SIZE_NARROW, SIZE_SHORT } from "../../../components/Card"
import { NotAvailable } from "../NotAvailable"
import NumericValue, { formatNumber } from "../../../components/NumericValue"
import ProgressIndicator from "../../components/ProgressIndicator"

import "./SmallTank.scss"
import { useTank } from "../../../modules"
import { TankProps } from "./index"
import { useSendUpdate } from "../../../modules"
import { VOLUME_UNITS, VolumeUnit, VolumeUnits, FLUID_TYPES } from "../../utils/constants"

export const fluidTypeFormatter = (fluidType: string) => {
  switch (Number(fluidType)) {
    case FLUID_TYPES.FUEL:
      return "Fuel"
    case FLUID_TYPES.FRESH_WATER:
      return "Fresh water"
    case FLUID_TYPES.WASTE_WATER:
      return "Waste water"
    case FLUID_TYPES.LIVE_WELL:
      return "Live well"
    case FLUID_TYPES.OIL:
      return "Oil"
    case FLUID_TYPES.BLACK_WATER:
      return "Black water"
    default:
      return "Tank sensor"
  }
}

export const SmallTank = ({ tankId, conf, invert }: TankProps) => {
  const tank = useTank(tankId)
  const footer = useSendUpdate(
    invert ? 1 - tank.level / 100 : tank.level / 100,
    conf,
    tank.fluidType && fluidTypeFormatter(tank.fluidType)
  )

  const unit: VolumeUnit =
    tank?.unit && Object.keys(VOLUME_UNITS).includes(tank.unit.toString())
      ? VOLUME_UNITS[tank.unit.toString() as keyof VolumeUnits]
      : VOLUME_UNITS.default

  return (
    <div className="">
      <Card title={fluidTypeFormatter(tank.fluidType)} size={[SIZE_SHORT, SIZE_NARROW]} footer={footer}>
        <div className="gauge">
          {tank ? (
            <div className={"small-tank"}>
              <div className="indicator-main--small">
                <span>
                  <NumericValue value={tank.level} unit="%" defaultValue={" - "} precision={0} />
                  <span className="name">
                    {formatNumber({ value: tank.remaining * unit.factor, unit: unit.unit, precision: unit.precision })}
                  </span>
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
