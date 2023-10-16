import type { FC } from "react"
import classnames from "classnames"
import { formatCapacityFor } from "../../../../../utils/formatters/devices/tanks/format-capacity-for"
import { tankUnitFor } from "../../../../../utils/helpers/devices/tanks/tank-unit-for"

interface Props {
  remaining: number
  unit: string
  capacity: number
  isAuxillaryTank?: boolean
  className?: string
}

export const Capacity: FC<Props> = ({ remaining, unit, capacity, isAuxillaryTank, className }) => {
  const classes = classnames("text-victron-gray", className)

  const tankUnit = tankUnitFor(+unit)
  const calculatedCapacity = formatCapacityFor(capacity, +unit) + tankUnit

  const value = isAuxillaryTank
    ? `--/${calculatedCapacity}`
    : `${formatCapacityFor(remaining, +unit)}/${calculatedCapacity}`

  return <div className={classes}>{value}</div>
}
