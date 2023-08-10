import { useMemo, useRef } from "react"
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
import useSize from "@react-hook/size"

// styles for compact mode
const compactStyles: BreakpointStylesType = {
  default: {
    tankName: "text-sm ",
    level: "text-base min-w-[38px]",
  },
  "sm-s": {
    tankName: "text-sm ",
    level: "text-base min-w-[38px]",
  },
  "sm-m": {
    tankName: "text-sm min-w-[2rem]",
  },
  "md-s": {
    tankName: "text-base mr-4",
    level: "text-lg min-w-[3rem]",
  },
  "lg-s": {
    tankName: "text-base mr-4",
    level: "text-lg min-w-[3rem]",
  },
}

// styles for horizontal orientation
const horizontalStyles: BreakpointStylesType = {
  default: {
    tankName: "text-sm",
    level: "text-base",
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
    level: "text-lg min-w-[3rem]",
    capacity: "text-xs",
  },
  "sm-s": {
    tankName: "text-base mr-5",
    level: "text-lg min-w-[3rem]",
    capacity: "text-xs",
  },
  "md-s": {
    tankName: "text-lg mr-5",
    level: "text-xl min-w-[3.5rem]",
    capacity: "text-xs",
  },
  "lg-s": {
    tankName: "text-lg mr-5",
    level: "text-xl min-w-[3.5rem]",
    capacity: "text-xs",
  },
}

