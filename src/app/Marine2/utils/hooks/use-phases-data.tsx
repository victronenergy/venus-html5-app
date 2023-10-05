import { useMemo } from "react"
import { ValueWithUnit } from "@m2Types/data/value-with-units"

export const usePhasesData = (
  phases: number,
  voltage: number[],
  current: number[],
  power: number[],
  unplugged?: boolean
): ValueWithUnit[][] =>
  useMemo(
    () =>
      [...Array(phases)].map((phase, index) => [
        { value: !unplugged ? voltage[index] : undefined, unit: "V", hideDecimal: true },
        { value: !unplugged ? current[index] : undefined, unit: "A" },
        { value: !unplugged ? power[index] : undefined, unit: "W", hideDecimal: true },
      ]),
    [phases, voltage, current, power, unplugged]
  )
