import { isKilowattFor } from "./is-kilowatt-for"
import { isPowerUnderThreshold } from "./is-power-under-threshold"
import { ValueWithUnit } from "@m2Types/data/value-with-units"
import { TForcePowerUnit } from "@m2Types/data/force-power-unit"

/*
  The goal of this function is to force the same power formatting/units for all phases, there is a minimal threshold to prevent flickering.
  Issue number: #345
 */
export const powerHysteresisFor = (values: ValueWithUnit[][], unit: TForcePowerUnit): TForcePowerUnit => {
  const powerValues = values.map((value) => value.find(({ unit }) => unit === "W"))
  const hasKw = powerValues.some((power) => isKilowattFor(power?.value))
  const allUnderThreshold = powerValues.every((power) => isPowerUnderThreshold(power?.value))

  if (hasKw && !allUnderThreshold && unit === "W") {
    return "kW"
  } else if (allUnderThreshold && unit === "kW") {
    return "W"
  } else {
    return unit
  }
}
