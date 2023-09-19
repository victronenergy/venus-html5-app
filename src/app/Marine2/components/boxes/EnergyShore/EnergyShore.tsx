import React from "react"
import { useActiveInValues, useActiveSource } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react-lite"
import ShorePowerIcon from "../../../images/icons/shore-power.svg"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { isMultiPhaseFor } from "../../../utils/helpers/is-multi-phase-for"
import { phaseUnitFor } from "../../../utils/formatters/phase-unit-for"
import { phaseValueFor } from "../../../utils/formatters/phase-value-for"

const EnergyShore = ({ mode = "compact", inputId, compactBoxSize }: Props) => {
  const { current, power, voltage } = useActiveInValues()
  const { activeInput, phases } = useActiveSource()
  const unplugged = activeInput + 1 !== inputId // Active in = 0 -> AC1 is active

  const phasesOverview = []
  for (let phase = 0; phase < phases; phase++) {
    phasesOverview.push([
      { value: !unplugged ? voltage[phase] : undefined, unit: "V", hideDecimal: true },
      { value: !unplugged ? current[phase] : undefined, unit: "A" },
      { value: !unplugged ? power[phase] : undefined, unit: "W", hideDecimal: true },
    ])
  }

  if (mode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={ShorePowerIcon}
        title={translate("boxes.shorePower")}
        subtitle={unplugged ? translate("common.unplugged") : undefined}
        value={phaseValueFor(phases, current, power)}
        unit={phaseUnitFor(phases)}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.shorePower")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<ShorePowerIcon className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]" />}
      value={!unplugged ? phaseValueFor(phases, current, power) : undefined}
      unit={phaseUnitFor(phases)}
      bottomValues={phasesOverview}
      hideDecimal={isMultiPhaseFor(phases)}
      valueSubtitle={unplugged ? translate("common.unplugged") : undefined}
    />
  )
}

interface Props {
  inputId: number
  mode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default observer(EnergyShore)
