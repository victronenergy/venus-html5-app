import { h, Component } from "preact"

export function formatNumber({ value, unit = "", precision = 0, factor = 1.0, defaultValue = "--" }) {
  if (value === null || value === undefined) {
    return defaultValue
  }
  let numericValue = Number(value) * factor
  return precision === undefined ? numericValue.toString() + unit : numericValue.toFixed(precision) + unit
}

export default class NumericValue extends Component {
  render({ value, unit = "", precision = 0, factor = 1.0, defaultValue = "--" }) {
    return <p className="value text">{formatNumber({ value, unit, precision, factor, defaultValue })}</p>
  }
}
