import { useState } from "react"
import classNames from "classnames"
import Box from "../../ui/Box"
import { Battery as BatteryType } from "@victronenergy/mfd-modules"
import { batteryStateNameFor } from "../../../utils/formatters/devices/battery/battery-state-name-for"
import { colorForPercentageFormatter } from "../../../utils/formatters"
import { BATTERY } from "../../../utils/constants"
import BatteryChargingIcon from "../../../images/icons/battery-charging.svg"
import BatteryIcon from "../../../images/icons/battery.svg"
import BatteryDischargingIcon from "../../../images/icons/battery-discharging.svg"
import { applyStyles, StylesType } from "app/Marine2/utils/media"
import ValueBar from "../../ui/ValueBar"
import ValueBox from "../../ui/ValueBox"
import { ValueWithUnit } from "@m2Types/data/value-with-units"
import { ISize } from "@m2Types/generic/size"
import { Styles } from "./Styles"

const Battery = ({ battery }: Props) => {
  const isSimpleBattery = !(battery.state || battery.state === 0)
  const [boxSize, setBoxSize] = useState<ISize>({ width: 0, height: 0 })

  if (isSimpleBattery) {
    return (
      <ValueBox
        icon={
          /* todo: fix types for svg */
          /* @ts-ignore */
          <BatteryIcon className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]" />
        }
        title={battery.name}
        unit="V"
        value={battery.voltage}
        bottomValues={[]}
      />
    )
  }

  const hasPercentage = battery.soc !== undefined && battery.soc !== null
  const color = hasPercentage ? colorForPercentageFormatter(Math.round(battery.soc)) : "victron-gray"
  const colorClasses = classNames({
    "text-victron-red dark:text-victron-red-dark": color === "victron-red",
    "text-victron-yellow dark:text-victron-yellow-dark": color === "victron-yellow",
    "text-victron-green dark:text-victron-green-dark": color === "victron-green",
    "text-victron-blue dark:text-victron-blue-dark": color === "victron-blue",
    "text-victron-gray dark:text-white": color === "victron-gray",
  })

  const activeStyles: StylesType = applyStyles(boxSize, Styles)
  const bottomValues: ValueWithUnit[] = [
    { value: battery.voltage, unit: "V" },
    { value: battery.current, unit: "A" },
    { value: battery.power, unit: "W" },
  ]

  return (
    <Box title={battery.name} icon={batteryStateIconFormatter(battery.state)} getBoxSizeCallback={setBoxSize}>
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <div className={classNames(colorClasses, activeStyles?.value)}>
            {battery.soc ? Math.round(battery.soc) : battery.soc ?? "--"}
            <span className="pl-0.5 opacity-70">%</span>
          </div>
          <div className={classNames("text-victron-gray-300 dark:text-victron-gray-500", activeStyles.valueSubtitle)}>
            <p>{batteryStateNameFor(battery.state, battery.timetogo ?? null)}</p>
            {battery.temperature && (
              <p>
                {Math.round(battery.temperature)}
                <span className="text-victron-gray-300 dark:text-victron-gray-400">°C</span>
              </p>
            )}
          </div>
        </div>
        <div className={classNames("-mb-1", activeStyles.valueBars)}>
          <ValueBar values={bottomValues} />
        </div>
      </div>
    </Box>
  )
}

const batteryStateIconFormatter = function (state: number): JSX.Element {
  const className = "w-[18px] sm-s:w-[24px] sm-m:w-[32px]"
  switch (state) {
    case BATTERY.CHARGING:
      return (
        <BatteryChargingIcon
          /* todo: fix types for svg */
          /* @ts-ignore */
          className={className}
        />
      )
    case BATTERY.DISCHARGING:
      return (
        <BatteryDischargingIcon
          /* todo: fix types for svg */
          /* @ts-ignore */
          className={className}
        />
      )
  }
  return (
    <BatteryIcon
      /* todo: fix types for svg */
      /* @ts-ignore */
      className={className}
    />
  )
}

interface Props {
  battery: BatteryType
}

export default Battery
