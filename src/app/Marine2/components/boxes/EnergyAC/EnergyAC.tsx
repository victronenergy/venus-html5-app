import React from "react"
import { AcLoadsState } from "@victronenergy/mfd-modules"
import ACIcon from "../../../images/icons/ac.svg"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { isMultiPhaseFor } from "../../../utils/helpers/is-multi-phase-for"
import { phaseUnitFor } from "../../../utils/formatters/phase-unit-for"
import { phaseValueFor } from "../../../utils/formatters/phase-value-for"

const EnergyAC = ({ mode = "compact", acLoads, compactBoxSize }: Props) => {
  const { current, power, phases, voltage } = acLoads

  if (mode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={ACIcon}
        title={translate("boxes.acLoads")}
        value={phaseValueFor(phases, current, power)}
        unit={phaseUnitFor(phases)}
        boxSize={compactBoxSize}
      />
    )
  }

  const phasesOverview = []
  for (let phase = 0; phase < phases; phase++) {
    phasesOverview.push([
      { value: voltage[phase], unit: "V", hideDecimal: true },
      { value: current[phase], unit: "A" },
      { value: power[phase], unit: "W", hideDecimal: true },
    ])
  }

  return (
    <ValueBox
      title={translate("boxes.acLoads")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<ACIcon className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]" />}
      value={phaseValueFor(phases, current, power)}
      unit={phaseUnitFor(phases)}
      bottomValues={phasesOverview}
      hideDecimal={isMultiPhaseFor(phases)}
    />
  )
}

interface Props {
  acLoads: AcLoadsState
  mode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default EnergyAC
