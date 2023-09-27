import { useMemo, useState } from "react"
import { TForcePowerUnit } from "@m2Types/generic/force-power-unit"
import { powerHysteresisFor } from "../helpers/power-hysteresis-for"
import { ValueWithUnit } from "@m2Types/generic/value-with-units"

export const usePowerHysteresisFor = (values: ValueWithUnit[][]): TForcePowerUnit => {
  const [value, setValue] = useState<TForcePowerUnit>("W")

  useMemo(() => {
    setValue(powerHysteresisFor(values, value))
  }, [values])

  return value
}
