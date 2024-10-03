import classNames from "classnames"
import { FC } from "react"
import { BatteryState } from "@victronenergy/mfd-modules"
import { ISize } from "@m2Types/generic/size"
import { applyStyles } from "../../../../utils/media"
import { Styles } from "./Styles"

interface Props {
  battery: BatteryState
  boxSize: ISize
}

export const BatteryName: FC<Props> = ({ battery, boxSize }) => {
  const activeStyles = applyStyles(boxSize, Styles)

  return <div className={classNames("truncate mt-2 text-center", activeStyles.name)}>{battery.name}</div>
}
