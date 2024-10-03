import { unit } from "@m2Types/data/unit"
import { isSinglePhaseFor } from "../../helpers/is-single-phase-for"

export const unitFor = (preferredElectricalPowerIndicator: number) => {
  return (preferredElectricalPowerIndicator === 0 ? "W" : "A") as unit
}

export const phaseUnitFor = (value: number, preferredElectricalPowerIndicator: number) => {
  if (preferredElectricalPowerIndicator === 0) {
    return "W" as unit
  }
  return (isSinglePhaseFor(value) ? "A" : "W") as unit
}
