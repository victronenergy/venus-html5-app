import { useMemo } from "react"
import { ValueWithUnit } from "@m2Types/generic/value-with-units"

export const usePhasesData = (
  phases: number,
  voltage: number[],
  current: number[],
  power: number[]
): ValueWithUnit[][] =>
  useMemo(
    () =>
      [...Array(phases)].map((phase, index) => [
        { value: voltage[index], unit: "V", hideDecimal: true },
        { value: current[index], unit: "A" },
        { value: power[index], unit: "W", hideDecimal: true },
      ]),
    [phases, voltage, current, power]
  )
