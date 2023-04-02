import classNames from "classnames"
import { applyStyles, BreakpointStylesType } from "../../../utils/media"
import { formatValue } from "../../../utils/formatters"
import React from "react"
import FadedText from "../FadedText"

const styles: BreakpointStylesType = {
  default: {
    value: "text-base",
    title: "text-sm",
    subtitle: "text-xs",
    icon: "min-w-5 w-5",
    smallIcon: "min-w-3 w-3",
  },
  "md-s": {
    value: "text-lg",
    title: "text-base",
    subtitle: "text-sm",
    icon: "min-w-7 w-7",
    smallIcon: "min-w-5 w-5",
  },
}

const ValueOverview = ({ title, subtitle, Icon, value, unit, boxSize, valueType }: Props) => {
  const activeStyles = applyStyles(boxSize, styles)
  const iconStyles = valueType === "environment" ? activeStyles.smallIcon : activeStyles.icon
  if (unit === "W" && value && value > 1000) {
    unit = "kW"
    value = value ? value / 1000 : value
  }

  return (
    <div className={classNames("flex justify-between items-center h-11")}>
      <div className="flex items-center min-w-0">
        {/* @ts-ignore */}
        {<Icon className={iconStyles} />}
        <div className={"px-2 min-w-0 flex flex-col"}>
          <FadedText className={classNames("pr-8", activeStyles.title)} text={title} />
          {subtitle && (
            <FadedText
              className={classNames("text-victron-gray dark:text-victron-gray-500", activeStyles.subtitle)}
              text={subtitle}
            />
          )}
        </div>
      </div>
      <span className={classNames(activeStyles.value)}>
        {formatValue(value)}
        <span className="text-victron-gray dark:text-victron-gray-500">{unit}</span>
      </span>
    </div>
  )
}

interface Props {
  Icon: React.ComponentType<{ className: string }>
  valueType?: string
  title: string
  subtitle?: string
  value?: number
  unit: string
  boxSize: { width: number; height: number }
}

export default ValueOverview
