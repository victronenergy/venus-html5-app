import type { FC } from "react"
import WaterIcon from "../../../../../images/icons/fresh-water.svg"
import GrayWaterIcon from "../../../../../images/icons/waste-water.svg"
import BlackWaterIcon from "../../../../../images/icons/black-water.svg"
import FuelIcon from "../../../../../images/icons/fuel.svg"

interface Props {
  fluid: number
  className: string
}

export const FluidIcon: FC<Props> = ({ fluid, className }) => {
  if (fluid === 1) return <WaterIcon className={className} />

  if (fluid === 2) return <GrayWaterIcon className={className} />

  if (fluid === 5) return <BlackWaterIcon className={className} />

  return <FuelIcon className={className} />
}
