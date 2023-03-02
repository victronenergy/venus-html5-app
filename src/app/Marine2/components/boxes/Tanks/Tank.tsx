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
    nameCols: "col-span-7",
    progressCols: "hidden",
    levelCols: "col-span-2",
  },
  "md-s": {
    tankName: "text-base",
    level: "text-lg",
    nameCols: "col-span-4",
    progressCols: "col-span-3",
    levelCols: "col-span-2",
  },
  "lg-s": {
    nameCols: "col-span-4",
    progressCols: "col-span-4",
    levelCols: "col-span-1",
  },
  default: {
    nameCols: "col-span-7",
    progressCols: "hidden",
    levelCols: "col-span-2",
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
    tankName: "text-base",
    level: "text-lg",
    capacity: "text-sm",
  },
  "md-s": {
    tankName: "text-base",
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
    nameCols: "col-span-3",
    progressCols: "col-span-4",
  },
  "sm-s": {
    tankName: "text-lg",
    level: "text-xl",
    capacity: "text-xs",
    nameCols: "col-span-3",
    progressCols: "col-span-4",
  },
  "md-s": {
    tankName: "text-lg",
    level: "text-xl",
    capacity: "text-xs",
    nameCols: "col-span-2",
    progressCols: "col-span-5",
  },
}

const Tank = ({ tankInstanceId, mode, orientation = "vertical", parentSize }: Props) => {
  let { capacity, fluidType, level, remaining, unit } = useTank(tankInstanceId)
  const fluidTypeNum = +fluidType

  let compactActiveStyles,
    horizontalActiveStyles,
    verticalActiveStyles: StylesType = {}
  if (parentSize) {
    compactActiveStyles = applyStyles(parentSize, compactStyles)
    horizontalActiveStyles = applyStyles(parentSize, horizontalStyles)
    verticalActiveStyles = applyStyles(parentSize, verticalStyles)
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
        <div className="grid grid-cols-9">
          <div className={classnames("flex items-center", compactActiveStyles?.nameCols)}>
            <div>{fluidIcon(fluidTypeNum, mode)}</div>
            <div className={"flex flex-col w-full p-2"}>
              <div className={classnames("truncate text-ellipsis overflow-hidden", compactActiveStyles?.tankName)}>
                {fluidTypeTitle}
              </div>
            </div>
          </div>
          <div className={classnames("flex items-center justify-center", compactActiveStyles?.progressCols)}>
            <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} />
          </div>
          <div className={classnames("flex items-center justify-end", compactActiveStyles?.levelCols)}>
            <div
              className={classnames("flex flex-row", compactActiveStyles?.level, {
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
        <div className="grid grid-cols-8 gap-2">
          <div className={classnames("flex items-center", verticalActiveStyles?.nameCols)}>
            <div>{fluidIcon(fluidTypeNum, mode)}</div>
            <div className="flex flex-col p-2 w-full">
              <div className={classnames("truncate text-ellipsis overflow-hidden", verticalActiveStyles?.tankName)}>
                {fluidTypeTitle}
              </div>
              <div
                className={classnames("text-victron-gray dark:text-victron-gray-dark", verticalActiveStyles?.capacity)}
              >
                {formatCapacity(remaining) + "/" + formatCapacity(capacity) + " l"}
              </div>
            </div>
          </div>
          <div className={classnames("flex items-center justify-center", verticalActiveStyles?.progressCols)}>
            <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} />
          </div>
          <div className="col-span-1 flex items-center justify-center">
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
    <div className="h-full w-full grid grid-cols-8">
      <div className="w-full col-span-1">
        <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} orientation="vertical" />
      </div>
      <div className="col-span-7 flex flex-col justify-between">
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
          <div
            className={classnames("text-victron-gray dark:text-victron-gray-dark", horizontalActiveStyles?.capacity)}
          >
            {formatCapacity(remaining) + "/" + formatCapacity(capacity) + " l"}
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
