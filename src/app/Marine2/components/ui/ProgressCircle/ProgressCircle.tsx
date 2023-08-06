import classNames from "classnames"
import { colorForPercentageFormatter } from "../../../utils/formatters"
import { applyStyles, BreakpointStylesType } from "../../../utils/media"

const styles: BreakpointStylesType = {
  default: {
    percentage: "text-lg",
  },
  "xs-xs": {
    percentage: "text-xl",
  },
  "md-s": {
    percentage: "text-xxl",
  },
  "lg-m": {
    percentage: "text-2xl",
  },
}

const ProgressCircle = ({ percentage, children, boxSize, batteryTitle }: Props) => {
  const activeStyles = applyStyles(boxSize, styles)
  const hasPercentage = percentage !== null
  const roundedPercentage = Math.round(percentage)
  const color = hasPercentage ? colorForPercentageFormatter(roundedPercentage) : "victron-gray-400"
  const strokeClasses = classNames("fill-none stroke-16", {
    "stroke-victron-green dark:stroke-victron-green-dark": color === "victron-green",
    "stroke-victron-yellow dark:stroke-victron-yellow-dark": color === "victron-yellow",
    "stroke-victron-red dark:stroke-victron-red-dark": color === "victron-red",
    "stroke-victron-blue dark:stroke-victron-blue-dark": color === "victron-blue",
    "stroke-victron-gray-400 dark:stroke-victron-gray-dark": color === "victron-gray-400",
  })

  // Due to the pathLength attribute not working on some device, we need to calculate some values.
  const circleRadius = 111
  const circlePathLength = 2 * Math.PI * circleRadius
  const circleStrokeLength = hasPercentage
    ? (Math.floor(roundedPercentage / 5) * 5 * circlePathLength) / 100
    : circlePathLength

  return (
    <div className={"relative flex justify-center items-center w-full h-full"}>
      <svg className={"absolute w-full h-full -rotate-90"} viewBox={"0 0 238 238"}>
        <circle r={circleRadius} cx={"50%"} cy={"50%"} className={classNames("opacity-30", strokeClasses)} />
        {roundedPercentage !== 0 && (
          <circle
            r={circleRadius}
            cx={"50%"}
            cy={"50%"}
            strokeDasharray={`${circleStrokeLength} ${circlePathLength}`}
            strokeDashoffset={0}
            strokeLinecap={"round"}
            className={strokeClasses}
            style={{ transition: "stroke-dasharray .5s ease" }}
          />
        )}
      </svg>
      <div className={"flex flex-col items-center"}>
        {hasPercentage && (
          <div className={classNames(activeStyles.percentage)}>
            {roundedPercentage}
            <span className={"text-victron-gray dark:text-victron-gray-dark"}>%</span>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

interface Props {
  percentage: number
  children?: JSX.Element
  boxSize: { width: number; height: number }
  batteryTitle?: string
}

export default ProgressCircle
