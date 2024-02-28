import ProgressCircle from "../../../components/ui/ProgressCircle"
import { batteryNameFor } from "../../../utils/formatters/devices/battery/battery-name-for"
import { formatValue } from "../../../utils/formatters/generic"
import { Battery } from "@victronenergy/mfd-modules"
import classNames from "classnames"
import { applyStyles } from "../../../utils/media"
import { ISize } from "@m2Types/generic/size"
import { Styles } from "./Styles"

interface Props {
  battery: Battery
  boxSize: ISize
  classes: string
}

const BatterySummary = ({ battery, boxSize, classes }: Props) => {
  const activeStyles = applyStyles(boxSize, Styles)

  return (
    <div className={classNames("flex flex-col justify-center items-center w-full h-full gap-4", classes)}>
      <ProgressCircle
        percentage={battery.soc ?? null}
        boxSize={{
          width: boxSize.width - 32,
          height: boxSize.height - 32,
        }}
      >
        {battery.voltage || (battery.voltage === 0 && (battery.current || battery.current === 0)) ? (
          <div className="flex flex-col items-center">
            <div className="flex">
              <div
                className={classNames(
                  "text-victron-gray dark:text-victron-gray-dark mr-1 md:mr-2",
                  activeStyles.voltage
                )}
              >
                {formatValue(battery.voltage)}
                <span className="text-victron-gray-400 dark:text-victron-gray-400-dark">V</span>
              </div>
              <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.voltage)}>
                {formatValue(battery.current)}
                <span className="text-victron-gray-400 dark:text-victron-gray-400-dark">A</span>
              </div>
            </div>
            <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.batteryState)}>
              {batteryNameFor(battery.state, battery.timetogo ?? null)}
            </div>
          </div>
        ) : (
          <></>
        )}
      </ProgressCircle>
      <div className={classNames("truncate mt-2 w-[inherit] text-center", activeStyles.name)}>{battery.name}</div>
    </div>
  )
}

export default BatterySummary
