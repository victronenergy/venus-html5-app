import ProgressCircle from "../../../components/ui/ProgressCircle"
import { batteryStateNameFormatter, dcVoltageFormatter, timeAsStringFormatter } from "../../../utils/formatters"
import { BATTERY } from "../../../utils/constants"
import { Battery } from "@elninotech/mfd-modules"
import classNames from "classnames"
import { translate } from "react-i18nify"

const BatterySummary = ({ battery, className }: Props) => {
  return (
    <div className={classNames("flex flex-col justify-center items-center px-4", className)}>
      <ProgressCircle percentage={battery.soc ?? null}>
        {battery.voltage || battery.voltage === 0 ? (
          <div className={"text-victron-gray dark:text-victron-gray-dark text-base lg-xl:text-lg hidden md-l:block"}>
            {dcVoltageFormatter(battery.voltage)}
            <span className={"text-victron-gray-4 dark:text-victron-gray-4-dark"}>V</span>
          </div>
        ) : (
          <></>
        )}
      </ProgressCircle>
      <span className={"mt-3.5 truncate w-full text-center text-base lg-xl:text-xl"}>{battery.name}</span>
      {
        <span className={"text-victron-gray dark:text-victron-gray-dark text-xs md-l:text-sm lg-xl:text-base"}>
          {battery.state === BATTERY.DISCHARGING && battery.timetogo
            ? timeAsStringFormatter(translate, battery.timetogo)
            : batteryStateNameFormatter(translate, battery.state, battery.soc ?? null)}
        </span>
      }
    </div>
  )
}

interface Props {
  battery: Battery
  className?: string
}

export default BatterySummary
