import { useEffect, useMemo, useState } from "react"
import { useTank } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react-lite"
import ProgressBar from "../../../ui/ProgressBar"
import classnames from "classnames"
import { ISize } from "@m2Types/generic/size"
import { applyStyles } from "../../../../utils/media"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { compactStyles, horizontalStyles } from "./Styles"
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
  parentSize: ISize
}

const Tank = ({ tankInstanceId, componentMode, orientation = "vertical", parentSize }: Props) => {
  const { capacity, fluidType, level, remaining, customName, unit } = useTank(tankInstanceId)
  const fluidTypeNum = +fluidType
  const [isComponentVisible, setIsComponentVisible] = useState(false)

  const compactActiveStyles = applyStyles(parentSize, compactStyles)
  const tankTitle = useMemo(() => customName || FLUID_TRANSLATIONS[fluidTypeNum], [fluidTypeNum, customName])

  useEffect(() => {
    setIsComponentVisible(level !== undefined || capacity !== undefined)
  }, [level, capacity])

  if (!isComponentVisible) return null

  // Tanks that are missing level readings and only have capacity
  const isAuxiliaryTank = !!capacity && level === undefined
  const percentage = isAuxiliaryTank ? 0 : formatLevelFor(level)

  if (componentMode === "compact") {
    return (
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className={classnames("flex items-center gap-1 truncate", compactActiveStyles?.iconContainer)}>
          <FluidIcon fluid={fluidTypeNum} className={classnames("shrink-0", compactActiveStyles?.icon)} />
          <div className={classnames("truncate", compactActiveStyles?.tankName)}>{tankTitle} </div>
        </div>
        <div className={compactActiveStyles?.progressBar}>
          <ProgressBar percentage={percentage} type={fluidTypeNum} />
        </div>
        <div className={compactActiveStyles?.percentage}>
          <ValueWithPercentage
            fluid={fluidTypeNum}
            level={level}
            className={compactActiveStyles?.level}
            isAuxillaryTank={isAuxiliaryTank}
          />
        </div>
      </div>
    )
  }

  if (orientation === "vertical") {
    return (
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className="flex items-center gap-1 w-[17rem] sm:w-[10rem] md:w-[12rem] truncate">
          <FluidIcon fluid={fluidTypeNum} className="shrink-0 w-[32px]" />
          <div className="flex flex-col truncate">
            <div className="truncate text-base">{tankTitle}</div>
            <Capacity remaining={remaining} unit={unit} capacity={capacity} className="text-xs" />
          </div>
        </div>
        <div className="xs:hidden md:w-[calc(100%-22rem)] lg:w-[calc(100%-17rem)]">
          <ProgressBar percentage={percentage} type={fluidTypeNum} size="large" />
        </div>
        <div className="w-[5rem]">
          <ValueWithPercentage
            fluid={fluidTypeNum}
            level={level}
            className="text-lg md:text-xl min-w-[3.8rem]"
            isAuxillaryTank={isAuxiliaryTank}
          />
        </div>
      </div>
    )
  }

  const horizontalActiveStyles = applyStyles(parentSize, horizontalStyles)

  return (
    <div className="px-4">
      <div className="h-full w-full flex flex-row">
        <div className="min-w-[10%] h-auto">
          <ProgressBar percentage={percentage} type={fluidTypeNum} orientation="vertical" />
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
              isAuxillaryTank={isAuxiliaryTank}
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
