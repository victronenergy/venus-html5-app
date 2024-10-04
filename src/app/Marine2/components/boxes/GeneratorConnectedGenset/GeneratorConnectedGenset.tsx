import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import { ConnectedGensetType, GeneratorConnectedGensetProvider, useAppStore } from "@victronenergy/mfd-modules"
import { ComponentMode } from "@m2Types/generic/component-mode"
import GeneratorIcon from "../../../images/icons/generator.svg"
import AutoStartStopSetter from "../../ui/AutoStartStopSetter"
import ValueOverview from "../../ui/ValueOverview"
import ValueBox from "../../ui/ValueBox"
import { usePhasesData } from "../../../utils/hooks/use-phases-data"
import { phaseValueFor, valueFor } from "../../../utils/formatters/phase/phase-value-for"
import { phaseUnitFor, unitFor } from "../../../utils/formatters/phase/phase-unit-for"
import { AdditionalInformation, IValue } from "./AdditionalInformation/AdditionalInformation"
import { ISize } from "@m2Types/generic/size"
import { GENSET_STATE } from "../../../utils/constants/devices/generators"

interface Props {
  componentMode?: ComponentMode
  generatorConnectedGenset: GeneratorConnectedGensetProvider
  compactBoxSize?: ISize
}

const GeneratorConnectedGenset = ({ componentMode = "compact", generatorConnectedGenset, compactBoxSize }: Props) => {
  const gensetStateFormatter = (value: number) => {
    if (value === GENSET_STATE.STANDBY) {
      return translate("common.standby")
    } else if (GENSET_STATE.STARTING.includes(value)) {
      return translate("common.standby")
    } else if (value === GENSET_STATE.RUNNING) {
      return translate("common.running")
    } else if (value === GENSET_STATE.STOPPING) {
      return translate("common.stopping")
    } else if (value === GENSET_STATE.ERROR) {
      return translate("common.error")
    } else {
      return translate("common.notAvailable")
    }
  }

  const { electricalPowerIndicator } = useAppStore()
  const { autoStartEnabled, updateAutoMode, updateManualMode, gensetState } = generatorConnectedGenset
  const { productName, customName, statusCode, remoteStartModeEnabled, coolant, winding, exhaust, heatsink } =
    gensetState

  let phases: number
  let voltage: number[]
  let current: number[]
  let power: number[]
  let value
  let unit
  if (gensetState.gensetType === ConnectedGensetType.ACGENSET) {
    phases = gensetState.phases
    voltage = gensetState.voltage as number[]
    current = gensetState.current as number[]
    power = gensetState.power as number[]
    value = phaseValueFor(
      gensetState.phases,
      gensetState.current as number[],
      gensetState.power as number[],
      electricalPowerIndicator
    )
    unit = phaseUnitFor(gensetState.phases, electricalPowerIndicator)
  } else {
    // gensetState.gensetType === ConnectedGensetType.DCGENSET)
    phases = 1
    voltage = [gensetState.voltage]
    current = [gensetState.current]
    power = [gensetState.voltage * gensetState.current]
    value = valueFor(current[0], power[0], electricalPowerIndicator)
    unit = unitFor(electricalPowerIndicator)
  }

  const phasesData = usePhasesData(phases, voltage as number[], current as number[], power as number[])

  // TODO: translate
  const title = customName || productName || "Genset"
  const subTitle = !!statusCode || statusCode === 0 ? gensetStateFormatter(Number(statusCode)) : undefined
  const isAutoStartDisabled = remoteStartModeEnabled === 0

  const status = statusCode === 8 || statusCode === 9 ? "active" : "inactive"

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        Icon={GeneratorIcon}
        title={title}
        subtitle={subTitle}
        value={value}
        unit={unit}
        boxSize={compactBoxSize}
        status={status}
      />
    )
  }

  // TODO translate?
  const infoText = isAutoStartDisabled
    ? {
        title: "Button disabled",
        body: "Enable button functionality through genset panel",
      }
    : undefined

  if (gensetState.gensetType === ConnectedGensetType.ACGENSET) {
  } else if (gensetState.gensetType === ConnectedGensetType.DCGENSET) {
  }

  return (
    <ValueBox
      title={title}
      subtitle={subTitle}
      bottomValues={phasesData}
      status={status}
      infoText={infoText}
      icon={<GeneratorIcon className="w-7" />}
      buttons={
        <AutoStartStopSetter
          title={title}
          autoStart={autoStartEnabled}
          isAutoStartDisabled={isAutoStartDisabled}
          updateAutoMode={updateAutoMode}
          updateManualMode={updateManualMode}
          statusCode={statusCode}
        />
      }
    >
      <AdditionalInformation
        values={
          [
            coolant && { label: translate("generator.temperature.coolant"), value: `${coolant}°` },
            winding && { label: translate("generator.temperature.winding"), value: `${winding}°` },
            exhaust && { label: translate("generator.temperature.exhaust"), value: `${exhaust}°` },
            heatsink && { label: translate("generator.temperature.heatsink"), value: `${heatsink}°` },
          ].filter(Boolean) as IValue[]
        }
      />
    </ValueBox>
  )
}

export default observer(GeneratorConnectedGenset)
