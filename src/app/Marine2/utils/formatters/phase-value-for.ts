import { isMultiPhaseFor } from "../helpers/is-multi-phase-for"
import { totalPowerFor } from "../helpers/total-power-for"

export const phaseValueFor = (phases: number, current: number[], power: number[]) => {
  if (isMultiPhaseFor(phases)) {
    return current[0]
  }

  return totalPowerFor(power)
}
