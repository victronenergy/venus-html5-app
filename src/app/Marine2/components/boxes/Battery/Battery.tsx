import { useState } from "react"
import classNames from "classnames"
import { Styles } from "./Styles"
import { ISize } from "@m2Types/generic/size"
import { ValueWithUnit } from "@m2Types/data/value-with-units"
import { Battery as BatteryType } from "@victronenergy/mfd-modules"
import { applyStyles, StylesType } from "app/Marine2/utils/media"
import Box from "../../ui/Box"
import ValueBar from "../../ui/ValueBar"
import ValueBox from "../../ui/ValueBox"
import { batteryNameFor } from "../../../utils/formatters/devices/battery/battery-name-for"
import { batteryIconFor } from "../../../utils/formatters/devices/battery/battery-icon-for"
import { responsiveBoxIconClasses } from "../../../utils/constants/responsive-box-icon-classes"
import { colorForPercentageFormatter } from "../../../utils/formatters"

import BatteryIcon from "../../../images/icons/battery.svg"

interface Props {
  battery: BatteryType
}

const Battery = ({ battery }: Props) => {
  const isSimpleBattery = !(battery.state || battery.state === 0)
  const [boxSize, setBoxSize] = useState<ISize>({ width: 0, height: 0 })

  if (isSimpleBattery) {
    return (
      <ValueBox
        icon={<BatteryIcon className={responsiveBoxIconClasses} />}
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
    <Box title={battery.name} icon={batteryIconFor(battery.state)} getBoxSizeCallback={setBoxSize}>
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <div className={classNames(colorClasses, activeStyles?.value)}>
            {battery.soc ? Math.round(battery.soc) : battery.soc ?? "--"}
            <span className="pl-0.5 opacity-70">%</span>
          </div>
          <div className={classNames("text-victron-gray-300 dark:text-victron-gray-500", activeStyles.valueSubtitle)}>
            <p>{batteryNameFor(battery.state, battery.timetogo ?? null)}</p>
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

export default Battery
