import React from "react"
import { useActiveInValues, useActiveSource } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import ShorePowerIcon from "../../../images/icons/shore-power.svg"
import { formatValue, formatPower } from "../../../utils/formatters"
import { translate } from "react-i18nify"
import { applyStyles, BreakpointStylesType, StylesType } from "app/Marine2/utils/media"
import classNames from "classnames"
import ValueBox from "../../ui/ValueBox"

const compactStyles: BreakpointStylesType = {
  "sm-s": {
    name: "text-sm",
    namePadding: "pl-2",
    description: "text-xs",
    value: "text-base",
  },
  "md-s": {
    name: "text-base",
    namePadding: "pl-3",
    description: "text-sm",
    value: "text-lg",
  },
}

const EnergyShore = ({ mode = "compact", inputId, compactBoxSize }: Props) => {
  const { current, power, voltage } = useActiveInValues()
  const { activeInput, phases } = useActiveSource()
  const unplugged = activeInput + 1 !== inputId // Active in = 0 -> AC1 is active
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
      <div className={classNames("flex items-center justify-between", compactActiveStyles?.name)}>
        <div className="flex items-center">
          <ShorePowerIcon
            /* todo: fix types for svg */
            /* @ts-ignore */
            className={"w-7 text-black dark:text-white"}
          />
          <div className={classNames("flex flex-col", compactActiveStyles?.namePadding)}>
            <p>{translate("boxes.shorePower")}</p>
            {unplugged && (
              <small
                className={classNames(
                  "text-victron-gray dark:text-victron-gray-dark",
                  compactActiveStyles?.description
                )}
              >
                {translate("common.unplugged")}
              </small>
            )}
          </div>
        </div>
        {!unplugged ? (
          (phases ?? 1) === 1 ? (
            <p className={classNames(compactActiveStyles?.value)}>
              {formatValue(current[0])}
              <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
            </p>
          ) : (
            <p className={classNames(compactActiveStyles?.value)}>
              {formatPower(totalPower)}
              <span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">W</span>
            </p>
          )
        ) : (
          <div className={classNames(compactActiveStyles?.value)}>
            <p className="hidden md:block">{translate("common.unplugged")}</p>
            <p className="md:hidden">
              --<span className="p-0.5 text-victron-gray dark:text-victron-gray-dark">A</span>
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <ValueBox
      title={translate("boxes.shorePower")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<ShorePowerIcon className={"w-5"} />}
      value={(phases ?? 1) === 1 ? current[0] : totalPower}
      unit={(phases ?? 1) === 1 ? "A" : "W"}
      bottomValues={phasesOverview}
    >
      <div>{unplugged && translate("common.unplugged")}</div>
    </ValueBox>
  )
}

interface Props {
  inputId: number
  mode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default observer(EnergyShore)
