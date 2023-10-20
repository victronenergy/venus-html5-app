import { inverterOptions, vebusInverOptions } from "../../constants/mode-options"

export const inverterOptionsFor = (isVebus: boolean) => (isVebus ? vebusInverOptions : inverterOptions)
