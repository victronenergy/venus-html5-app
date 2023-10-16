import classnames from "classnames"
import { tankColorFor } from "../../../utils/helpers/devices/tanks/tank-color-for"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"

interface Props {
  percentage: number
  type: number
  orientation?: ScreenOrientation
  size?: "small" | "medium" | "large"
}

const ProgressBar = ({ percentage, type, orientation = "horizontal", size = "small" }: Props) => {
  const color = tankColorFor(type)
  const bgColor = tankColorFor(type, true)

  if (orientation === "horizontal") {
    return (
      <div className="w-full flex">
        <div
          className={classnames(`w-1/4 rounded-l-2xl ${bgColor}`, size === "small" ? "h-2" : "h-2 md:h-4 md:mr-0.5")}
        >
          <div
            className={classnames(`h-full rounded-l-2xl ${color}`)}
            style={{ width: percentage >= 25 ? "100%" : `${percentage * 4}%` }}
          />
        </div>
        <div className={classnames(`w-1/4 ${bgColor}`, size === "small" ? "h-2" : "h-2 md:h-4 md:mr-0.5")}>
          <div
            className={classnames(`h-full ${color}`)}
            style={{ width: percentage >= 50 ? "100%" : percentage <= 25 ? "0%" : `${(percentage - 25) * 4}%` }}
          />
        </div>
        <div className={classnames(`w-1/4 ${bgColor}`, size === "small" ? "h-2" : "h-2 md:h-4 md:mr-0.5")}>
          <div
            className={classnames(`h-full ${color}`)}
            style={{ width: percentage >= 75 ? "100%" : percentage <= 50 ? "0%" : `${(percentage - 50) * 4}%` }}
          />
        </div>
        <div
          className={classnames(`w-1/4 rounded-r-2xl ${bgColor}`, size === "small" ? "h-2" : "h-2 md:h-4 md:mr-0.5")}
        >
          <div
            className={classnames(`h-full rounded-r-2xl ${color}`)}
            style={{ width: percentage <= 75 ? "0%" : `${(percentage - 75) * 4}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col-reverse items-center">
      <div className={classnames(`h-1/4 rounded-t-2xl w-3 md:w-3 m-0.5 ${bgColor} rotate-180`)}>
        <div
          className={classnames(`w-full rounded-t-2xl ${color}`)}
          style={{ height: percentage >= 25 ? "100%" : `${percentage * 4}%` }}
        />
      </div>
      <div className={classnames(`h-1/4 w-3 md:w-3 m-0.5 ${bgColor} rotate-180`)}>
        <div
          className={classnames(`w-full ${color}`)}
          style={{ height: percentage >= 50 ? "100%" : percentage <= 25 ? "0%" : `${(percentage - 25) * 4}%` }}
        />
      </div>
      <div className={classnames(`h-1/4 w-3 md:w-3 m-0.5 ${bgColor} rotate-180`)}>
        <div
          className={classnames(`w-full ${color}`)}
          style={{ height: percentage >= 75 ? "100%" : percentage <= 50 ? "0%" : `${(percentage - 50) * 4}%` }}
        />
      </div>
      <div className={classnames(`h-1/4 w-3 md:w-3 m-0.5 rounded-b-2xl ${bgColor} rotate-180`)}>
        <div
          className={classnames(`w-full rounded-b-2xl ${color}`)}
          style={{ height: percentage <= 75 ? "0%" : `${(percentage - 75) * 4}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
