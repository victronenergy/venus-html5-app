import classNames from "classnames"
import { colorForPercentageFormatter } from "../../../utils/formatters"

const ProgressCircle = ({ percentage, children }: Props) => {
  const hasPercentage = percentage !== null
  const roundedPercentage = Math.round(percentage)
  const color = hasPercentage ? colorForPercentageFormatter(roundedPercentage) : "victron-gray-4"
  const strokeClasses = classNames("fill-none stroke-16", {
    "stroke-victron-green dark:stroke-victron-green-dark": color === "victron-green",
    "stroke-victron-yellow dark:stroke-victron-yellow-dark": color === "victron-yellow",
    "stroke-victron-red dark:stroke-victron-red-dark": color === "victron-red",
    "stroke-victron-blue dark:stroke-victron-blue-dark": color === "victron-blue",
    "stroke-victron-gray dark:stroke-victron-gray-4-dark": color === "victron-gray-4",
  })

  return (
    <div
      className={
        "relative flex justify-center items-center w-[90px] h-[90px] md:w-[144px] md:h-[144px] lg:w-[238px] lg:h-[238px]"
      }
    >
      <svg className={"absolute w-full h-full -rotate-90"} viewBox={"0 0 238 238"}>
        <circle r={"111"} cx={"50%"} cy={"50%"} className={classNames("opacity-30", strokeClasses)} />
        {roundedPercentage !== 0 && (
          <circle
            r={"111"}
            cx={"50%"}
            cy={"50%"}
            strokeDasharray={`${hasPercentage ? Math.floor(roundedPercentage / 5) : 20} 20`}
            strokeDashoffset={0}
            strokeLinecap={"round"}
            pathLength={20}
            className={strokeClasses}
            style={{ transition: "stroke-dasharray .5s ease" }}
          />
        )}
      </svg>
      <div className={"flex flex-col items-center"}>
        {hasPercentage && (
          <div className={"text-xl md:text-3xl lg:text-6xl"}>
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
}

export default ProgressCircle
