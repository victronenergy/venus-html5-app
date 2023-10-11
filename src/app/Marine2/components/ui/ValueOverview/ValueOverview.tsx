import { ComponentType } from "react"
import classNames from "classnames"
import { applyStyles } from "../../../utils/media"
import FadedText from "../FadedText"
import { ValueWithUnit } from "../ValueWithUnit/ValueWithUnit"
import { unit } from "@m2Types/data/unit"
import { valueType } from "@m2Types/data/value-type"
import { TStatus } from "@m2Types/data/status"
import { Styles } from "./Styles"
import { ISize } from "@m2Types/generic/size"
import { observer } from "mobx-react"

interface Props {
  Icon: ComponentType<{ className: string }>
  valueType?: valueType
  title: string
  subtitle?: string
  value?: number
  unit?: unit
  boxSize: ISize
  status?: TStatus
}

const ValueOverview = ({ title, subtitle, Icon, value, unit, boxSize, valueType, status }: Props) => {
  const {
    smallIcon,
    icon,
    title: titleStyle,
    subtitle: subtitleStyle,
    value: valueStyle,
  } = applyStyles(boxSize, Styles)

  const iconStyles = valueType === "environment" ? smallIcon : icon
  const classes = classNames("flex justify-between items-center", {
    "h-14": subtitle,
    "h-12": !subtitle,
  })

  return (
    <div className={classes}>
      <div className="flex items-center min-w-0">
        {/* @ts-ignore */}
        <Icon className={iconStyles} />
        <div className="px-2 min-w-0 flex flex-col">
          <FadedText className={classNames("pr-8 text-victron-gray-200 dark:text-white", titleStyle)} text={title} />
          {subtitle && (
            <FadedText
              className={classNames("text-victron-gray pr-2 dark:text-victron-gray-500", subtitleStyle)}
              text={subtitle}
            />
          )}
        </div>
      </div>
      <ValueWithUnit value={value} unit={unit} className={classNames(valueStyle)} status={status} />
    </div>
  )
}

export default observer(ValueOverview)
