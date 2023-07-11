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
    circle: "w-[110px]",
    circleWrapper: "px-1.5 h-[110px]",
    voltage: "hidden",
    name: "hidden",
    state: "text-2xs",
  },
  "xs-xs": {
    circle: "w-[150px]",
    circleWrapper: "px-2.5 h-[150px]",
    voltage: "text-sm",
    batteryState: "text-xs",
    name: "text-base",
    state: "text-xs",
  },
  "sm-s": {
    circle: "w-[198px]",
    circleWrapper: "px-3 h-[198px]",
    voltage: "text-base",
    batteryState: "text-sm",
    name: "text-base",
    state: "text-sm",
  },
  "sm-m": {
    circle: "w-[270px]",
    circleWrapper: "px-4 h-[270px]",
    voltage: "text-lg",
    batteryState: "text-base",
    name: "text-xl",
    state: "text-base",
  },
}

const BatterySummary = ({ battery, boxSize, circleRef }: Props) => {
  const activeStyles = applyStyles(boxSize, styles)

  return (
    <div
      className={classNames("flex flex-col justify-center items-center mx-4 md:mx-8", activeStyles.circle)}
      ref={circleRef}
    >
      <div className={classNames("w-full", activeStyles.circleWrapper)}>
        <ProgressCircle percentage={battery.soc ?? null} boxSize={boxSize}>
          {battery.voltage || (battery.voltage === 0 && (battery.current || battery.current === 0)) ? (
            <div className="flex flex-col items-center">
              <div className="flex gap-1 md:gap-2">
                <div className={classNames("text-victron-gra dark:text-victron-gray-dark", activeStyles.voltage)}>
                  {formatValue(battery.voltage)}
                  <span className={"text-victron-gray-400 dark:text-victron-gray-400-dark"}>V</span>
                </div>
                <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.voltage)}>
                  {formatValue(battery.current)}
                  <span className={"text-victron-gray-400 dark:text-victron-gray-400-dark"}>A</span>
                </div>
              </div>
              <div className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles.batteryState)}>
                {batteryStateNameFormatter(translate, battery.state, battery.soc ?? null)}
              </div>
            </div>
          ) : (
            <></>
          )}
        </ProgressCircle>
      </div>
      <FadedText text={battery.name} className={classNames("mt-3.5 text-center", activeStyles.name)} />
    </div>
  )
}

interface Props {
  battery: Battery
  boxSize: { width: number; height: number }
  circleRef?: React.RefObject<HTMLDivElement>
}

export default BatterySummary
