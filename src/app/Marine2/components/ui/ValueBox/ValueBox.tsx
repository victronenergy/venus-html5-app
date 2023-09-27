import Box from "../Box"
import classNames from "classnames"
import { FC, ReactElement, useState } from "react"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import { ValueWithUnit } from "@m2Types/generic/value-with-units"
import { BottomValues } from "./BottomValues/BottomValues"
import { Heading } from "./Heading/Heading"
import { unit } from "@m2Types/generic/unit"
import { ISize } from "@m2Types/generic/size"

interface Props {
  icon?: ReactElement<string>
  title: string
  subtitle?: string
  value?: number
  unit?: unit
  bottomValues: ValueWithUnit[][]
  children?: JSX.Element | JSX.Element[] | string
  buttons?: JSX.Element | JSX.Element[]
  infoText?: { title: string; body: string }
  valueSubtitle?: string
}

const ValueBox: FC<Props> = ({
  title,
  subtitle,
  icon,
  value,
  unit,
  bottomValues,
  children,
  buttons,
  infoText,
  valueSubtitle,
}) => {
  const [boxSize, setBoxSize] = useState<ISize>({ width: 0, height: 0 })
  const activeStyles = applyStyles(boxSize, defaultBoxStyles)
  return (
    <Box title={title} icon={icon} getBoxSizeCallback={setBoxSize} infoText={infoText}>
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full">
          <Heading
            value={value}
            unit={unit}
            subtitle={subtitle}
            className={classNames("text-black dark:text-white", activeStyles?.mainValue)}
          />
          {valueSubtitle && (
            <div className={classNames("text-victron-gray-300 dark:text-victron-gray-500", activeStyles.valueSubtitle)}>
              {valueSubtitle}
            </div>
          )}
          <div className={classNames("text-victron-gray dark:text-victron-gray-500", activeStyles.valueSubtitle)}>
            {children}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <BottomValues values={bottomValues} className={classNames("overflow-hidden", activeStyles.secondaryValue)} />
          {!!buttons && <div className="flex w-full">{buttons}</div>}
        </div>
      </div>
    </Box>
  )
}

export default ValueBox
