import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import { GeneratorFpProvider, useGensetValues } from "@victronenergy/mfd-modules"
import { ComponentMode } from "@m2Types/generic/component-mode"
import GeneratorIcon from "../../../images/icons/generator.svg"
import AutoStartStopSetter from "../../ui/AutoStartStopSetter"
import ValueOverview from "../../ui/ValueOverview"
import ValueBox from "../../ui/ValueBox"
import { GENSET_STATE } from "../../../utils/constants"
import { usePhasesData } from "../../../utils/hooks/use-phases-data"
import { phaseValueFor } from "../../../utils/formatters/phase/phase-value-for"
import { phaseUnitFor } from "../../../utils/formatters/phase/phase-unit-for"
import { AdditionalInformation } from "./AdditionalInformation/AdditionalInformation"
import { ISize } from "@m2Types/generic/size"

const GeneratorFp = ({ componentMode = "compact", generatorFp, compactBoxSize }: Props) => {
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

  const { productName, phases, statusCode, gensetAutoStart, autoStart, updateAutoMode, updateManualMode } = generatorFp
  const gensetValues = useGensetValues()
  const { voltage, current, power, coolant, winding, exhaust } = gensetValues
  // When a topic is invalid, it returns undefined -> no value means topic is not supported
  const title = productName || "Genset"
  const subTitle = !!statusCode || statusCode === 0 ? gensetStateFormatter(Number(statusCode)) : undefined
  const isAutoStartDisabled = gensetAutoStart === 0

  const phasesData = usePhasesData(phases, voltage as number[], current as number[], power as number[])
  const status = statusCode === 8 || statusCode === 9 ? "active" : "inactive"

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={GeneratorIcon}
        title={title}
        subtitle={subTitle}
        value={phaseValueFor(phases, current as number[], power as number[])}
        unit={phaseUnitFor(phases)}
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

  return (
    <ValueBox
      title={title}
      subtitle={subTitle}
      bottomValues={!!gensetValues && phasesData}
      status={status}
      infoText={infoText}
      icon={
        /* todo: fix types for svg */
        /* @ts-ignore */
        <GeneratorIcon className="w-7" />
      }
      buttons={
        <AutoStartStopSetter
          title={title}
          autoStart={autoStart}
          isAutoStartDisabled={isAutoStartDisabled}
          updateAutoMode={updateAutoMode}
          updateManualMode={updateManualMode}
          statusCode={statusCode}
        />
      }
    >
      <AdditionalInformation
        values={[
          { key: "coolant", value: coolant },
          { key: "winding", value: winding },
          { key: "exhaust", value: exhaust },
        ]}
      />
    </ValueBox>
  )
}

interface Props {
  componentMode?: ComponentMode
  generatorFp: GeneratorFpProvider
  compactBoxSize?: ISize
}

export default observer(GeneratorFp)
