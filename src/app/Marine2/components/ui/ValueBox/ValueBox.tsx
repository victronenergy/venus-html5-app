import Box from "../Box"
import classNames from "classnames"
import { useState } from "react"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import ValueBar from "../ValueBar"
import { formatValue } from "../../../utils/formatters"

const ValueBox = ({
  title,
  icon,
  value,
  unit,
  hideDecimal,
  bottomValues,
  children,
  buttons,
  infoText,
  valueSubtitle,
}: Props) => {
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const activeStyles = applyStyles(boxSize, defaultBoxStyles)
  const isMultiPhase = bottomValues.length > 1

  if (unit === "W" && value && typeof value === "number" && value > 1000) {
    unit = "kW"
    value = value ? value / 1000 : value
  }

  return (
    <Box title={title} icon={icon} getBoxSizeCallback={setBoxSize} infoText={infoText}>
      <div className="w-full h-full flex flex-col justify-between">
        <div className={"w-full"}>
          <div className={classNames("text-black dark:text-white", activeStyles?.mainValue)}>
            {(typeof value === "number" && formatValue(value, hideDecimal && unit !== "kW" ? 0 : 1)) || value}
            {((typeof value === "number" || value === "--") && (
              <span className={"pl-0.5 text-victron-gray-400 dark:text-victron-gray-500"}>{unit}</span>
            )) ||
              ""}
          </div>
          {valueSubtitle && (
            <div className={classNames("text-victron-gray-300 dark:text-victron-gray-500", activeStyles.valueSubtitle)}>
              {valueSubtitle}
            </div>
          )}

          <div className={classNames("text-victron-gray dark:text-victron-gray-500", activeStyles.valueSubtitle)}>
            {children}
          </div>
        </div>
        <div className={"w-full flex flex-col"}>
          {bottomValues.length > 0 && (
            <div className={classNames("overflow-hidden", activeStyles.secondaryValue)}>
              {bottomValues.map((v, i) => (
                <ValueBar key={i} prefix={isMultiPhase ? "L" + (i + 1) : undefined} values={v} />
              ))}
            </div>
          )}
          {!!buttons && <div className="flex w-full">{buttons}</div>}
        </div>
      </div>
    </Box>
  )
}

interface Props {
  icon?: JSX.Element
  title: string
  value?: number | string
  unit?: string
  hideDecimal?: boolean
  bottomValues: ValueWithUnit[][]
  children?: JSX.Element | JSX.Element[] | string
  buttons?: JSX.Element | JSX.Element[]
  infoText?: { title: string; body: string }
  valueSubtitle?: string
}

interface ValueWithUnit {
  value?: number
  unit: string
  hideDecimal?: boolean
}

export default ValueBox
