import React from "react"
import WindIcon from "../../../images/icons/wind.svg"
import { useWindGenerator } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { responsiveBoxIcon } from "../../../utils/helpers/classes/responsive-box-icon"
import { ISize } from "@m2Types/generic/size"

interface Props {
  windGenerator: number
  showInstance: boolean
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const EnergyWind = ({ componentMode = "compact", windGenerator, showInstance, compactBoxSize }: Props) => {
  const { current, voltage } = useWindGenerator(windGenerator)

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
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
      icon={<WindIcon className={responsiveBoxIcon} />}
      value={current}
      unit="A"
      bottomValues={[[{ value: power, unit: "W", hideDecimal: true }]]}
    />
  )
}

export default observer(EnergyWind)