const Tank = ({ tankInstanceId, mode, levelWidth, orientation = "vertical", parentSize }: Props) => {
  let { capacity, fluidType, level, remaining, customName, unit } = useTank(tankInstanceId)
  const fluidTypeNum = +fluidType
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [width] = useSize(wrapperRef)

  let horizontalActiveStyles,
    verticalActiveStyles,
    compactActiveStyles: StylesType = {}
  if (parentSize) {
    compactActiveStyles = applyStyles(parentSize, compactStyles)
    verticalActiveStyles = applyStyles(parentSize, verticalStyles)
    horizontalActiveStyles = applyStyles(parentSize, horizontalStyles)
  }

  const tankTitle = useMemo(() => {
    const fluids = [
      translate("tankWidget.Fuel"),
      translate("tankWidget.Fresh water"),
      translate("tankWidget.Waste water"),
      translate("tankWidget.Live well"),
      translate("tankWidget.Oil"),
      translate("tankWidget.Black water"),
      translate("tankWidget.Gasoline"),
      translate("tankWidget.Diesel"),
      translate("tankWidget.LPG"),
      translate("tankWidget.LNG"),
      translate("tankWidget.Hydraulic oil"),
      translate("tankWidget.Raw water"),
    ]

    return customName || fluids[fluidTypeNum]
  }, [fluidTypeNum, customName])

  // tanks that are missing level readings and only have capacity
  let isAuxillaryTank = !!capacity && level === undefined

  if (mode === "compact") {
    return (
      <div ref={wrapperRef} className="flex flex-row items-center">
        <div className={classnames("flex items-center py-2 truncate")}>
          <div className="mr-2">{fluidIcon(fluidTypeNum, mode)}</div>
          <div className={classnames("truncate", compactActiveStyles?.tankName)}>{tankTitle} </div>
        </div>
        <div className="flex flex-row items-center basis-0 flex-grow justify-end">
          <div
            className={classnames("ml-4")}
            style={
              width
                ? {
                    display: width < 368 ? "none" : "block",
                    width: width > 572 ? (width + 32) * 0.45 : (width + 32) * 0.4,
                  }
                : parentSize?.width
                ? {
                    display: parentSize.width < 400 ? "none" : "block",
                    width: parentSize.width > 540 ? parentSize.width * 0.45 : parentSize.width * 0.4,
                  }
                : {}
            }
          >
            <ProgressBar percentage={isAuxillaryTank ? 0 : levelFormatter(level)} type={fluidTypeNum} />
          </div>
          <div className="tank-level">
            <div style={levelWidth ? { width: roundLevelWidth(levelWidth + 4) + "px" } : {}} className="pl-2 md:pl-5">
              <div
                className={classnames("flex flex-row", compactActiveStyles?.level, {
                  "text-victron-red": level > 75,
                })}
              >
                <div>{isAuxillaryTank ? "--" : levelFormatter(level)}</div>
                <div
                  className={classnames({
                    "text-victron-red/70": level > 75,
                    "text-victron-gray/70": level <= 75 || level === undefined,
                  })}
                >
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    if (orientation === "vertical") {
      return (
        <div ref={wrapperRef}>
          <div className="flex flex-row items-center">
            <div className={classnames("flex items-center truncate")}>
              <div className="mr-2 lg:mr-3">{fluidIcon(fluidTypeNum, mode)}</div>
              <div className="flex flex-col p-2 w-full truncate">
                <div className={classnames("truncate", verticalActiveStyles?.tankName)}>{tankTitle}</div>
                <div className={classnames("text-victron-gray", verticalActiveStyles?.capacity)}>
                  {isAuxillaryTank
                    ? "--/" + formatCapacity(capacity, +unit) + unitFormatter(+unit)
                    : formatCapacity(remaining, +unit) + "/" + formatCapacity(capacity, +unit) + unitFormatter(+unit)}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center basis-0 flex-grow justify-end">
              <div
                className={classnames("flex items-center justify-center")}
                style={
                  width
                    ? {
                        width: width > 1000 ? width * 0.7 : width * 0.5,
                        display: width < 368 ? "none" : "block",
                      }
                    : parentSize?.width
                    ? {
                        width: parentSize.width > 1000 ? parentSize.width * 0.7 : parentSize.width * 0.5,
                        display: parentSize.width < 400 ? "none" : "block",
                      }
                    : {}
                }
              >
                <ProgressBar
                  percentage={isAuxillaryTank ? 0 : levelFormatter(level)}
                  type={fluidTypeNum}
                  size={"large"}
                />
              </div>
              <div className="tank-level">
                <div
                  style={levelWidth ? { width: roundLevelWidth(levelWidth) + "px" } : {}}
                  className="flex items-center justify-center pl-2 md:pl-5"
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
                    <div>{isAuxillaryTank ? "--" : levelFormatter(level)}</div>
                    <div
                      className={classnames({
                        "text-victron-red/70": level > 75,
                        "text-victron-gray/70": level <= 75 || level === undefined,
                      })}
                    >
                      {" %"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      // orientation === "horizontal" (orientation of the screen view)
      return (
        <div className="px-4">
          <div className="h-full w-full flex flex-row">
            <div className="min-w-[10%] h-auto">
              <ProgressBar
                percentage={isAuxillaryTank ? 0 : levelFormatter(level)}
                type={fluidTypeNum}
                orientation="vertical"
              />
            </div>
            <div className="flex flex-col justify-between min-w-[90%]">
              <div className="pt-2 px-2">
                <div className="mb-2">{fluidIcon(fluidTypeNum, "compact")}</div>
                <div className="w-full tank-name">
                  <div className={classnames("whitespace-nowrap", horizontalActiveStyles?.tankName)}>{tankTitle}</div>
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
                  <div>{isAuxillaryTank ? "--" : levelFormatter(level)}</div>
                  <div
                    className={classnames({
                      "text-victron-red/70": level > 75,
                      "text-victron-gray/70": level <= 75 || level === undefined,
                    })}
                  >
                    {" %"}
                  </div>
                </div>
                <div className={classnames("text-victron-gray", horizontalActiveStyles?.capacity)}>
                  {isAuxillaryTank
                    ? "--/" + formatCapacity(capacity, +unit) + unitFormatter(+unit)
                    : formatCapacity(remaining, +unit) + "/" + formatCapacity(capacity, +unit) + unitFormatter(+unit)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

// Convert remaining and total capacity to required unit from m3
const formatCapacity = (capacity: number, unit: number) => {
  if (capacity === undefined) return "--"

  switch (unit) {
    case 0:
      return Number(capacity.toFixed(2))
    case 1:
      return Math.round(capacity * 1000)
    case 2:
      return Math.round(capacity * 219.969)
    case 3:
      return Math.round(capacity * 264.172)
    default:
      return Math.round(capacity)
  }
}

const unitFormatter = (unit: number) => {
  switch (unit) {
    case 0:
      return "m³"
    case 1:
      return "ℓ"
    case 2:
      return "gal"
    case 3:
      return "gal"
    default:
      return "m³"
  }
}

const levelFormatter = (level: number) => {
  return Math.round(level)
}

const roundLevelWidth = (width: number) => {
  return Math.ceil(width)
}

const fluidIcon = (type: number, mode: string = "compact", isComponent: boolean = true) => {
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
      return isComponent ? <FuelIcon className={mode === "compact" ? "w-5 md:w-7" : "w-9"} /> : FuelIcon
    case 1:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return isComponent ? <WaterIcon className={mode === "compact" ? "w-5 md:w-7" : "w-9"} /> : WaterIcon
    case 2:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return isComponent ? <GrayWaterIcon className={mode === "compact" ? "w-5 md:w-7" : "w-9"} /> : GrayWaterIcon
    case 5:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return isComponent ? <BlackWaterIcon className={mode === "compact" ? "w-5 md:w-7" : "w-9"} /> : BlackWaterIcon
    default:
      return null
  }
}

interface Props {
  tankInstanceId: number
  levelWidth?: number
  mode?: "compact" | "full"
  orientation?: "vertical" | "horizontal"
  parentSize?: { width: number; height: number }
}

export default observer(Tank)
