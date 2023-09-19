import { observer } from "mobx-react-lite"
import GeneratorIcon from "../../../images/icons/generator.svg"
import { translate } from "react-i18nify"
import { useActiveInValues } from "@victronenergy/mfd-modules"
import ValueBox from "../../ui/ValueBox"
import AutoStartStopSetter from "../../ui/AutoStartStopSetter/AutoStartStopSetter"
import ValueOverview from "../../ui/ValueOverview"
import { totalPowerFor } from "../../../utils/helpers/total-power-for"
import { phaseUnitFor } from "../../../utils/formatters/phase-unit-for"
import { isMultiPhaseFor } from "../../../utils/helpers/is-multi-phase-for"
import { ValueWithUnit } from "@m2Types/generic/value-with-units"
import { ComponentMode } from "@m2Types/generic/component-mode"

const GeneratorRelay = ({
  statusCode,
  active,
  phases = 1,
  manualStart,
  autoStart,
  updateManualMode,
  updateAutoMode,
  componentMode = "compact",
  compactBoxSize,
}: Props) => {
  const getGeneratorState = (statusCode: number, active: boolean, phases: number) => {
    if (active) {
      return isMultiPhaseFor(phases) ? translate("common.nrOfPhases", { phases }) : translate("common.running")
    }

    switch (statusCode) {
      case 1:
        return translate("common.running")
      case 10:
        return translate("common.error")
      default:
        return translate("common.stopped")
    }
  }

  const title = translate("widgets.generator")
  const subTitle = getGeneratorState(statusCode, active ?? false, phases)

  const { current, voltage, power } = useActiveInValues()

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
        Icon={GeneratorIcon}
        title={title}
        subtitle={subTitle}
        value={active ? totalPowerFor(power) : 0}
        unit="W"
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      icon={
        <GeneratorIcon
          /* todo: fix types for svg */
          /* @ts-ignore */
          className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]"
        />
      }
      title={title}
      subtitle={subTitle}
      buttons={
        statusCode !== undefined ? (
          <AutoStartStopSetter
            title={title}
            autoStart={autoStart}
            isAutoStartDisabled={false}
            updateAutoMode={updateAutoMode}
            updateManualMode={updateManualMode}
            manualStart={manualStart}
          />
        ) : undefined
      }
      unit={phaseUnitFor(phases)}
      bottomValues={active || statusCode === 1 ? phasesOverview : []}
    />
  )
}

interface Props {
  statusCode: number
  phases?: number
  manualStart: number
  autoStart: number
  relayFunction: number
  updateManualMode: Function
  updateAutoMode: Function
  active?: boolean
  componentMode?: ComponentMode
  compactBoxSize?: { width: number; height: number }
}

export default observer(GeneratorRelay)
