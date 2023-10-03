import { observer } from "mobx-react-lite"
import GeneratorIcon from "../../../images/icons/generator.svg"
import { translate } from "react-i18nify"
import { useActiveInValues } from "@victronenergy/mfd-modules"
import ValueBox from "../../ui/ValueBox"
import AutoStartStopSetter from "../../ui/AutoStartStopSetter/AutoStartStopSetter"
import ValueOverview from "../../ui/ValueOverview"
import { phaseUnitFor } from "../../../utils/formatters/phase/phase-unit-for"
import { isSinglePhaseFor } from "../../../utils/helpers/is-single-phase-for"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { usePhasesData } from "../../../utils/hooks/use-phases-data"
import { phaseValueFor } from "../../../utils/formatters/phase/phase-value-for"

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
      return isSinglePhaseFor(phases) ? translate("common.running") : translate("common.nrOfPhases", { phases })
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
  const phasesData = usePhasesData(phases, voltage, current, power)
  const status = active ? "active" : "inactive"

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={GeneratorIcon}
        title={title}
        subtitle={subTitle}
        value={phaseValueFor(phases, current, power)}
        unit={phaseUnitFor(phases)}
        boxSize={compactBoxSize}
        status={status}
      />
    )
  }

  return (
    <ValueBox
      title={title}
      subtitle={subTitle}
      bottomValues={active || statusCode === 1 ? phasesData : []}
      status={status}
      icon={
        <GeneratorIcon
          /* todo: fix types for svg */
          /* @ts-ignore */
          className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]"
        />
      }
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
