import Box from "../../ui/Box"
import { Battery as BatteryType } from "@elninotech/mfd-modules"
import { batteryStateNameFormatter } from "../../../utils/formatters"
import { BATTERY } from "../../../utils/constants"
import BatteryChargingIcon from "../../../images/icons/battery-charging.svg"
import BatteryIcon from "../../../images/icons/battery.svg"
import BatteryDischargingIcon from "../../../images/icons/battery-discharging.svg"
import { colorForPercentageFormatter } from "../../../utils/formatters"
import { translate } from "react-i18nify"

const Battery = ({ battery, mode = "compact" }: Props) => {
  const hasPercentage = battery.soc !== undefined && battery.soc !== null
  const color = hasPercentage ? colorForPercentageFormatter(Math.round(battery.soc)) : "victron-gray-4"

  if (mode === "compact") {
    return (
      <Box icon={batteryStateIconFormatter(battery.state)} title={battery.name}>
        <></>
      </Box>
    )
  }

  return (
    <Box icon={batteryStateIconFormatter(battery.state)} title={battery.name} className="truncate">
      <div className="w-full h-full flex flex-col">
        <div className={`text-${color} text-5xl md-m:text-6xl`}>
          {battery.soc ?? "--"}
          <span className="opacity-70">%</span>
        </div>
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-victron-gray dark:text-victron-gray-dark">
          {batteryStateNameFormatter(translate, battery.state)}
        </p>
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-victron-gray dark:text-victron-gray-dark">
          {battery.temperature ?? "--"}
          <span className="text-victron-gray-400">°C</span>
        </p>

        <div className="w-full h-full flex content-end flex-wrap">
          <div className="w-full">
            <div className="my-1 border-[1px] border-victron-gray-200" />
            <div key={battery.name} className="grid grid-cols-9 whitespace-nowrap">
              <p className="text-victron-gray dark:text-white truncate text-left text-base sm:text-lg md:text-xl lg:text-2xl col-span-3">
                {battery.name}
              </p>
              <p className="text-victron-gray text-left text-base sm:text-lg md:text-xl lg:text-2xl  col-span-2">
                {battery.voltage.toFixed(1)} <span className="text-victron-gray-400">V</span>
              </p>
              <p className="text-victron-gray text-center text-base sm:text-lg md:text-xl lg:text-2xl  col-span-2">
                {battery.current.toFixed(1)} <span className="text-victron-gray-400">A</span>
              </p>
              <p className="text-victron-gray text-right text-base sm:text-lg md:text-xl lg:text-2xl  col-span-2">
                {battery.power.toFixed(1)} <span className="text-victron-gray-400">W</span>
              </p>
            </div>
          </div>
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
