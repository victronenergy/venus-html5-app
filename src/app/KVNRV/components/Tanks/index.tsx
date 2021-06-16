import { WidgetConfiguration } from "../../utils/constants"

export type TankProps = {
  tankId: number
  conf: WidgetConfiguration
  invert: boolean
}

export { BigTank } from "./BigTank"
export { SmallTank } from "./SmallTank"
