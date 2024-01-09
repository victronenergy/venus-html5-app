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
import { responsiveBoxIcon } from "../../../utils/helpers/classes/responsive-box-icon"
import { Buttons } from "../../_composed/auto-start-stop/Buttons/Buttons"


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

  if (statusCode === undefined) {
    return (
      <ValueBox
        title={title}
        subtitle={subTitle}
        status={status}
        bottomValues={active || statusCode === 1 ? phasesData : []}
        icon={<GeneratorIcon className={responsiveBoxIcon} />}
      />
    )
  }

  // temp
  return (
    <ValueBox
      title={title}
      subtitle={subTitle}
      status={status}
      bottomValues={active || statusCode === 1 ? phasesData : []}
      icon={<GeneratorIcon className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]" />}
      buttons={
        <Buttons
          title={title}
          autoStart={autoStart}
          isAutoStartDisabled={false}
          updateAutoMode={updateAutoMode}
          updateManualMode={updateManualMode}
          manualStart={manualStart}
        />
      }
    />
  )

  /*  const buttons = (
      <AutoStartStopSetter
        title={title}
        autoStart={autoStart}
        isAutoStartDisabled={false}
        updateAutoMode={updateAutoMode}
        updateManualMode={updateManualMode}
        manualStart={manualStart}
      />
    )

    return (
      <ValueBox
        title={title}
        subtitle={subTitle}
        bottomValues={active || statusCode === 1 ? phasesData : []}
        status={status}
        icon={<GeneratorIcon className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]" />}
        buttons={buttons}
      />
    )*/
}

export default observer(GeneratorRelay)
