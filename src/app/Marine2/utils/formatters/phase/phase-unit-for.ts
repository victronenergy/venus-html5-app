import { isSinglePhaseFor } from "../../helpers/is-single-phase-for"

export const unitFor = (preferredElectricalPowerIndicator: number) => {
  return preferredElectricalPowerIndicator === 0 ? "W" : "A"
}

export const phaseUnitFor = (value: number, preferredElectricalPowerIndicator: number) => {
  if (preferredElectricalPowerIndicator === 0) {
    return "W"
  }
  return isSinglePhaseFor(value) ? "A" : "W"
}
