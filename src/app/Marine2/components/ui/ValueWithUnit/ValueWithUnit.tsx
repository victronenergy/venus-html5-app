import { FC } from "react"
import { powerValueFor } from "../../../utils/formatters/power/power-value-for"
import { powerUnitFor } from "../../../utils/formatters/power/power-unit-for"
import { formatValue } from "../../../utils/formatters"
import { unit } from "@m2Types/data/unit"
import { Unit } from "./Unit/Unit"
import { TForcePowerUnit } from "@m2Types/data/force-power-unit"
import { TStatus } from "@m2Types/data/status"

interface Props {
  value?: number
  unit?: unit
  className?: string
  status?: TStatus
  hideDecimal?: boolean
  forcePowerUnit?: TForcePowerUnit
}

export const ValueWithUnit: FC<Props> = ({
  value,
  unit,
  className,
  status = "active",
  hideDecimal,
  forcePowerUnit,
}) => {
  if (status !== "active") {
    const getInactiveUnit = () => (unit === "W" || unit === "kW" ? "W" : unit)
    return (
      <span className={`min-w-fit ${className}`}>
        --
        <Unit unit={getInactiveUnit()} />
      </span>
    )
  }

  if (unit === "W" || unit === "kW") {
    return (
      <span className={`min-w-fit ${className}`}>
        {powerValueFor(value, forcePowerUnit)}
        <Unit unit={powerUnitFor(value, forcePowerUnit)} />
      </span>
    )
  }

  if (!value && !unit) {
    return null
  }

  return (
    <span className={`min-w-fit ${className}`}>
      {formatValue(value, hideDecimal ? 0 : 1)}
      <Unit unit={unit} />
    </span>
  )
}
