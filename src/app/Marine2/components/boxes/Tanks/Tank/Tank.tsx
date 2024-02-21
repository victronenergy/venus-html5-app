import { useEffect, useMemo, useState } from "react"
import classNames from "classnames"
import { useTank } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react-lite"
import ProgressBar from "../../../ui/ProgressBar"
import classnames from "classnames"
import { ISize } from "@m2Types/generic/size"
import { applyStyles, StylesType } from "../../../../utils/media"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { compactStyles, horizontalStyles, verticalStyles } from "./Styles"
import { formatLevelFor } from "../../../../utils/formatters/devices/tanks/format-level-for"
import { FluidIcon } from "./FluidIcon/FluidIcon"
import { ValueWithPercentage } from "./ValueWithPercentage/ValueWithPercentage"
import { Capacity } from "./Capacity/Capacity"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"
import { FLUID_TRANSLATIONS } from "../../../../utils/constants/devices/tanks"

interface Props {
  tankInstanceId: number
  componentMode?: ComponentMode
  orientation?: ScreenOrientation
  parentSize?: ISize
}

const Tank = ({ tankInstanceId, componentMode, orientation = "vertical", parentSize }: Props) => {
  let { capacity, fluidType, level, remaining, customName, unit } = useTank(tankInstanceId)
  const fluidTypeNum = +fluidType
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
  const tempWidth = parentSize ? parentSize.width : {}

  const iconContainerClasses = classNames("flex items-center gap-1 truncate", {
    "w-[10rem]": tempWidth > 572 || tempWidth < 400,
    "w-[5rem]": tempWidth <= 572 && tempWidth >= 400,
  })

  const progressBarContainerClasses = classNames({
    "w-[calc(100%-14rem)]": tempWidth > 572,
    "w-[calc(100%-9rem)]": tempWidth <= 572,
    hidden: tempWidth < 400,
  })

  if (componentMode === "compact") {
    return (
      <div className="flex justify-between items-center gap-2">
        <div className={iconContainerClasses}>
          <FluidIcon fluid={fluidTypeNum} className={compactActiveStyles?.icon} />
          <div className={classnames("truncate", compactActiveStyles?.tankName)}>{tankTitle} </div>
        </div>
        <div className={progressBarContainerClasses}>
          <ProgressBar percentage={isAuxillaryTank ? 0 : formatLevelFor(level)} type={fluidTypeNum} />
        </div>
        <div className="w-[4rem]">
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
    const iconContainerClasses = classNames("flex items-center gap-2 truncate", {
      "w-[16.5rem]": tempWidth > 572 || tempWidth < 400,
      "w-[5rem]": tempWidth <= 572 && tempWidth >= 400,
    })

    const progressBarContainerClasses = classNames({
      "w-[calc(100%-14rem)]": tempWidth > 572,
      "w-[calc(100%-9rem)]": tempWidth <= 572,
      hidden: tempWidth < 400,
    })

    return (
      <>

        <div className="flex justify-between items-center gap-2">
          <div className={iconContainerClasses}>
            <FluidIcon fluid={fluidTypeNum} className={compactActiveStyles?.icon} />
            <div className="flex flex-col truncate">
              <div className={classnames("truncate", verticalActiveStyles?.tankName)}>{tankTitle}</div>
              <Capacity
                remaining={remaining}
                unit={unit}
                capacity={capacity}
                className={verticalActiveStyles?.capacity}
              />
            </div>
          </div>
          <div className={progressBarContainerClasses}>
            <ProgressBar percentage={isAuxillaryTank ? 0 : formatLevelFor(level)} type={fluidTypeNum} />
          </div>
          <div className="w-[4rem]">
            <ValueWithPercentage
              fluid={fluidTypeNum}
              level={level}
              className={compactActiveStyles?.level}
              isAuxillaryTank={isAuxillaryTank}
            />
          </div>
        </div>

      {/*  <div className="flex items-center">
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
              parentSize?.width
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
        </div>*/}
      </>
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
