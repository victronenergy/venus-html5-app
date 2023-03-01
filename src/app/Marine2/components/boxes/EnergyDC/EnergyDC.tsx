import { DcLoadsState } from "@elninotech/mfd-modules"
import DCIcon from "../../../images/icons/dc.svg"
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

const EnergyDC = ({ mode = "compact", dcLoads, compactBoxSize }: Props) => {
  const { power, voltage, current } = dcLoads

  let compactActiveStyles: StylesType = {}
  if (compactBoxSize) {
    compactActiveStyles = applyStyles(compactBoxSize, compactStyles)
  }
  if (isNaN(power) || isNaN(voltage)) {
    return <></>
  }

  if (mode === "compact") {
    return (
      <div className={classNames("flex flex-row justify-between items-center", compactActiveStyles?.name)}>
        <div className="flex items-center">
          {/* todo: fix types for svg */}
          {/* @ts-ignore */}
          <DCIcon className={"w-7 text-black dark:text-white"} />
          <p className={classNames(compactActiveStyles?.namePadding)}>{translate("boxes.dcLoads")}</p>
        </div>
        <p className={classNames(compactActiveStyles?.value)}>
          {formatValue(power / voltage)}
          <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
        </p>
      </div>
    )
  }

  return (
    <ValueBox
      title={translate("boxes.dcLoads")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<DCIcon className={"w-5"} />}
      value={current}
      unit={"A"}
      bottomValues={[[{ value: power, unit: "W" }]]}
    />
  )
}

interface Props {
  dcLoads: DcLoadsState
  mode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default EnergyDC
