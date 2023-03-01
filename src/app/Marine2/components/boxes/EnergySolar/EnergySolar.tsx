import { PvChargerState } from "@elninotech/mfd-modules"
import SolarIcon from "../../../images/icons/solar.svg"
import { formatValue } from "../../../utils/formatters"
import { translate } from "react-i18nify"
import { applyStyles, BreakpointStylesType, StylesType } from "app/Marine2/utils/media"
import classNames from "classnames"
import ValueBox from "../../ui/ValueBox"

const compactStyles: BreakpointStylesType = {
  "sm-s": {
    name: "text-sm",
    value: "text-base",
    namePadding: "pl-2",
  },
  "md-s": {
    name: "text-base",
    value: "text-lg",
    namePadding: "pl-3",
  },
}

const EnergySolar = ({ mode = "compact", pvCharger, compactBoxSize }: Props) => {
  const { current, power } = pvCharger

  let compactActiveStyles: StylesType = {}
  if (compactBoxSize) {
    compactActiveStyles = applyStyles(compactBoxSize, compactStyles)
  }
  if (mode === "compact") {
    return (
      <div className={classNames("flex flex-row justify-between items-center", compactActiveStyles?.name)}>
        <div className="flex items-center">
          {/* todo: fix types for svg */}
          {/* @ts-ignore */}
          <SolarIcon className={"w-7 text-black dark:text-white"} />
          <p className={classNames(compactActiveStyles?.namePadding)}>{translate("boxes.solar")}</p>
        </div>
        <p className={classNames(compactActiveStyles?.value)}>
          {formatValue(current)}
          <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
        </p>
      </div>
    )
  }

  return (
    <ValueBox
      title={translate("boxes.solar")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<SolarIcon className={"w-5"} />}
      bottomValues={[[{ value: power, unit: "W" }]]}
      value={current}
      unit={"A"}
    />
  )
}

interface Props {
  pvCharger: PvChargerState
  mode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default EnergySolar
