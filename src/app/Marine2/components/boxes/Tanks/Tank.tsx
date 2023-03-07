import { useMemo } from "react"
import { useTank } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import ProgressBar from "../../ui/ProgressBar"
import classnames from "classnames"
import { translate } from "react-i18nify"
import FuelIcon from "../../../images/icons/fuel.svg"
import WaterIcon from "../../../images/icons/fresh-water.svg"
import BlackWaterIcon from "../../../images/icons/black-water.svg"
import GrayWaterIcon from "../../../images/icons/waste-water.svg"
import { applyStyles, BreakpointStylesType, StylesType } from "app/Marine2/utils/media"

// styles for compact mode
const compactStyles: BreakpointStylesType = {
  "sm-s": {
    tankName: "text-sm",
    level: "text-base",
    nameWidth: "w-[50%]",
    progressWidth: "w-[40%]",
    levelWidth: "w-[10%]",
  },
  "md-s": {
    tankName: "text-base",
    level: "text-lg",
    nameWidth: "w-[40%]",
    progressWidth: "w-[50%]",
    levelWidth: "w-[10%]",
  },
  "lg-s": {
    tankName: "text-base",
    level: "text-lg",
    nameWidth: "w-[30%]",
    progressWidth: "w-[60%]",
    levelWidth: "w-[10%]",
  },
  default: {
    tankName: "text-sm",
    level: "text-base",
    nameWidth: "w-[50%]",
    progressWidth: "w-[40%]",
    levelWidth: "w-[10%]",
  },
}

// styles for horizontal orientation
const horizontalStyles: BreakpointStylesType = {
  default: {
    tankName: "text-base",
    level: "text-md",
    capacity: "text-xs",
  },
  "sm-s": {
    tankName: "text-md",
    level: "text-lg",
    capacity: "text-sm",
  },
  "md-s": {
    tankName: "text-md",
    level: "text-xl",
    capacity: "text-sm",
  },
}

// styles for vertical orientation
const verticalStyles: BreakpointStylesType = {
  default: {
    tankName: "text-base",
    level: "text-lg",
    capacity: "text-xs",
    nameWidth: "w-[50%]",
    progressWidth: "w-[40%]",
  },
  "sm-s": {
    tankName: "text-base",
    level: "text-lg",
    capacity: "text-xs",
    nameWidth: "w-[40%]",
    progressWidth: "w-[50%]",
  },
  "md-s": {
    tankName: "text-lg",
    level: "text-xl",
    capacity: "text-xs",
    nameWidth: "w-[40%]",
    progressWidth: "w-[50%]",
  },
  "lg-s": {
    tankName: "text-lg",
    level: "text-xl",
    capacity: "text-xs",
    nameWidth: "w-[20%]",
    progressWidth: "w-[70%]",
  },
}

