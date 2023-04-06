import { observer } from "mobx-react-lite"
import GeneratorIcon from "../../../images/icons/generator.svg"
import { translate } from "react-i18nify"
import { useActiveInValues } from "@elninotech/mfd-modules"
import ValueBox from "../../ui/ValueBox"
import AutoStartStopSetter from "../../ui/AutoStartStopSetter/AutoStartStopSetter"
import { RELAY_FUNCTION } from "../../../utils/constants"
import ValueOverview from "../../ui/ValueOverview"

const GeneratorRelay = ({
  statusCode,
  active,
  phases = 1,
  manualStart,
  autoStart,
  relayFunction,
  updateManualMode,
  updateAutoMode,
  mode = "compact",
  compactBoxSize,
}: Props) => {
  const getGeneratorState = (statusCode: number, active: boolean, phases: number) => {
    if (active) {
      return phases > 1 ? translate("common.nrOfPhases", { phases }) : translate("common.running")
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
  const powerSum = active
    ? power.reduce((sum: number, b) => {
        return b ? sum + b : sum
      }, 0)
    : 0
  const unit = powerSum > 1000 ? "kW" : "W"

  const phasesOverview = []
  for (let phase = 0; phase < phases; phase++) {
    phasesOverview.push([
      { value: voltage[phase], unit: "V" },
      { value: current[phase], unit: "A" },
      { value: power[phase], unit: "W" },
    ])
  }

  if (mode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={GeneratorIcon}
        title={title}
        subtitle={subTitle}
        value={powerSum}
        unit={unit}
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
          className={"w-7"}
        ></GeneratorIcon>
      }
      title={title}
      buttons={
        relayFunction === RELAY_FUNCTION.GENERATOR_START_STOP && statusCode !== undefined ? (
          <AutoStartStopSetter
            autoStart={autoStart}
            isAutoStartDisabled={false}
            updateAutoMode={updateAutoMode}
            updateManualMode={updateManualMode}
            manualStart={manualStart}
          />
        ) : undefined
      }
      unit={phases > 1 ? "W" : "A"}
      value={phases > 1 ? powerSum : current[0]}
      bottomValues={phasesOverview}
    >
      {subTitle}
    </ValueBox>
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
  mode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default observer(GeneratorRelay)
