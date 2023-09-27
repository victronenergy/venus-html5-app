import { useAcLoads } from "@victronenergy/mfd-modules"
import ACIcon from "../../../images/icons/ac.svg"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { phaseUnitFor } from "../../../utils/formatters/phase/phase-unit-for"
import { phaseValueFor } from "../../../utils/formatters/phase/phase-value-for"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"
import { usePhasesData } from "../../../utils/hooks/use-phases-data"

interface Props {
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const EnergyAC = ({ componentMode = "compact", compactBoxSize }: Props) => {
  const { current, power, phases, voltage } = useAcLoads()
  const phasesData = usePhasesData(phases, voltage, current, power)

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
      bottomValues={phasesData}
    />
  )
}

export default EnergyAC
