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
    tankName: "text-sm ",
    level: "text-base",
    progressBar: "block",
  },
  "sm-m": {
    tankName: "text-sm ",
    progressBar: "block",
  },
  "md-s": {
    tankName: "text-base mr-4",
    level: "text-lg",
    progressBar: "block",
  },
  "lg-s": {
    tankName: "text-base mr-4",
    level: "text-lg",
    progressBar: "block",
  },
  default: {
    tankName: "text-sm ",
    level: "text-base",
    progressBar: "hidden",
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
    tankName: "text-base mr-5",
    level: "text-lg",
    capacity: "text-xs",
    progressBar: "hidden",
  },
  "sm-s": {
    tankName: "text-base mr-5",
    level: "text-lg",
    capacity: "text-xs",
    progressBar: "hidden",
  },
  "md-s": {
    tankName: "text-lg mr-5",
    level: "text-xl",
    capacity: "text-xs",
    progressBar: "block",
  },
  "lg-s": {
    tankName: "text-lg mr-5",
    level: "text-xl",
    capacity: "text-xs",
    progressBar: "block",
  },
}

const Tank = ({ tankInstanceId, mode, nameWidth, levelWidth, orientation = "vertical", parentSize }: Props) => {
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
      <div className="flex flex-row justify-between items-center">
        <div className="tank-name">
          <div
            style={nameWidth !== 0 ? { width: nameWidth + "px" } : {}}
            className={"flex items-center whitespace-nowrap py-2"}
          >
            <div>{fluidIcon(fluidTypeNum, mode)}</div>
            <div className={classnames("", compactActiveStyles?.tankName)}>{fluidTypeTitle}</div>
          </div>
        </div>
        <div
          className={classnames(
            "flex items-center justify-center basis-0 flex-grow mx-4",
            compactActiveStyles?.progressWidth,
            compactActiveStyles?.progressBar
          )}
        >
          <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} />
        </div>
        <div className="tank-level">
          <div style={levelWidth ? { width: levelWidth + "px" } : {}} className="flex items-center justify-center pl-5">
            <div
              className={classnames("flex flex-row ", compactActiveStyles?.level, compactActiveStyles?.levelWidth, {
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
        <div className="flex flex-row justify-between items-center">
          <div className="tank-name">
            <div style={nameWidth !== 0 ? { width: nameWidth + "px" } : {}} className={classnames("flex items-center")}>
              <div>{fluidIcon(fluidTypeNum, mode)}</div>
              <div className="flex flex-col p-2 w-full whitespace-nowrap">
                <div className={classnames("", verticalActiveStyles?.tankName)}>{fluidTypeTitle}</div>
                <div className={classnames("text-victron-gray", verticalActiveStyles?.capacity)}>
                  {formatCapacity(remaining) + "/" + formatCapacity(capacity) + "l"}
                </div>
              </div>
            </div>
          </div>
          <div
            className={classnames(
              "flex items-center justify-center basis-0 flex-grow",
              verticalActiveStyles?.progressBar
            )}
          >
            <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} />
          </div>
          <div className="tank-level">
            <div
              style={levelWidth ? { width: levelWidth + "px" } : {}}
              className="flex items-center justify-center pl-5"
            >
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
      </div>
    )
  }

  return (
    <div className="px-3">
      <div className="h-full w-full flex flex-row">
        <div className="min-w-[10%] h-auto">
          <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} orientation="vertical" />
        </div>
        <div className="flex flex-col justify-between min-w-[90%]">
          <div className="pt-2 px-2">
            <div>{fluidIcon(fluidTypeNum, mode)}</div>
            <div className="w-full tank-name">
              <div
                style={nameWidth ? { width: nameWidth + "px" } : {}}
                className={classnames("whitespace-nowrap", horizontalActiveStyles?.tankName)}
              >
                {fluidTypeTitle}
              </div>
            </div>
          </div>
          <div className="flex flex-col px-2">
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
              {formatCapacity(remaining) + "/" + formatCapacity(capacity) + "l"}
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
  nameWidth?: number
  levelWidth?: number
  mode?: "compact" | "full"
  orientation?: "vertical" | "horizontal"
  parentSize?: { width: number; height: number }
}

export default observer(Tank)
