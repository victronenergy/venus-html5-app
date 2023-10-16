import ProgressCircle from "../../../components/ui/ProgressCircle"
import { batteryStateNameFor } from "../../../utils/formatters/devices/battery/battery-state-name-for"
import { formatValue } from "../../../utils/formatters"
import { Battery } from "@victronenergy/mfd-modules"
import classNames from "classnames"
import { applyStyles, BreakpointStylesType } from "../../../utils/media"

const styles: BreakpointStylesType = {
  default: {
    voltage: "hidden",
    name: "text-base",
    state: "text-2xs",
  },
  "xs-xs": {
    voltage: "text-sm",
    batteryState: "text-xs",
    name: "text-base",
    state: "text-xs",
  },
  "sm-s": {
    voltage: "text-base",
    batteryState: "text-sm",
    name: "text-base",
    state: "text-sm",
  },
  "sm-m": {
    voltage: "text-lg",
    batteryState: "text-base",
    name: "text-lg",
    state: "text-base",
  },
}

const BatterySummary = ({ battery, boxSize }: Props) => {
  const activeStyles = applyStyles(boxSize, styles)

  return (
    <div className={classNames("flex flex-col justify-center items-center w-full h-full")}>
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
                <span className={"text-victron-gray-400 dark:text-victron-gray-400-dark"}>V</span>
              </div>
              <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.voltage)}>
                {formatValue(battery.current)}
                <span className={"text-victron-gray-400 dark:text-victron-gray-400-dark"}>A</span>
              </div>
            </div>
            <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.batteryState)}>
              {batteryStateNameFor(battery.state, battery.timetogo ?? null)}
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

interface Props {
  battery: Battery
  boxSize: { width: number; height: number }
}

export default BatterySummary
