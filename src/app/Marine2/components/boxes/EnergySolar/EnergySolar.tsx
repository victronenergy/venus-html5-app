import React from "react"
import { PvChargerState } from "@victronenergy/mfd-modules"
import SolarIcon from "../../../images/icons/solar.svg"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"

const EnergySolar = ({ componentMode = "compact", pvCharger, compactBoxSize }: Props) => {
  const { current, power } = pvCharger

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={SolarIcon}
        title={translate("boxes.solar")}
        value={current}
        unit="A"
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.solar")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<SolarIcon className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]" />}
      bottomValues={[[{ value: power, unit: "W", hideDecimal: true }]]}
      value={current}
      unit="A"
    />
  )
}

interface Props {
  pvCharger: PvChargerState
  componentMode?: ComponentMode
  compactBoxSize?: { width: number; height: number }
}

export default EnergySolar
