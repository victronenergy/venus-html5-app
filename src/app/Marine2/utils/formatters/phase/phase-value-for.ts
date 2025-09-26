import { isSinglePhaseFor } from "../../helpers/is-single-phase-for"
import { totalPowerFor } from "../../helpers/total-power-for"

export const valueFor = (current: number, power: number, preferredElectricalPowerIndicator: number) => {
  if (preferredElectricalPowerIndicator === 1) {
    return current
  }

  return power
}

export const phaseValueFor = (
  phases: number,
  current: number[],
  power: number[],
  preferredElectricalPowerIndicator: number,
) => {
  if (isSinglePhaseFor(phases) && preferredElectricalPowerIndicator === 1) {
    return current[0]
  }

  return totalPowerFor(power)
}
