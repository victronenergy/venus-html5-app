import { FC } from "react"
import { ISize } from "@m2Types/generic/size"
import { colorFor } from "../../../utils/formatters/generic"
import { applyStyles } from "../../../utils/media"
import { InnerCircle } from "./InnerCircle/InnerCircle"
import { Styles } from "./Styles"
import classNames from "classnames"

interface Props {
  percentage: number
  children?: JSX.Element
  boxSize: ISize
}

export const ProgressCircle: FC<Props> = ({ percentage, children, boxSize }) => {
  const radius = 110
  const pathLength = 2 * Math.PI * radius

  const { strokeWidth } = applyStyles(boxSize, Styles)

  if (percentage === null) {
    const classes = classNames("fill-none stroke-victron-gray-400 dark:stroke-victron-gray-dark", strokeWidth)
    const strokeDashArray = `${pathLength} ${pathLength}`

    return (
      <div className="relative flex justify-center items-center w-full h-full max-w-[15rem]">
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 238 238">
          <circle r={radius} cx="50%" cy="50%" className={classNames("opacity-30", classes)} />
          <InnerCircle radius={radius} classes={classes} strokeDashArray={strokeDashArray} />
        </svg>
        {children}
      </div>
    )
  }

  const roundedPercentage = Math.round(percentage)
  const color = colorFor(roundedPercentage)
  const classes = classNames("fill-none", strokeWidth, {
    "stroke-victron-green dark:stroke-victron-green-dark": color === "victron-green",
    "stroke-victron-yellow dark:stroke-victron-yellow-dark": color === "victron-yellow",
    "stroke-victron-red dark:stroke-victron-red-dark": color === "victron-red",
    "stroke-victron-blue dark:stroke-victron-blue-dark": color === "victron-blue",
  })
  const strokeDashArray = `${(Math.floor(roundedPercentage / 5) * 5 * pathLength) / 100} ${pathLength}`

  return (
    <div className="relative flex justify-center items-center w-full h-full max-w-[15rem]">
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 238 238">
        <circle r={radius} cx="50%" cy="50%" className={classNames("opacity-30", classes)} />
        <InnerCircle
          radius={radius}
          classes={classes}
          percentage={roundedPercentage}
          strokeDashArray={strokeDashArray}
        />
      </svg>
      {children}
    </div>
  )
}
