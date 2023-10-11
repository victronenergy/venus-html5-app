import { useMemo, useState } from "react"
import { TForcePowerUnit } from "@m2Types/data/force-power-unit"
import { powerHysteresisFor } from "../helpers/power-hysteresis-for"
import { ValueWithUnit } from "@m2Types/data/value-with-units"

export const usePowerHysteresisFor = (values: ValueWithUnit[][]): TForcePowerUnit => {
  const [value, setValue] = useState<TForcePowerUnit>("W")

  useMemo(() => {
    setValue(powerHysteresisFor(values, value))
  }, [values, value])

  return value
}
