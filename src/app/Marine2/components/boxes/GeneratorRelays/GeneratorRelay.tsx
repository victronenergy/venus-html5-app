import { observer } from "mobx-react-lite"
import GeneratorIcon from "../../../images/icons/generator.svg"
import { translate } from "react-i18nify"
import { formatPower } from "../../../utils/format"
import DeviceCompact from "../DeviceCompact"
import { useActiveInValues } from "@elninotech/mfd-modules"
import classnames from "classnames"
import range from "lodash-es/range"
import Button from "../../ui/Button"
import Box from "../../ui/Box"
import { useEffect, useRef, useState } from "react"
import { useComponentSize, useWindowSize } from "../../../utils/hooks"

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
          className={classnames("mt-1 flex flex-row pr-2", {
            "text-3xl w-full": isFullHeight,
            "text-base sm:text-lg md:text-xl lg:text-xl w-1/2 shrink": !isFullHeight,
          })}
        >
          {subTitle}
        </div>
        <div className="w-full h-full min-h-0 shrink flex flex-col justify-end mt-2">
          <div className={"shrink overflow-hidden"}>
            {active &&
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
                    </div>
                  </div>
                  <div className="my-1 border-[1px] border-victron-darkGray-2" />
                </>
              ))}
          </div>
          <Button size="md" className="flex-none mt-3" disabled={!autoStart}>
            {translate("common.autoStartStop")}
          </Button>
        </div>
      </div>
    </Box>
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
}

export default observer(GeneratorRelay)
