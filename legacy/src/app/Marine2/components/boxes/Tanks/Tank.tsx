import { useTank } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import ProgressBar from "../../ui/ProgressBar"
import classnames from "classnames"
import { translate } from "react-i18nify"
import FuelIcon from "../../../images/icons/fuel.svg"
import WaterIcon from "../../../images/icons/fresh-water.svg"
import BlackWaterIcon from "../../../images/icons/black-water.svg"
import GrayWaterIcon from "../../../images/icons/waste-water.svg"

const Tank = ({ tankInstanceId, mode = "compact", orientation = "vertical" }: Props) => {
  let { capacity, fluidType, level, remaining, unit } = useTank(tankInstanceId)
  let fluidTypeNum = +fluidType

  const fluidTypeFormatter = (type: number) => {
    const fluids = [
      translate("tank.Fuel"),
      translate("tank.Fresh water"),
      translate("tank.Waste water"),
      translate("tank.Live well"),
      translate("tank.Oil"),
      translate("tank.Black water"),
      translate("tank.Gasoline"),
      translate("Diesel"),
      translate("Liquid Petroleum Gas (LPG)"),
      translate("Liquid Natural Gas (LNG)"),
      translate("Hydraulic oil"),
      translate("Raw water"),
    ]

    return fluids[type]
  }

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
        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-6 flex items-center sm:col-span-4 lg:col-span-3">
            <div>{fluidIcon(fluidTypeNum, orientation)}</div>
            <div className="flex flex-col p-1 sm:p-2 w-full">
              <div className="text-base md:text-lg lg:text-xl truncate text-ellipsis overflow-hidden">
                {fluidTypeFormatter(fluidTypeNum)}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center invisible sm:visible sm:col-span-3 lg:col-span-4">
            <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} />
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <div
              className={classnames("text-3xl flex flex-row pr-2", {
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
          <div className="col-span-3 flex items-center md:col-span-2">
            <div>{fluidIcon(fluidTypeNum, orientation)}</div>
            <div className="flex flex-col p-2">
              <div className="text-2xl">{fluidTypeFormatter(fluidTypeNum)}</div>
              <div className="text-victron-gray">
                {formatCapacity(remaining) + "/" + formatCapacity(capacity) + " l"}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center col-span-4 md:col-span-5">
            <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} />
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <div
              className={classnames("text-3xl flex flex-row", {
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

  return (
    <div className="h-full w-full grid grid-cols-8">
      <div className="w-full col-span-1">
        <ProgressBar percentage={levelFormatter(level)} type={fluidTypeNum} orientation="vertical" />
      </div>
      <div className="col-span-7 flex flex-col justify-between">
        <div className="pt-2">
          <div>{fluidIcon(fluidTypeNum, orientation)}</div>
          <div className="">
            <div className="text-2xl">{fluidTypeFormatter(fluidTypeNum)}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={classnames("text-3xl flex flex-row", {
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
          <div className="text-victron-gray">{formatCapacity(remaining) + "/" + formatCapacity(capacity) + " l"}</div>
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
}

export default observer(Tank)
