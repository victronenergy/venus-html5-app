import React, { Component } from "react"

export const formatNumber = ({ value, unit = "", precision = 0, factor = 1.0, defaultValue = " - " }) => {
  if (value === null || value === undefined || isNaN(value)) {
    return defaultValue + unit
  }
  let numericValue = Number(value) * factor
  if (Math.abs(numericValue) > 1000) {
    numericValue = numericValue / 1000
    unit = "k" + unit
    precision = 1
  }
  return precision === undefined ? numericValue.toString() + unit : numericValue.toFixed(precision) + unit
}

export default class NumericValue extends Component {
  render() {
    const { value, unit = "", precision = 0, factor = 1.0, defaultValue = " - " } = this.props
    return <span className="value">{formatNumber({ value, unit, precision, factor, defaultValue })}</span>
  }
}
