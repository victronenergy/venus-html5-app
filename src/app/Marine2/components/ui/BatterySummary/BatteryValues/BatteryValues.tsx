import { FC } from "react"
import classNames from "classnames"
import { Battery } from "@victronenergy/mfd-modules"
import { ISize } from "@m2Types/generic/size"
import { batteryStateFor } from "../../../../utils/formatters/devices/battery/battery-state-for"
import { applyStyles } from "../../../../utils/media"
import { BatteryPercentage } from "./BatteryPercentage/BatteryPercentage"
import { Styles } from "./Styles"
import { ValueWithUnit } from "../../ValueWithUnit/ValueWithUnit"

interface Props {
  battery: Battery
  boxSize: ISize
  electricalPowerIndicator: number
}

export const BatteryValues: FC<Props> = ({ battery, boxSize, electricalPowerIndicator }) => {
  const activeStyles = applyStyles(boxSize, Styles)

  const showWatts = electricalPowerIndicator === 0

  return (
    <div className="flex flex-col items-center">
      <BatteryPercentage percentage={battery.soc ?? null} boxSize={boxSize} />
      <div className="flex">
        {!showWatts && (battery.voltage || battery.voltage === 0) && (
          <div
            className={classNames("text-victron-gray dark:text-victron-gray-dark mr-1 md:mr-2", activeStyles.values)}
          >
            <ValueWithUnit value={battery.voltage} unit="V" />
          </div>
        )}
        {!showWatts && (battery.current || battery.current === 0) && (
          <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.values)}>
            <ValueWithUnit value={battery.current} unit="A" />
          </div>
        )}
        {showWatts && (battery.power || battery.power === 0) && (
          <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.values)}>
            <ValueWithUnit value={battery.power} unit="W" />
          </div>
        )}
      </div>
      <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.state)}>
        {batteryStateFor(battery.state, battery.bmsstate, battery.timetogo ?? null)}
      </div>
    </div>
  )
}
