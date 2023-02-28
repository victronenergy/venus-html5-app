import { GeneratorFpProvider, useGensetValues } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import GeneratorIcon from "../../../images/icons/generator.svg"
import { GENSET_STATE } from "../../../utils/constants"
import { translate } from "react-i18nify"
import { formatPower } from "../../../utils/format"
import DeviceCompact from "../DeviceCompact"
import range from "lodash-es/range"
import Box from "../../ui/Box"
import Button from "../../ui/Button"
import classnames from "classnames"
import { useComponentSize, useWindowSize } from "../../../utils/hooks"
import { useEffect, useRef, useState } from "react"

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

  const { productName, phases, statusCode, gensetAutoStart, autoStart, updateAutoMode, updateManualMode } = generatorFp
  const gensetValues = useGensetValues()
  const { voltage, current, power, frequency, coolant, winding, exhaust } = gensetValues
  // When a topic is invalid, it returns undefined -> no value means topic is not supported
  const title = productName || "Genset"
  const subTitle = (!!statusCode || statusCode === 0) && gensetStateFormatter(Number(statusCode))
  const isAutoStartDisabled = gensetAutoStart === 0
  const powerSum = power.reduce((sum: number, b) => {
    return b ? sum + b : sum
  }, 0)
  const powerFormatted = formatPower(powerSum)
  const unit = powerSum > 1000 ? "kW" : "W"

  const parentRef = useRef<HTMLDivElement>(null)
  const componentSize = useComponentSize(parentRef)
  const windowSize = useWindowSize()
  const [isFullHeight, setFullHeight] = useState<boolean>(false)

  useEffect(() => {
    if (!windowSize || !componentSize) return
    if (windowSize.height !== undefined && componentSize.height < windowSize.height / 2) {
      setFullHeight(false)
    } else {
      setFullHeight(true)
    }
  }, [windowSize, componentSize])

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
    >
      <div ref={parentRef} className="w-full h-full flex flex-col justify-between">
        <div
          className={classnames("flex w-full", {
            "flex-row": !isFullHeight,
            "flex-col": isFullHeight,
          })}
        >
          <div
            className={classnames("mt-1 flex flex-row pr-2", {
              "text-3xl w-full": isFullHeight,
              "text-base sm:text-lg md:text-xl lg:text-xl w-1/2 shrink": !isFullHeight,
            })}
          >
            {subTitle}
          </div>
          <div
            className={classnames("flex flex-row justify-start text-victron-gray min-w-0", {
              "w-full": isFullHeight,
              "w-1/2 shrink-0 grow": !isFullHeight,
            })}
          >
            <div className="flex flex-none flex-col mr-3 w-1/4 truncate">
              <span>Coolant</span>
              <div className="text-white">
                {coolant}
                <span>°</span>
              </div>
            </div>
            <div className="flex flex-none flex-col mr-3 w-1/4 truncate">
              <span>Winding</span>
              <div className="text-white">
                {winding}
                <span>°</span>
              </div>
            </div>
            <div className="flex flex-none flex-col w-1/4 truncate">
              <span>Exhaust</span>
              <div className="text-white">
                {exhaust}
                <span>°</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full min-h-0 shrink flex flex-col justify-end mt-2">
          <div className={"shrink overflow-hidden"}>
            {!!gensetValues &&
              range(phases).map((_, i) => (
                <>
                  <div
                    className={classnames("flex flex-row justify between text-victron-gray text-xs min-h-0", {
                      " md:text-base lg:text-xl": isFullHeight,
                    })}
                  >
                    <p className="w-8 sm:w-8 md:w-10 lg:w-16 shrink-0">{`L${i + 1}`}</p>
                    <div className="grow shrink flex justify-between w-full min-w-0 whitespace-nowrap">
                      <p className={"w-1/5 overflow-hidden"}>
                        {(voltage[i] ?? 0).toFixed(1)} <span className="text-victron-gray-400">V</span>
                      </p>
                      <p className={"w-1/5 overflow-hidden"}>
                        {(current[i] ?? 0).toFixed(1)} <span className="text-victron-gray-400">A</span>
                      </p>
                      <p className={"w-1/5 overflow-hidden"}>
                        {formatPower(power[i] ?? 0)}{" "}
                        <span className="text-victron-gray-400">{(power[i] ?? 0) > 1000 ? "kW" : "W"}</span>
                      </p>
                      <p className={"w-1/5 overflow-hidden"}>
                        {(frequency[i] ?? 0).toFixed(1)} <span className="text-victron-gray-400">Hz</span>
                      </p>
                    </div>
                  </div>
                  <div className="my-1 border-[1px] border-victron-darkGray-2" />
                </>
              ))}
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

export default observer(GeneratorFp)
