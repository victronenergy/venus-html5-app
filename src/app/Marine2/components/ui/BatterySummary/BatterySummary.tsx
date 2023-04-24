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
    circle: "w-[60px]",
    circleWrapper: "px-1.5 h-[50px]",
    voltage: "hidden",
    name: "hidden",
    state: "text-2xs",
  },
  "xs-xs": {
    circle: "w-[110px]",
    circleWrapper: "px-2.5 h-[90px]",
    voltage: "text-base hidden",
    name: "text-base",
    state: "text-xs",
  },
  "sm-s": {
    circle: "w-[198px]",
    circleWrapper: "px-3 h-[144px]",
    voltage: "block",
    name: "text-base",
    state: "text-sm",
  },
  "sm-m": {
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
        <ProgressCircle percentage={battery.soc ?? null} boxSize={boxSize}>
          {battery.voltage || battery.voltage === 0 ? (
            <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.voltage)}>
              {formatValue(battery.voltage, "V")}
              <span className={"text-victron-gray-4 dark:text-victron-gray-4-dark"}>V</span>
            </div>
          ) : (
            <></>
          )}
        </ProgressCircle>
      </div>
      <FadedText text={battery.name} className={classNames("mt-3.5 text-center", activeStyles.name)} />
      {
        <span className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.state)}>
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
  boxSize: { width: number; height: number }
  circleRef?: React.RefObject<HTMLDivElement>
}

export default BatterySummary
