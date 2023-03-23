import React from "react"
import classnames from "classnames"

const ProgressBar = ({ percentage, type, orientation = "horizontal", size = "small" }: Props) => {
  const color = colorFormatter(type)
  const bgColor = colorFormatter(type, true)

  if (orientation === "horizontal") {
    return (
      <div className="w-full flex">
        <div className={classnames(`w-1/4 rounded-l-2xl mr-2 ${bgColor}`, size === "small" ? "h-2" : "h-4")}>
          <div
            className={classnames(`h-full rounded-l-2xl ${color}`)}
            style={{ width: percentage >= 25 ? "100%" : `${percentage * 4}%` }}
          />
        </div>
        <div className={classnames(`w-1/4 mr-2 ${bgColor}`, size === "small" ? "h-2" : "h-4")}>
          <div
            className={classnames(`h-full ${color}`)}
            style={{ width: percentage >= 50 ? "100%" : percentage <= 25 ? "0%" : `${(percentage - 25) * 4}%` }}
          />
        </div>
        <div className={classnames(`w-1/4 mr-2 ${bgColor}`, size === "small" ? "h-2" : "h-4")}>
          <div
            className={classnames(`h-full ${color}`)}
            style={{ width: percentage >= 75 ? "100%" : percentage <= 50 ? "0%" : `${(percentage - 50) * 4}%` }}
          />
        </div>
        <div className={classnames(`w-1/4 rounded-r-2xl mr-2 ${bgColor}`, size === "small" ? "h-2" : "h-4")}>
          <div
            className={classnames(`h-full ${color}`)}
            style={{ width: percentage <= 75 ? "0%" : `${(percentage - 75) * 4}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col-reverse items-center">
      <div className={classnames(`h-1/4 w-3 md:w-3 m-1 ${bgColor} rotate-180`)}>
        <div
          className={classnames(`w-full rounded-t-2xl ${color}`)}
          style={{ height: percentage >= 25 ? "100%" : `${percentage * 4}%` }}
        />
      </div>
      <div className={classnames(`h-1/4 w-3 md:w-3 m-1 ${bgColor} rotate-180`)}>
        <div
          className={classnames(`w-full ${color}`)}
          style={{ height: percentage >= 50 ? "100%" : percentage <= 25 ? "0%" : `${(percentage - 25) * 4}%` }}
        />
      </div>
      <div className={classnames(`h-1/4 w-3 md:w-3 m-1 ${bgColor} rotate-180`)}>
        <div
          className={classnames(`w-full ${color}`)}
          style={{ height: percentage >= 75 ? "100%" : percentage <= 50 ? "0%" : `${(percentage - 50) * 4}%` }}
        />
      </div>
      <div className={classnames(`h-1/4 w-3 md:w-3 m-1 rounded-b-2xl ${bgColor} rotate-180`)}>
        <div
          className={classnames(`w-full ${color}`)}
          style={{ height: percentage <= 75 ? "0%" : `${(percentage - 75) * 4}%` }}
        />
      </div>
    </div>
  )
}

const colorFormatter = (type: number, opacity = false) => {
  switch (type) {
    case 0:
    case 4:
    case 6:
    case 7:
    case 8:
    case 9:
      return opacity ? "bg-victron-lime/30" : "bg-victron-lime/100"
    case 1:
      return opacity ? "bg-victron-cyan/30" : "bg-victron-cyan/100"
    case 2:
    case 11:
      return opacity ? "bg-victron-slate/30" : "bg-victron-slate/100"
    case 3:
    case 10:
      return opacity ? "bg-victron-green/30" : "bg-victron-green/100"
    case 5:
      return opacity ? "bg-victron-purple/30" : "bg-victron-purple/100"
  }
}

interface Props {
  percentage: number
  type: number
  orientation?: "vertical" | "horizontal"
  size?: "small" | "medium" | "large"
}

export default ProgressBar
