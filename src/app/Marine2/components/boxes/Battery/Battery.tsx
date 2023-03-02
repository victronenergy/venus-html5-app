import Box from "../../ui/Box"
import { Battery as BatteryType } from "@elninotech/mfd-modules"
import { batteryStateNameFormatter, colorForPercentageFormatter } from "../../../utils/formatters"
import { BATTERY } from "../../../utils/constants"
import BatteryChargingIcon from "../../../images/icons/battery-charging.svg"
import BatteryIcon from "../../../images/icons/battery.svg"
import BatteryDischargingIcon from "../../../images/icons/battery-discharging.svg"
import { translate } from "react-i18nify"
import classNames from "classnames"
import { applyStyles, BreakpointStylesType } from "app/Marine2/utils/media"
import { useState } from "react"

const styles: BreakpointStylesType = {
  "sm-s": {
    mainValue: "text-2xl",
    subValue: "text-base",
  },
  "md-s": {
    mainValue: "text-3xl",
    subValue: "text-base",
  },
  "lg-s": {
    mainValue: "text-3xl",
    subValue: "text-lg",
  },
  default: {
    mainValue: "text-xl",
    subValue: "text-base",
  },
}

const Battery = ({ battery, mode = "compact" }: Props) => {
  const hasPercentage = battery.soc !== undefined && battery.soc !== null
  const color = hasPercentage ? colorForPercentageFormatter(Math.round(battery.soc)) : "victron-gray-400"
  const colorClasses = classNames({
    "text-victron-red dark:text-victron-red-dark": color === "victron-red",
    "text-victron-yellow dark:text-victron-yellow-dark": color === "victron-yellow",
    "text-victron-green dark:text-victron-green-dark": color === "victron-green",
    "text-victron-blue dark:text-victron-blue-dark": color === "victron-blue",
    "text-victron-gray-400 dark:text-victron-gray-dark": color === "victron-gray-400",
  })
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const activeStyles = applyStyles(boxSize, styles)
  if (mode === "compact") {
    return (
      <Box icon={batteryStateIconFormatter(battery.state)} title={battery.name}>
        <></>
      </Box>
    )
  }

  // main batteries (state is charging or discharging)
  if (battery.state !== BATTERY.IDLE) {
    return (
      <Box
        icon={batteryStateIconFormatter(battery.state)}
        title={battery.name}
        className="truncate"
        getBoxSizeCallback={setBoxSize}
      >
        <div className="w-full h-full flex flex-col">
          <div className={classNames(`${colorClasses}`, activeStyles?.mainValue)}>
            {Math.round(battery.soc) ?? "--"}
            <span className="opacity-70">%</span>
          </div>
          <p className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles?.subValue)}>
            {batteryStateNameFormatter(translate, battery.state)}
          </p>
          <p className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles?.subValue)}>
            {battery.temperature ?? "--"}
            <span className="text-victron-gray-400">°C</span>
          </p>

          <div className="w-full h-full flex content-end flex-wrap">
            <div className="w-full">
              <div className="my-1 border-[1px] border-victron-gray-200" />
              <div
                className={classNames(
                  "flex justify-between whitespace-nowrap text-victron-gray",
                  activeStyles?.subValue
                )}
              >
                <p>
                  {battery.voltage.toFixed(1)} <span className="text-victron-gray-400">V</span>
                </p>
                <p>
                  {battery.current.toFixed(1)} <span className="text-victron-gray-400">A</span>
                </p>
                <p>
                  {battery.power.toFixed(1)} <span className="text-victron-gray-400">W</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Box>
    )
  }

  // aux batteries (state is idle)
  return (
    <Box
      icon={batteryStateIconFormatter(battery.state)}
      title={battery.name}
      className="truncate"
      getBoxSizeCallback={setBoxSize}
    >
      <div className="w-full h-full flex flex-col">
        <div className={classNames(`text-black dark:text-white`, activeStyles?.mainValue)}>
          {battery.voltage.toFixed(1)}
          <span className="text-victron-gray dark:text-victron-gray">V</span>
        </div>
      </div>
    </Box>
  )
}

const batteryStateIconFormatter = function (state: number): JSX.Element {
  const className = "w-6 text-victron-gray dark:text-victron-gray-dark"
  switch (state) {
    case BATTERY.CHARGING:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return <BatteryChargingIcon className={className} />
    case BATTERY.DISCHARGING:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return <BatteryDischargingIcon className={className} />
  }
  /* todo: fix types for svg */
  /* @ts-ignore */
  return <BatteryIcon className={className} />
}
interface Props {
  battery: BatteryType
  mode?: "compact" | "full"
}

export default Battery
