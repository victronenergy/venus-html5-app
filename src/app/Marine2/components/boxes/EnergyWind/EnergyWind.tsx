import React from "react"
import WindIcon from "../../../images/icons/wind.svg"
import { useWindGenerator } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"

const EnergyWind = ({ componentMode = "compact", windGenerator, showInstance, compactBoxSize }: Props) => {
  const { current, voltage } = useWindGenerator(windGenerator)

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={WindIcon}
        title={translate("boxes.windGenerator")}
        value={current}
        unit="A"
        boxSize={compactBoxSize}
      />
    )
  }

  const power = current * voltage
  const instance = showInstance ? ` [${windGenerator}]` : ""

  return (
    <ValueBox
      title={translate("boxes.windGenerator") + instance}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<WindIcon className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]" />}
      value={current}
      unit="A"
      bottomValues={[[{ value: power, unit: "W", hideDecimal: true }]]}
    />
  )
}

interface Props {
  windGenerator: number
  showInstance: boolean
  componentMode?: ComponentMode
  compactBoxSize?: { width: number; height: number }
}

export default observer(EnergyWind)
