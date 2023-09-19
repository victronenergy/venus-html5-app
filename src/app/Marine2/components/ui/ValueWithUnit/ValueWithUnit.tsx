import React, { FC } from "react"
import { powerValueFor } from "../../../utils/formatters/power-value-for"
import { powerUnitFor } from "../../../utils/formatters/power-unit-for"
import { formatValue } from "../../../utils/formatters"
import { unit } from "@m2Types/generic/unit"
import { Unit } from "./Unit/Unit"

interface Props {
  value?: number
  unit?: unit
  className?: string
  inputLimitValue?: JSX.Element
}

export const ValueWithUnit: FC<Props> = ({ value = 0, unit, className, inputLimitValue }) => {
  if (unit === "W" || unit === "kW") {
    return (
      <span className={className}>
        {powerValueFor(value)}
        <Unit unit={powerUnitFor(value)} />
      </span>
    )
  }

  return (
    <span className={className}>
      {inputLimitValue ?? formatValue(value)}
      <Unit unit={unit} />
    </span>
  )
}
