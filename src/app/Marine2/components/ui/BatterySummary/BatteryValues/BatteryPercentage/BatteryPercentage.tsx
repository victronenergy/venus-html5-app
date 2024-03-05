import { FC } from "react"
import { ISize } from "@m2Types/generic/size"
import { applyStyles } from "../../../../../utils/media"
import { Styles } from "./Styles"

interface Props {
  percentage: number | null
  boxSize: ISize
}

export const BatteryPercentage: FC<Props> = ({ percentage, boxSize }) => {
  if (percentage === null) {
    return null
  }

  const activeStyles = applyStyles(boxSize, Styles)

  return (
    <div className={activeStyles.percentage}>
      {Math.round(percentage)}
      <span className="text-victron-gray dark:text-victron-gray-dark">%</span>
    </div>
  )
}
