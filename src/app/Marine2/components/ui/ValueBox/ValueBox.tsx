import Box from "../Box"
import classNames from "classnames"
import { FC, ReactElement, useState } from "react"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import { ValueWithUnit } from "@m2Types/data/value-with-units"
import { BottomValues } from "./BottomValues/BottomValues"
import { Heading } from "./Heading/Heading"
import { unit } from "@m2Types/data/unit"
import { ISize } from "@m2Types/generic/size"
import { TStatus } from "@m2Types/data/status"
import { translate } from "react-i18nify"

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
  status?: TStatus
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
  status,
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
            status={status}
          />
          {status === "unplugged" && (
            <div className={classNames("text-victron-gray-300 dark:text-victron-gray-500", activeStyles.valueSubtitle)}>
              {translate("common.unplugged")}
            </div>
          )}
          <div className={classNames("text-victron-gray dark:text-victron-gray-500", activeStyles.valueSubtitle)}>
            {children}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <BottomValues
            values={bottomValues}
            className={classNames("overflow-hidden", activeStyles.secondaryValue)}
            status={status}
          />
          {!!buttons && <div className="flex w-full">{buttons}</div>}
        </div>
      </div>
    </Box>
  )
}

export default ValueBox
