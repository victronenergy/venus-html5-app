import { GeneratorFpProvider, useGensetValues } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react-lite"
import GeneratorIcon from "../../../images/icons/generator.svg"
import { GENSET_STATE } from "../../../utils/constants"
import { translate } from "react-i18nify"
import Box from "../../ui/Box"
import classnames from "classnames"
import { useState } from "react"
import ValueBar from "../../ui/ValueBar"
import { applyStyles } from "../../../utils/media"
import AutoStartStopSetter from "../../ui/AutoStartStopSetter"
import ValueOverview from "../../ui/ValueOverview"
import { ValueWithUnit } from "@m2Types/generic/value-with-units"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"
import { usePhasesData } from "../../../utils/hooks/use-phases-data"
import { BottomValues } from "../../ui/ValueBox/BottomValues/BottomValues"

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

  // TODO refactor to totalPowerOf function for generic usage (single-source-of-truth).
  const powerSum = power.reduce((sum: number, b) => {
    return b ? sum + b : sum
  }, 0)

  // TODO fix types.
  // @ts-ignore
  const phasesData = usePhasesData(phases, voltage, current, power)
  const [boxSize, setBoxSize] = useState<ISize>({ width: 0, height: 0 })
  const activeStyles = applyStyles(boxSize)

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={GeneratorIcon}
        title={title}
        subtitle={subTitle}
        value={powerSum}
        unit="W"
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <Box
      icon={
        <GeneratorIcon
          /* todo: fix types for svg */
          /* @ts-ignore */
          className={"w-7"}
        ></GeneratorIcon>
      }
      title={title}
      getBoxSizeCallback={setBoxSize}
      infoText={
        isAutoStartDisabled
          ? {
              title: "Button disabled",
              body: "Enable button functionality through genset panel",
            }
          : undefined
      }
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div className={classnames("flex w-full flex-col", activeStyles?.flow)}>
          <div className={classnames("mt-1 flex flex-row pr-2", activeStyles?.mainValue)}>{subTitle}</div>
          <div
            className={classnames(
              "flex flex-row mr-4 justify-start text-victron-gray min-w-0",
              activeStyles?.valueSubtitle
            )}
          >
            <div className="flex flex-none flex-col mr-3 w-1/3 truncate">
              <span>Coolant</span>
              <div className={classnames("text-victron-darkGray dark:text-white", activeStyles?.secondaryValue)}>
                {coolant}
                <span>°</span>
              </div>
            </div>
            <div className="flex flex-none flex-col mr-3 w-1/3 truncate">
              <span>Winding</span>
              <div className={classnames("text-victron-darkGray dark:text-white", activeStyles?.secondaryValue)}>
                {winding}
                <span>°</span>
              </div>
            </div>
            <div className="flex flex-none flex-col w-1/3 truncate">
              <span>Exhaust</span>
              <div className={classnames("text-victron-darkGray dark:text-white", activeStyles?.secondaryValue)}>
                {exhaust}
                <span>°</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full min-h-0 shrink flex flex-col justify-end mt-2">
          <div className={classnames("shrink overflow-hidden", activeStyles?.secondaryValue)}>
            {/*          {!!gensetValues && phasesOverview.map((v, i) => <ValueBar key={i} prefix={"L" + (i + 1)} values={v} />)}*/}
            {!!gensetValues && <BottomValues values={phasesData} />}
          </div>
          <AutoStartStopSetter
            title={title}
            autoStart={autoStart}
            isAutoStartDisabled={isAutoStartDisabled}
            updateAutoMode={updateAutoMode}
            updateManualMode={updateManualMode}
            statusCode={statusCode}
          />
        </div>
      </div>
    </Box>
  )
}

interface Props {
  componentMode?: ComponentMode
  generatorFp: GeneratorFpProvider
  compactBoxSize?: { width: number; height: number }
}

export default observer(GeneratorFp)
