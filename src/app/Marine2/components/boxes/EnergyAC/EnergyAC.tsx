import { AcLoadsState, useAcLoads } from "@victronenergy/mfd-modules"
import ACIcon from "../../../images/icons/ac.svg"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { phaseUnitFor } from "../../../utils/formatters/phase-unit-for"
import { phaseValueFor } from "../../../utils/formatters/phase-value-for"
import { ValueWithUnit } from "@m2Types/generic/value-with-units"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"

interface Props {
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const EnergyAC = ({ componentMode = "compact", compactBoxSize }: Props) => {
  const acLoads = useAcLoads()
  const { current, power, phases, voltage } = acLoads

  const phasesOverview: ValueWithUnit[][] = []
  for (let phase = 0; phase < phases; phase++) {
    phasesOverview.push([
      { value: voltage[phase], unit: "V", hideDecimal: true },
      { value: current[phase], unit: "A" },
      { value: power[phase], unit: "W", hideDecimal: true },
    ])
  }

  if (componentMode === "compact" && compactBoxSize) {
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

  return (
    <ValueBox
      title={translate("boxes.acLoads")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<ACIcon className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]" />}
      value={phaseValueFor(phases, current, power)}
      unit={phaseUnitFor(phases)}
      bottomValues={phasesOverview}
    />
  )
}

export default EnergyAC
