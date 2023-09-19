import { formatValue } from "../formatters"
import { isKilowattFor } from "../helpers/is-kilowatt-for"

export const powerValueFor = (value?: number): string => {
  if (!value) {
    return formatValue(0)
  }

  if (!isKilowattFor(value)) {
    return formatValue(value, 0)
  }

  return formatValue(value / 1000)
}
