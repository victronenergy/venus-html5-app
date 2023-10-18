import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import { useActiveInValues } from "@victronenergy/mfd-modules"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import AutoStartStopSetter from "../../ui/AutoStartStopSetter/AutoStartStopSetter"
import { phaseUnitFor } from "../../../utils/formatters/phase/phase-unit-for"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"
import GeneratorIcon from "../../../images/icons/generator.svg"
import { usePhasesData } from "../../../utils/hooks/use-phases-data"
import { phaseValueFor } from "../../../utils/formatters/phase/phase-value-for"
import { generatorStateFor } from "../../../utils/formatters/devices/generator-relay/generator-state-for"

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
  compactBoxSize?: ISize
}

const GeneratorRelay = ({
  statusCode,
  active,
  manualStart,
  phases = 1,
  autoStart,
  updateManualMode,
  updateAutoMode,
  componentMode = "compact",
  compactBoxSize,
}: Props) => {
  const title = translate("widgets.generator")
  const subTitle = generatorStateFor(statusCode, active, phases)

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
        /* todo: fix types for svg */
        /* @ts-ignore */
        <GeneratorIcon className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]" />
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

export default observer(GeneratorRelay)
