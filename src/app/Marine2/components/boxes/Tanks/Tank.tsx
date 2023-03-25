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
    level: "text-base",
  },
  "sm-s": {
    tankName: "text-sm ",
    level: "text-base",
  },
  "sm-m": {
    tankName: "text-sm ",
  },
  "md-s": {
    tankName: "text-base mr-4",
    level: "text-lg",
  },
  "lg-s": {
    tankName: "text-base mr-4",
    level: "text-lg",
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
  },
  "sm-s": {
    tankName: "text-base mr-5",
    level: "text-lg",
    capacity: "text-xs",
  },
  "md-s": {
    tankName: "text-lg mr-5",
    level: "text-xl",
    capacity: "text-xs",
  },
  "lg-s": {
    tankName: "text-lg mr-5",
    level: "text-xl",
    capacity: "text-xs",
  },
}

const Tank = ({ tankInstanceId, mode, levelWidth, orientation = "vertical", parentSize }: Props) => {
  let { capacity, fluidType, level, remaining, unit } = useTank(tankInstanceId)
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

  const fluidTypeTitle = useMemo(() => {
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
      <div ref={wrapperRef} className="flex flex-row items-center">
        <div className={classnames("flex items-center py-2 truncate")}>
          <div className="mr-2">{fluidIcon(fluidTypeNum, mode)}</div>
          <div className={classnames("truncate", compactActiveStyles?.tankName)}>{fluidTypeTitle} </div>
        </div>
        <div className="flex flex-row items-center basis-0 flex-grow justify-end">
          <div
            className={classnames("ml-4")}
            style={
              width
                ? {
                    display: width < 368 ? "none" : "block",
                    width: width > 572 ? (width + 32) * 0.5 : (width + 32) * 0.4,
                  }
                : {}
            }
          >
            <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} />
          </div>
          <div className="tank-level">
            <div style={levelWidth ? { width: levelWidth + "px" } : {}} className="pl-2 md:pl-5 text-right">
              <div
                className={classnames("flex flex-row", compactActiveStyles?.level, compactActiveStyles?.levelWidth, {
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
        <div>
          <div className="flex flex-row items-center">
            <div className={classnames("flex items-center truncate")}>
              <div className="mr-2 lg:mr-3">{fluidIcon(fluidTypeNum, mode)}</div>
              <div className="flex flex-col p-2 w-full truncate">
                <div className={classnames("truncate", verticalActiveStyles?.tankName)}>{fluidTypeTitle}</div>
                <div className={classnames("text-victron-gray", verticalActiveStyles?.capacity)}>
                  {formatCapacity(remaining) + "/" + formatCapacity(capacity) + "L"}
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
                    : {}
                }
              >
                <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} size={"large"} />
              </div>
              <div className="tank-level">
                <div
                  style={levelWidth ? { width: levelWidth + "px" } : {}}
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
        </div>
      )
    } else {
      // orientation === "horizontal"
      return (
        <div className="px-3">
          <div className="h-full w-full flex flex-row">
            <div className="min-w-[10%] h-auto">
              <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} orientation="vertical" />
            </div>
            <div className="flex flex-col justify-between min-w-[90%]">
              <div className="pt-2 px-2">
                <div className="mb-2">{fluidIcon(fluidTypeNum, mode)}</div>
                <div className="w-full tank-name">
                  <div className={classnames("whitespace-nowrap", horizontalActiveStyles?.tankName)}>
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
                  {formatCapacity(remaining) + "/" + formatCapacity(capacity) + "L"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
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
  levelWidth?: number
  mode?: "compact" | "full"
  orientation?: "vertical" | "horizontal"
  parentSize?: { width: number; height: number }
}

export default observer(Tank)
