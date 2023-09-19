import React from "react"
import classNames from "classnames"
import { applyStyles, BreakpointStylesType } from "../../../utils/media"
import FadedText from "../FadedText"
import { ValueWithUnit } from "../ValueWithUnit/ValueWithUnit"
import { unit } from "@m2Types/generic/unit"
import { valueType } from "@m2Types/generic/value-type"

interface Props {
  Icon: React.ComponentType<{ className: string }>
  valueType?: valueType
  title: string
  subtitle?: string
  value?: number
  inputLimitValue?: JSX.Element
  unit?: unit
  boxSize: { width: number; height: number }
}

const styles: BreakpointStylesType = {
  default: {
    value: "text-base",
    title: "text-sm",
    subtitle: "text-xs pb-1",
    icon: "w-[18px] text-victron-gray-200 dark:text-white",
    smallIcon: "min-w-3 w-3 text-victron-gray-200 dark:text-white",
  },
  "sm-s": {
    value: "text-lg",
    title: "text-sm",
    subtitle: "text-sm pb-1",
    icon: "w-[24px] text-victron-gray-200 dark:text-white",
    smallIcon: "min-w-5 w-5 text-victron-gray-200 dark:text-white",
  },
  "sm-m": {
    value: "text-lg",
    title: "text-base",
    subtitle: "text-sm pb-1",
    icon: "w-[32px] text-victron-gray-200 dark:text-white",
    smallIcon: "min-w-5 w-5 text-victron-gray-200 dark:text-white",
  },
  "md-s": {
    value: "text-lg",
    title: "text-base",
    subtitle: "text-sm pb-1",
    icon: "w-[32px] text-victron-gray-200 dark:text-white",
    smallIcon: "min-w-5 w-5 text-victron-gray-200 dark:text-white",
  },
  "md-l": {
    value: "text-lg",
    title: "text-lg",
    subtitle: "text-sm pb-1",
    icon: "w-[32px] text-victron-gray-200 dark:text-white",
    smallIcon: "min-w-5 w-5 text-victron-gray-200 dark:text-white",
  },
}

const ValueOverview = ({ title, subtitle, Icon, value, unit, boxSize, valueType, inputLimitValue }: Props) => {
  const activeStyles = applyStyles(boxSize, styles)
  const iconStyles = valueType === "environment" ? activeStyles.smallIcon : activeStyles.icon
  const classes = classNames("flex justify-between items-center", {
    "h-14": subtitle,
    "h-12": !subtitle,
  })

  return (
    <div className={classes}>
      <div className="flex items-center min-w-0">
        {/* @ts-ignore */}
        <Icon className={iconStyles} />
        <div className={"px-2 min-w-0 flex flex-col"}>
          <FadedText
            className={classNames("pr-8 text-victron-gray-200 dark:text-white", activeStyles.title)}
            text={title}
          />
          {subtitle && (
            <FadedText
              className={classNames("text-victron-gray pr-2 dark:text-victron-gray-500", activeStyles.subtitle)}
              text={subtitle}
            />
          )}
        </div>
      </div>
      <ValueWithUnit
        value={value}
        unit={unit}
        inputLimitValue={inputLimitValue}
        className={classNames(activeStyles.value)}
      />
    </div>
  )
}

export default ValueOverview
