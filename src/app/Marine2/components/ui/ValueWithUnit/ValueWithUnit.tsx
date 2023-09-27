import React, { FC } from "react"
import { powerValueFor } from "../../../utils/formatters/power/power-value-for"
import { powerUnitFor } from "../../../utils/formatters/power/power-unit-for"
import { formatValue } from "../../../utils/formatters"
import { unit } from "@m2Types/generic/unit"
import { Unit } from "./Unit/Unit"
import { TForcePowerUnit } from "@m2Types/generic/force-power-unit"

interface Props {
  value?: number
  unit?: unit
  className?: string
  hideDecimal?: boolean
  inputLimitValue?: JSX.Element
  forcePowerUnit?: TForcePowerUnit
}

export const ValueWithUnit: FC<Props> = ({ value, unit, className, hideDecimal, inputLimitValue, forcePowerUnit }) => {
  if (unit === "W" || unit === "kW") {
    return (
      <span className={className}>
        {powerValueFor(value, forcePowerUnit)}
        <Unit unit={powerUnitFor(value, forcePowerUnit)} />
      </span>
    )
  }

  return (
    <span className={className}>
      {inputLimitValue ?? formatValue(value, hideDecimal ? 0 : 1)}
      <Unit unit={unit} />
    </span>
  )
}
