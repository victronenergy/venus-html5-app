import { FC } from "react"
import classNames from "classnames"
import { Battery } from "@victronenergy/mfd-modules"
import { ISize } from "@m2Types/generic/size"
import { formatValue } from "../../../../utils/formatters/generic"
import { batteryStateFor } from "../../../../utils/formatters/devices/battery/battery-state-for"
import { applyStyles } from "../../../../utils/media"
import { BatteryPercentage } from "./BatteryPercentage/BatteryPercentage"
import { Styles } from "./Styles"

interface Props {
  battery: Battery
  boxSize: ISize
}

export const BatteryValues: FC<Props> = ({ battery, boxSize }) => {
  const activeStyles = applyStyles(boxSize, Styles)

  return (
    <div className="flex flex-col items-center">
      <BatteryPercentage percentage={battery.soc ?? null} boxSize={boxSize} />
      <div className="flex">
        {(battery.voltage || battery.voltage === 0) && (
          <div
            className={classNames("text-victron-gray dark:text-victron-gray-dark mr-1 md:mr-2", activeStyles.values)}
          >
            {formatValue(battery.voltage)}
            <span className="text-victron-gray-400 dark:text-victron-gray-400-dark">V</span>
          </div>
        )}
        {(battery.current || battery.current === 0) && (
          <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.values)}>
            {formatValue(battery.current)}
            <span className="text-victron-gray-400 dark:text-victron-gray-400-dark">A</span>
          </div>
        )}
      </div>
      <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.state)}>
        {batteryStateFor(battery.state, battery.timetogo ?? null)}
      </div>
    </div>
  )
}
