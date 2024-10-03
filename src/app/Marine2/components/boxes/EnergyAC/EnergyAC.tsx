import { useAcLoads, useAppStore } from "@victronenergy/mfd-modules"
import ACIcon from "../../../images/icons/ac.svg"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { phaseUnitFor } from "../../../utils/formatters/phase/phase-unit-for"
import { phaseValueFor } from "../../../utils/formatters/phase/phase-value-for"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"
import { usePhasesData } from "../../../utils/hooks/use-phases-data"
import { responsiveBoxIcon } from "../../../utils/helpers/classes/responsive-box-icon"
import { observer } from "mobx-react"

interface Props {
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const EnergyAC = ({ componentMode = "compact", compactBoxSize }: Props) => {
  const { electricalPowerIndicator } = useAppStore()
  const { current, power, phases, voltage } = useAcLoads()
  const phasesData = usePhasesData(phases, voltage, current, power)

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        Icon={ACIcon}
        title={translate("boxes.acLoads")}
        value={phaseValueFor(phases, current, power, electricalPowerIndicator)}
        unit={phaseUnitFor(phases, electricalPowerIndicator)}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.acLoads")}
      icon={<ACIcon className={responsiveBoxIcon} />}
      value={phaseValueFor(phases, current, power, electricalPowerIndicator)}
      unit={phaseUnitFor(phases, electricalPowerIndicator)}
      bottomValues={phasesData}
    />
  )
}

export default observer(EnergyAC)
