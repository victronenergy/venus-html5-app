import { useEffect, useMemo, useRef, useState } from "react"
import { useTank } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react-lite"
import ProgressBar from "../../../ui/ProgressBar"
import classnames from "classnames"
import { ISize } from "@m2Types/generic/size"
import { applyStyles, StylesType } from "../../../../utils/media"
import useSize from "@react-hook/size"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { compactStyles, horizontalStyles, verticalStyles } from "./Styles"
import { FLUID_TRANSLATIONS } from "../../../../utils/constants/fluids"
import { formatLevelFor } from "../../../../utils/formatters/devices/tanks/format-level-for"
import { FluidIcon } from "./FluidIcon/FluidIcon"
import { ValueWithPercentage } from "./ValueWithPercentage/ValueWithPercentage"
import { Capacity } from "./Capacity/Capacity"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"

interface Props {
  tankInstanceId: number
  levelWidth?: number
  componentMode?: ComponentMode
  orientation?: ScreenOrientation
  parentSize?: ISize
}

const Tank = ({ tankInstanceId, componentMode, levelWidth, orientation = "vertical", parentSize }: Props) => {
  let { capacity, fluidType, level, remaining, customName, unit } = useTank(tankInstanceId)
  const fluidTypeNum = +fluidType
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [width] = useSize(wrapperRef)
  const [isComponentVisible, setIsComponentVisible] = useState(false)

  let horizontalActiveStyles,
    verticalActiveStyles,
    compactActiveStyles: StylesType = {}

  if (parentSize) {
    compactActiveStyles = applyStyles(parentSize, compactStyles)
    verticalActiveStyles = applyStyles(parentSize, verticalStyles)
    horizontalActiveStyles = applyStyles(parentSize, horizontalStyles)
  }

  const tankTitle = useMemo(() => customName || FLUID_TRANSLATIONS[fluidTypeNum], [fluidTypeNum, customName])

  useEffect(() => {
    setIsComponentVisible(level !== undefined || capacity !== undefined)
  }, [level, capacity])

  if (!isComponentVisible) return <></>

  // Tanks that are missing level readings and only have capacity
  const isAuxillaryTank = !!capacity && level === undefined

  if (componentMode === "compact") {
    return (
      <div ref={wrapperRef} className="flex items-center">
        <div className={classnames("flex items-center min-w-[30%] py-2 truncate")}>
          <FluidIcon fluid={fluidTypeNum} className={`mr-2 ${compactActiveStyles?.icon}`} />
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
            <ProgressBar percentage={isAuxillaryTank ? 0 : formatLevelFor(level)} type={fluidTypeNum} />
          </div>
          <ValueWithPercentage
            fluid={fluidTypeNum}
            level={level}
            className={compactActiveStyles?.level}
            isAuxillaryTank={isAuxillaryTank}
          />
        </div>
      </div>
    )
  }

  if (orientation === "vertical") {
    return (
      <div ref={wrapperRef} className="flex items-center">
        <div className={classnames("flex items-center min-w-[15%] truncate")}>
          <div className="mr-2 lg:mr-3">
            <FluidIcon fluid={fluidTypeNum} className="w-[24px] md:w-[32px]" />
          </div>
          <div className="flex flex-col p-2 w-full truncate">
            <div className={classnames("truncate", verticalActiveStyles?.tankName)}>{tankTitle}</div>
            <Capacity
              remaining={remaining}
              unit={unit}
              capacity={capacity}
              className={verticalActiveStyles?.capacity}
            />
          </div>
        </div>

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
          <ProgressBar percentage={isAuxillaryTank ? 0 : formatLevelFor(level)} type={fluidTypeNum} size="large" />
        </div>
        <ValueWithPercentage
          fluid={fluidTypeNum}
          level={level}
          className={verticalActiveStyles?.level}
          isAuxillaryTank={isAuxillaryTank}
        />
      </div>
    )
  }

  return (
    <div className="px-4">
      <div className="h-full w-full flex flex-row">
        <div className="min-w-[10%] h-auto">
          <ProgressBar
            percentage={isAuxillaryTank ? 0 : formatLevelFor(level)}
            type={fluidTypeNum}
            orientation="vertical"
          />
        </div>
        <div className="flex flex-col justify-between min-w-[90%]">
          <div className="pt-2 px-2">
            <div className="mb-2">
              <FluidIcon fluid={fluidTypeNum} className="w-5" />
            </div>
            <div className="w-full tank-name">
              <div className={classnames("whitespace-nowrap", horizontalActiveStyles?.tankName)}>{tankTitle}</div>
            </div>
          </div>
          <div className="flex flex-col px-2">
            <ValueWithPercentage
              fluid={fluidTypeNum}
              level={level}
              className={horizontalActiveStyles?.level}
              isAuxillaryTank={isAuxillaryTank}
              orientation={orientation}
            />
            <Capacity
              remaining={remaining}
              unit={unit}
              capacity={capacity}
              className={horizontalActiveStyles?.capacity}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Tank)
