import { isSinglePhaseFor } from "../../helpers/is-single-phase-for"

export const phaseUnitFor = (value: number) => (isSinglePhaseFor(value) ? "A" : "W")
