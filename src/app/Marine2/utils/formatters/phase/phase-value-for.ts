import { isSinglePhaseFor } from "../../helpers/is-single-phase-for"
import { totalPowerFor } from "../../helpers/total-power-for"

export const phaseValueFor = (phases: number, current: number[], power: number[]) => {
  if (isSinglePhaseFor(phases)) {
    return current[0]
  }

  return totalPowerFor(power)
}
