import { GeneratorFpProvider, useGensetValues } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import GeneratorIcon from "../../../images/icons/generator.svg"
import { GENSET_STATE } from "../../../utils/constants"
import { translate } from "react-i18nify"
import { formatPower } from "../../../utils/format"
import DeviceCompact from "../DeviceCompact"
import Box from "../../ui/Box"
import Button from "../../ui/Button"
import classnames from "classnames"
import { useState } from "react"
import ValueBar from "../../ui/ValueBar"
import { applyStyles, BreakpointStylesType } from "../../../utils/media"
import { withErrorBoundary } from "react-error-boundary"
import { appErrorBoundaryProps } from "../../ui/Error/appErrorBoundary"

const styles: BreakpointStylesType = {
  default: {
    flow: "flex-row",
    value: "text-base w-1/2 shrink",
    valueSubtitle: "w-1/2 shrink-0 grow text-xs",
    subValue: "text-sm",
    valueBars: "text-sm",
  },
  "sm-s": {
    flow: "flex-col",
    value: "text-base w-full",
    valueSubtitle: "w-fit mt-3 text-xs",
    subValue: "text-sm",
    valueBars: "text-sm",
  },
  "sm-m": {
    flow: "flex-col",
    value: "text-lg w-full",
    valueSubtitle: "w-fit text-xs mt-5",
    subValue: "text-sm",
    valueBars: "text-base",
  },
  "md-s": {
    flow: "flex-row",
    value: "text-xl w-1/2 shrink",
    valueSubtitle: "w-1/2 shrink-0 grow text-xs",
    subValue: "text-lg",
    valueBars: "text-lg",
  },
  "md-m": {
    flow: "flex-col",
    value: "text-3xl w-full",
    valueSubtitle: "w-fit text-base mt-5",
    subValue: "text-lg",
    valueBars: "text-lg",
  },
}

const GeneratorFp = ({ mode = "compact", generatorFp }: Props) => {
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

  const { productName, phases, statusCode, gensetAutoStart } = generatorFp //TODO: once design is ready use autoStart, updateAutoMode, updateManualMode
  const gensetValues = useGensetValues()
  const { voltage, current, power, coolant, winding, exhaust } = gensetValues
  // When a topic is invalid, it returns undefined -> no value means topic is not supported
  const title = productName || "Genset"
  const subTitle = (!!statusCode || statusCode === 0) && gensetStateFormatter(Number(statusCode))
  const isAutoStartDisabled = gensetAutoStart === 0
  const powerSum = power.reduce((sum: number, b) => {
    return b ? sum + b : sum
  }, 0)
  const powerFormatted = formatPower(powerSum)
  const unit = powerSum > 1000 ? "kW" : "W"

  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const activeStyles = applyStyles(boxSize, styles)

  const phasesOverview = []
  for (let phase = 0; phase < phases; phase++) {
    phasesOverview.push([
      { value: voltage[phase], unit: "V" },
      { value: current[phase], unit: "A" },
      { value: power[phase], unit: "W" },
    ])
  }

  if (mode === "compact") {
    return (
      <DeviceCompact
        icon={
          <GeneratorIcon
            /* todo: fix types for svg */
            /* @ts-ignore */
            className={"w-7"}
          ></GeneratorIcon>
        }
        title={title}
        subTitle={subTitle}
        value={powerFormatted}
        unit={unit}
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
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div className={classnames("flex w-full", activeStyles?.flow)}>
          <div className={classnames("mt-1 flex flex-row pr-2", activeStyles?.value)}>{subTitle}</div>
          <div
            className={classnames(
              "flex flex-row mr-4 justify-start text-victron-gray min-w-0",
              activeStyles?.valueSubtitle
            )}
          >
            <div className="flex flex-none flex-col mr-3 w-1/3 truncate">
              <span>Coolant</span>
              <div className={classnames("text-white", activeStyles?.subValue)}>
                {coolant}
                <span>°</span>
              </div>
            </div>
            <div className="flex flex-none flex-col mr-3 w-1/3 truncate">
              <span>Winding</span>
              <div className={classnames("text-white", activeStyles?.subValue)}>
                {winding}
                <span>°</span>
              </div>
            </div>
            <div className="flex flex-none flex-col w-1/3 truncate">
              <span>Exhaust</span>
              <div className={classnames("text-white", activeStyles?.subValue)}>
                {exhaust}
                <span>°</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full min-h-0 shrink flex flex-col justify-end mt-2">
          <div className={classnames("shrink overflow-hidden", activeStyles?.valueBars)}>
            {!!gensetValues && phasesOverview.map((v, i) => <ValueBar key={i} prefix={"L" + (i + 1)} values={v} />)}
          </div>
          <Button size="md" className="flex-none mt-3" disabled={isAutoStartDisabled}>
            {translate("common.autoStartStop")}
          </Button>
        </div>
      </div>
    </Box>
  )
}

interface Props {
  mode?: "compact" | "full"
  generatorFp: GeneratorFpProvider
}

export default withErrorBoundary(observer(GeneratorFp), appErrorBoundaryProps)
