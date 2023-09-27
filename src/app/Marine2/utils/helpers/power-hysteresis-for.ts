import { isKilowattFor } from "./is-kilowatt-for"
import { isPowerUnderThreshold } from "./is-power-under-threshold"
import { ValueWithUnit } from "@m2Types/generic/value-with-units"
import { TForcePowerUnit } from "@m2Types/generic/force-power-unit"

/*
  The goal of this function is to force the same power formatting/units for all phases, there is a minimal threshold to prevent flickering.
  Issue #345
 */
export const powerHysteresisFor = (values: ValueWithUnit[][], unit: TForcePowerUnit): TForcePowerUnit => {
  const powerValues = values.map((value) => value.find(({ unit }) => unit === "W"))
  const hasKw = powerValues.some((power) => isKilowattFor(power?.value))
  const hasUnderMin = powerValues.some((power) => isPowerUnderThreshold(power?.value))

  if (hasKw && !hasUnderMin && unit === "W") {
    return "kW"
  } else if (hasUnderMin && unit === "kW") {
    return "W"
  } else {
    return unit
  }
}
