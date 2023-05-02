import { useRef } from "react"
import { observer } from "mobx-react-lite"
import ProgressBar from "../../ui/ProgressBar"
import classnames from "classnames"
import FuelIcon from "../../../images/icons/fuel.svg"
import WaterIcon from "../../../images/icons/fresh-water.svg"
import BlackWaterIcon from "../../../images/icons/black-water.svg"
import GrayWaterIcon from "../../../images/icons/waste-water.svg"
import { applyStyles, BreakpointStylesType, StylesType } from "app/Marine2/utils/media"
import ValueOverview from "../../ui/ValueOverview/ValueOverview"


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

const AuxillaryTank = ({
  title,
  capacity,
  fluidTypeNum,
  mode,
  levelWidth,
  orientation = "vertical",
  parentSize,
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  let horizontalActiveStyles,
    verticalActiveStyles: StylesType = {}
  if (parentSize) {
    verticalActiveStyles = applyStyles(parentSize, verticalStyles)
    horizontalActiveStyles = applyStyles(parentSize, horizontalStyles)
  }

  // tanks that are missing level readings and only have capacity

  if (mode === "compact") {
    return (
      <ValueOverview
        title={title}
        value={formatCapacity(capacity)}
        unit="L"
        boxSize={parentSize!}
        // @ts-ignore
        Icon={fluidIcon(fluidTypeNum, mode, false)}
      />
    )
  } else {
    if (orientation === "vertical") {
      return (
        <div ref={wrapperRef}>
          <div className="flex flex-row items-center">
            <div className={classnames("flex items-center truncate")}>
              <div className="mr-2 lg:mr-3">{fluidIcon(fluidTypeNum, mode)}</div>
              <div className="flex flex-col p-2 w-full truncate">
                <div className={classnames("truncate", verticalActiveStyles?.tankName)}>{title}</div>
                <div className={classnames("text-victron-gray", verticalActiveStyles?.capacity)}>
                  {formatCapacity(capacity) + "L"}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center basis-0 flex-grow justify-end">
              <div className="tank-level">
                <div
                  style={levelWidth ? { width: levelWidth + "px" } : {}}
                  className="flex items-center justify-center pl-2 md:pl-5"
                >
                  <div className={classnames("flex flex-row", verticalActiveStyles?.level)}>
                    <div>{formatCapacity(capacity) + "L"}</div>
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
              <ProgressBar percentage={levelFormatter(0)} type={fluidTypeNum} orientation="vertical" />
            </div>
            <div className="flex flex-col justify-between min-w-[90%]">
              <div className="pt-2 px-2">
                <div className="mb-2">{fluidIcon(fluidTypeNum, "compact")}</div>
                <div className="w-full tank-name">
                  <div className={classnames("whitespace-nowrap", horizontalActiveStyles?.tankName)}>{title}</div>
                </div>
              </div>
              <div className="flex flex-col px-2">
                <div className={classnames("flex flex-row", horizontalActiveStyles?.level)}>
                  <div>{formatCapacity(capacity) + "L"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

// Convert capacity from m3 to L and round to nearest integer and return as number
const formatCapacity = (capacity: number): number => {
  return Math.round(capacity * 1000)
}

const levelFormatter = (level: number) => {
  return Math.round(level)
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
      return isComponent ? <FuelIcon className={mode === "compact" ? "w-7" : "w-9"} /> : FuelIcon
    case 1:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return isComponent ? <WaterIcon className={mode === "compact" ? "w-7" : "w-9"} /> : WaterIcon
    case 2:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return isComponent ? <GrayWaterIcon className={mode === "compact" ? "w-7" : "w-9"} /> : GrayWaterIcon
    case 5:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return isComponent ? <BlackWaterIcon className={mode === "compact" ? "w-7" : "w-9"} /> : BlackWaterIcon
    default:
      return null
  }
}

interface Props {
  levelWidth?: number
  mode?: "compact" | "full"
  orientation?: "vertical" | "horizontal"
  parentSize?: { width: number; height: number }
  capacity: number
  fluidTypeNum: number
  title: string
}

export default observer(AuxillaryTank)
