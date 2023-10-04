import type { FC } from "react"
import classnames from "classnames"
import { formatLevelFor } from "../../../../../utils/formatters/tanks/format-level-for"

interface Props {
  level: number
  className?: string
  isAuxillaryTank?: boolean
  orientation?: "vertical" | "horizontal"
}

export const ValueWithPercentage: FC<Props> = ({ level, className, isAuxillaryTank, orientation = "vertical" }) => {
  const reverse = false
  const isCritical = reverse ? level < 25 : level > 75
  const value = isAuxillaryTank ? "--" : formatLevelFor(level)

  const classes = classnames("tank-level min-w-[70px]", className, {
    "text-victron-red": isCritical,
    "ml-2 md:ml-5 text-end": orientation === 'vertical'
  })

  const unitClasses = classnames("ml-0.5", {
    "text-victron-red/70": isCritical,
    "text-victron-gray/70": !isCritical || isAuxillaryTank
  })

  return (
    <div className={classes}>
      {value}
      <span className={unitClasses}>%</span>
    </div>
  )
}
