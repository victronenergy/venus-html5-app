import React from "react"
import { AcLoadsState } from "@elninotech/mfd-modules"
import ACIcon from "../../../images/icons/ac.svg"
import { formatPower, formatValue } from "../../../utils/formatters"
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

const EnergyAC = ({ mode = "compact", acLoads, compactBoxSize }: Props) => {
  const { current, power, phases, voltage } = acLoads

  const totalPower = power.reduce((total, power) => (power ? total + power : total))

  let compactActiveStyles: StylesType = {}
  if (compactBoxSize) {
    compactActiveStyles = applyStyles(compactBoxSize, compactStyles)
  }

  const phasesOverview = []
  for (let phase = 0; phase < phases; phase++) {
    phasesOverview.push([
      { value: voltage[phase], unit: "V" },
      { value: current[phase], unit: "A" },
      { value: power[phase], unit: "W" },
    ])
  }

  if (mode === "compact") {
    return (
      <div className={classNames("flex flex-row justify-between items-center", compactActiveStyles?.name)}>
        <div className="flex items-center">
          {/* todo: fix types for svg */}
          {/* @ts-ignore */}
          <ACIcon className={"w-7 text-black dark:text-white"} />
          <p className={classNames(compactActiveStyles?.namePadding)}>{translate("boxes.acLoads")}</p>
        </div>
        <div>
          {(phases ?? 1) === 1 && (
            <p className={classNames(compactActiveStyles?.value)}>
              {formatValue(current[0])}
              <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
            </p>
          )}
          {(phases ?? 1) !== 1 && (
            <p className={classNames(compactActiveStyles?.value)}>
              {formatPower(totalPower)}
              <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">
                {totalPower > 1000 ? "kW" : "W"}
              </span>
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <ValueBox
      title={translate("boxes.acLoads")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<ACIcon className={"w-5"} />}
      value={(phases ?? 1) === 1 ? current[0] : totalPower}
      unit={(phases ?? 1) === 1 ? "A" : "W"}
      bottomValues={phasesOverview}
    />
  )
}

interface Props {
  acLoads: AcLoadsState
  mode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default EnergyAC
