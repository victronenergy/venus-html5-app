import type { FC } from "react"
import classnames from "classnames"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"
import { formatLevelFor } from "../../../../../utils/formatters/devices/tanks/format-level-for"
import { isReversedLevelFor } from "../../../../../utils/helpers/devices/tanks/is-reversed-level-for"

interface Props {
  fluid: number
  level: number
  className?: string
  isAuxillaryTank?: boolean
  orientation?: ScreenOrientation
}

export const ValueWithPercentage: FC<Props> = ({
  fluid,
  level,
  className,
  isAuxillaryTank,
  orientation = "vertical",
}) => {
  const isCritical = isReversedLevelFor(fluid) ? level > 75 : level < 25
  const value = isAuxillaryTank ? "--" : formatLevelFor(level)

  const classes = classnames(className, {
    "text-victron-red": isCritical,
    "text-end": orientation === "vertical",
  })

  const unitClasses = classnames({
    "text-victron-red/70": isCritical,
    "text-victron-gray/70": !isCritical || isAuxillaryTank,
  })

  return (
    <div className={classes}>
      {value}
      <span className={unitClasses}>%</span>
    </div>
  )
}
