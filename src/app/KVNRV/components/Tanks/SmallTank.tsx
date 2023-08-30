import React from "react"

import { Card, SIZE_NARROW, SIZE_SHORT } from "../../../components/Card"
import { NotAvailable } from "../NotAvailable"
import NumericValue, { formatNumber } from "../../../components/NumericValue"
import ProgressIndicator from "../ProgressIndicator"

import "./SmallTank.scss"
import { useTank } from "@victronenergy/mfd-modules"
import { TankProps } from "./index"
import { useSendUpdate } from "../../modules"
import {
  VOLUME_UNITS,
  VolumeUnit,
  VolumeUnits,
  FLUID_TYPES,
  REVERSE_CONFIG_FLUID_TYPES,
  TANKS_CONF,
} from "../../utils/constants"
import { Translate } from "react-i18nify"
import { observer } from "mobx-react"

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

export const SmallTank = observer(({ tankId }: TankProps) => {
  const tank = useTank(tankId)
  const hasReverseConfig = REVERSE_CONFIG_FLUID_TYPES.includes(+tank.fluidType)

  const footer = useSendUpdate(
    !hasReverseConfig ? 1 - tank.level / 100 : tank.level / 100,
    hasReverseConfig ? TANKS_CONF.REVERSE_TANK : TANKS_CONF.STANDART_TANK,
    tank.fluidType && fluidTypeFormatter(tank.fluidType)
  )

  const unit: VolumeUnit =
    tank?.unit && Object.keys(VOLUME_UNITS).includes(tank.unit.toString())
      ? VOLUME_UNITS[tank.unit.toString() as keyof VolumeUnits]
      : VOLUME_UNITS.default

  return (
    <div className="">
      <Card
        title={<Translate value={"tankWidget." + fluidTypeFormatter(tank.fluidType)} />}
        size={[SIZE_SHORT, SIZE_NARROW]}
        footer={footer}
      >
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
})
