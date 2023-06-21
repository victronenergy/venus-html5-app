import ProgressCircle from "../../../components/ui/ProgressCircle"
import { batteryStateNameFormatter, formatValue, timeAsStringFormatter } from "../../../utils/formatters"
import { BATTERY } from "../../../utils/constants"
import { Battery } from "@elninotech/mfd-modules"
import classNames from "classnames"
import { translate } from "react-i18nify"
import { applyStyles, BreakpointStylesType } from "../../../utils/media"
import FadedText from "../FadedText"

const styles: BreakpointStylesType = {
  default: {
    circle: "w-[142px]",
    circleWrapper: "px-5 h-[142px]",
    voltage: "text-sm",
    name: "text-sm",
    state: "text-xs",
  },
  small: {
    circle: "w-[142px]",
    circleWrapper: "px-5 h-[142px]",
    voltage: "text-sm",
    name: "text-sm",
    state: "text-xs",
  },
  medium: {
    circle: "w-[198px]",
    circleWrapper: "px-3 h-[144px]",
    voltage: "block",
    name: "text-base",
    state: "text-sm",
  },
  large: {
    circle: "w-[270px]",
    circleWrapper: "px-4 h-[238px]",
    voltage: "text-lg",
    name: "text-xl",
    state: "text-base",
  },
}

const BatterySummary = ({ battery, boxSize, circleRef }: Props) => {
  const activeStyles = applyStyles(boxSize, styles)

  return (
    <div className={classNames("flex flex-col justify-center items-center mx-8", activeStyles.circle)} ref={circleRef}>
      <div className={classNames("w-full", activeStyles.circleWrapper)}>
        <FadedText text={battery.name} className={classNames("", activeStyles.name)} />
        <ProgressCircle percentage={battery.soc ?? null} boxSize={boxSize}>
          <div>
            {battery.voltage || battery.voltage === 0 ? (
              <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.voltage)}>
                {formatValue(battery.voltage)}
                {formatValue(battery.current)}
              </div>
            ) : (
              <></>
            )}
            <span className={"text-victron-gray-4 dark:text-victron-gray-4-dark"}>V</span>
            <span className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.state)}>
              {battery.state === BATTERY.DISCHARGING && battery.timetogo
                ? timeAsStringFormatter(translate, battery.timetogo)
                : batteryStateNameFormatter(translate, battery.state, battery.soc ?? null)}
            </span>
          </div>
        </ProgressCircle>
      </div>
      {}
    </div>
  )
}

interface Props {
  battery: Battery
  boxSize: { width: number; height: number }
  circleRef?: React.RefObject<HTMLDivElement>
}

export default BatterySummary
