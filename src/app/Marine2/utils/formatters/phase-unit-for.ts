import { isMultiPhaseFor } from "../helpers/is-multi-phase-for"

export const phaseUnitFor = (value: number) => (isMultiPhaseFor(value) ? "A" : "W")
