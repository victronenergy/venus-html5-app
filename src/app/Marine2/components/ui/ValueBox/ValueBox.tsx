import Box from "../Box"
import classNames from "classnames"
import { useState } from "react"
import { applyStyles, BreakpointStylesType } from "../../../utils/media"
import ValueBar from "../ValueBar"
import { formatValue } from "../../../utils/formatters"

const styles: BreakpointStylesType = {
  default: {
    value: "text-2xl",
    valueSubtitle: "text-base",
    valueBar: "text-sm",
    valueBars: "text-sm",
  },
  "sm-s": {
    value: "text-3xl",
    valueSubtitle: "text-lg",
    valueBar: "text-sm",
    valueBars: "text-sm",
  },
  "md-s": {
    value: "text-3xl",
    valueSubtitle: "text-lg",
    valueBar: "text-lg",
    valueBars: "text-lg",
  },
  "md-m": {
    value: "text-4xl",
    valueSubtitle: "text-xl",
    valueBar: "text-xl",
    valueBars: "text-lg",
  },
}

const ValueBox = ({ title, icon, value, unit, bottomValues, children }: Props) => {
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const activeStyles = applyStyles(boxSize, styles)
  const isMultiPhase = bottomValues.length > 1

  if (unit === "W" && value && value > 1000) {
    unit = "kW"
    value = value ? value / 1000 : value
  }

  return (
    <Box title={title} icon={icon} getBoxSizeCallback={setBoxSize}>
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <div className={classNames("text-victron-darkGray dark:text-white", activeStyles?.value)}>
            {formatValue(value)}
            <span className={"pl-0.5 text-victron-gray dark:text-victron-gray-500"}>{unit}</span>
          </div>
          <div className={classNames("text-victron-gray dark:text-victron-gray-500", activeStyles.valueSubtitle)}>
            {children}
          </div>
        </div>
        <div className={classNames("-mb-1", activeStyles.valueBars)}>
          {bottomValues.map((v, i) => (
            <ValueBar key={i} prefix={isMultiPhase ? "L" + (i + 1) : undefined} values={v} />
          ))}
        </div>
      </div>
    </Box>
  )
}

interface Props {
  icon?: JSX.Element
  title: string
  value?: number
  unit: string
  bottomValues: ValueWithUnit[][]
  children?: JSX.Element | JSX.Element[]
}

interface ValueWithUnit {
  value?: number
  unit: string
}

export default ValueBox
