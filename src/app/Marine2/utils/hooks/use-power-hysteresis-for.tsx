import { useState } from "react"
import { TForcePowerUnit } from "@m2Types/data/force-power-unit"
import { powerHysteresisFor } from "../helpers/power-hysteresis-for"
import { ValueWithUnit } from "@m2Types/data/value-with-units"

export const usePowerHysteresisFor = (values: ValueWithUnit[][]): TForcePowerUnit => {
  const [unit, setUnit] = useState<TForcePowerUnit>("W")

  const nextUnit = powerHysteresisFor(values, unit)
  if (nextUnit !== unit) {
    setUnit(nextUnit)
  }

  return nextUnit
}
