import { isKilowattFor } from "../helpers/is-kilowatt-for"

export const powerUnitFor = (value?: number) => (!isKilowattFor(value) ? "W" : "kW")
