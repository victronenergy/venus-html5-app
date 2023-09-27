import { isKilowattFor } from "../../helpers/is-kilowatt-for"
import { TForcePowerUnit } from "@m2Types/generic/force-power-unit"

export const powerUnitFor = (value?: number, forcePowerUnit?: TForcePowerUnit) => {
  if (forcePowerUnit) {
    return forcePowerUnit
  }

  return isKilowattFor(value) ? "kW" : "W"
}