const Tank = ({ tankInstanceId, mode, orientation = "vertical", parentSize }: Props) => {
  let { capacity, fluidType, level, remaining, unit } = useTank(tankInstanceId)
  const fluidTypeNum = +fluidType

  let horizontalActiveStyles,
    verticalActiveStyles,
    compactActiveStyles: StylesType = {}
  if (parentSize) {
    compactActiveStyles = applyStyles(parentSize, compactStyles)
    verticalActiveStyles = applyStyles(parentSize, verticalStyles)
    horizontalActiveStyles = applyStyles(parentSize, horizontalStyles)
  }

  const fluidTypeTitle = useMemo(() => {
    const fluids = [
      translate("tankWidget.Fuel"),
      translate("tankWidget.Fresh water"),
      translate("tankWidget.Waste water"),
      translate("tankWidget.Live well"),
      translate("tankWidget.Oil"),
      translate("tankWidget.Black water"),
      translate("tankWidget.Gasoline"),
      translate("Diesel"),
      translate("Liquid Petroleum Gas (LPG)"),
      translate("Liquid Natural Gas (LNG)"),
      translate("Hydraulic oil"),
      translate("Raw water"),
    ]

    return fluids[fluidTypeNum]
  }, [fluidTypeNum])

  // check if tank values are not undefined
  if (
    capacity === undefined ||
    fluidType === undefined ||
    level === undefined ||
    remaining === undefined ||
    unit === undefined
  ) {
    return null
  }

  if (mode === "compact") {
    return (
      <div>
        <div className="flex flex-row justify-between">
          <div
            className={classnames(
              "flex items-center truncate text-ellipsis overflow-hidden",
              compactActiveStyles?.nameWidth
            )}
          >
            <div>{fluidIcon(fluidTypeNum, mode)}</div>
            <div className="flex flex-col p-1 sm:p-2 w-full">
              <div className={classnames("truncate text-ellipsis overflow-hidden", compactActiveStyles?.tankName)}>
                {fluidTypeTitle}
              </div>
            </div>
          </div>
          <div className={classnames("flex items-center justify-center", compactActiveStyles?.progressWidth)}>
            <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} />
          </div>
          <div className="flex items-center justify-center">
            <div
              className={classnames("flex flex-row mr-5", compactActiveStyles?.level, compactActiveStyles?.levelWidth, {
                "text-victron-red": level > 75,
              })}
            >
              <div>{levelFormatter(level)}</div>
              <div
                className={classnames({
                  "text-victron-red/70": level > 75,
                  "text-victron-gray/70": level <= 75,
                })}
              >
                {" %"}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (orientation === "vertical") {
    return (
      <div>
        <div className="flex flex-row justify-between">
          <div
            className={classnames("flex items-center", verticalActiveStyles?.tankName, verticalActiveStyles?.nameWidth)}
          >
            <div>{fluidIcon(fluidTypeNum, mode)}</div>
            <div className="flex flex-col p-2 w-full">
              <div className="truncate text-ellipsis overflow-hidden">{fluidTypeTitle}</div>
              <div className="text-victron-gray">
                {formatCapacity(remaining) + "/" + formatCapacity(capacity) + " l"}
              </div>
            </div>
          </div>
          <div
            className={classnames(
              "flex items-center justify-center",
              verticalActiveStyles?.progressWidth,
              verticalActiveStyles?.nameWidth
            )}
          >
            <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} />
          </div>
          <div className="flex items-center justify-center">
            <div
              className={classnames(
                "flex flex-row",
                {
                  "text-victron-red": level > 75,
                },
                verticalActiveStyles?.level
              )}
            >
              <div>{levelFormatter(level)}</div>
              <div
                className={classnames({
                  "text-victron-red/70": level > 75,
                  "text-victron-gray/70": level <= 75,
                })}
              >
                {" %"}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    // show 4 tanks per page in a row on horizontal orientation (25% of the width)
    <div className="min-w-[25%] px-3">
      <div className="h-full w-full flex flex-row">
        <div className="min-w-[10%] h-auto">
          <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} orientation="vertical" />
        </div>
        <div className="flex flex-col justify-between min-w-[90%]">
          <div className="pt-2">
            <div>{fluidIcon(fluidTypeNum, mode)}</div>
            <div className="w-full">
              <div className={classnames("truncate text-ellipsis overflow-hidden", horizontalActiveStyles?.tankName)}>
                {fluidTypeTitle}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className={classnames(
                "flex flex-row",
                {
                  "text-victron-red": level > 75,
                },
                horizontalActiveStyles?.level
              )}
            >
              <div>{levelFormatter(level)}</div>
              <div
                className={classnames({
                  "text-victron-red/70": level > 75,
                  "text-victron-gray/70": level <= 75,
                })}
              >
                {" %"}
              </div>
            </div>
            <div className={classnames("text-victron-gray", horizontalActiveStyles?.capacity)}>
              {formatCapacity(remaining) + "/" + formatCapacity(capacity) + " l"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Convert remaining and total capacity to liters from m3
const formatCapacity = (capacity: number) => {
  return Math.round(capacity * 1000)
}

const levelFormatter = (level: number) => {
  return Math.round(level)
}

const fluidIcon = (type: number, mode: string = "compact") => {
  switch (type) {
    case 0:
    case 3:
    case 4:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return <FuelIcon className={mode === "compact" ? "w-7" : "w-9"} />
    case 1:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return <WaterIcon className={mode === "compact" ? "w-7" : "w-9"} />
    case 2:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return <GrayWaterIcon className={mode === "compact" ? "w-7" : "w-9"} />
    case 5:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return <BlackWaterIcon className={mode === "compact" ? "w-7" : "w-9"} />
    default:
      return null
  }
}

interface Props {
  tankInstanceId: number
  mode?: "compact" | "full"
  orientation?: "vertical" | "horizontal"
  parentSize?: { width: number; height: number }
}

export default observer(Tank)
