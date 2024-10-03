import React from "react"
import { PvChargerState, useAppStore } from "@victronenergy/mfd-modules"
import SolarIcon from "../../../images/icons/solar.svg"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { responsiveBoxIcon } from "../../../utils/helpers/classes/responsive-box-icon"
import { ISize } from "@m2Types/generic/size"
import { unitFor } from "app/Marine2/utils/formatters/phase/phase-unit-for"
import { valueFor } from "app/Marine2/utils/formatters/phase/phase-value-for"
import { observer } from "mobx-react"

const EnergySolar = ({ componentMode = "compact", pvCharger, compactBoxSize }: Props) => {
  const { electricalPowerIndicator } = useAppStore()
  const { current, power } = pvCharger

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        Icon={SolarIcon}
        title={translate("boxes.solar")}
        value={valueFor(current, power, electricalPowerIndicator)}
        unit={unitFor(electricalPowerIndicator)}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.solar")}
      icon={<SolarIcon className={responsiveBoxIcon} />}
      bottomValues={[
        [
          { value: current, unit: "A", hideDecimal: true },
          { value: power, unit: "W", hideDecimal: true },
        ],
      ]}
      value={valueFor(current, power, electricalPowerIndicator)}
      unit={unitFor(electricalPowerIndicator)}
    />
  )
}

interface Props {
  pvCharger: PvChargerState
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

export default observer(EnergySolar)
