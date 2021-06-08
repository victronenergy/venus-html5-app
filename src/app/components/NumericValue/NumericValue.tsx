import React from "react"

export const formatNumber = ({
  value,
  unit = "",
  precision = 0,
  factor = 1.0,
  defaultValue = " - ",
}: NumericValueProps) => {
  if (value === null || value === undefined || isNaN(value)) {
    if (defaultValue) {
      return defaultValue + unit
    } else {
      return defaultValue
    }
  }
  let numericValue = Number(value) * factor
  if (Math.abs(numericValue) > 1000) {
    numericValue = numericValue / 1000
    unit = "k" + unit
    precision = 1
  }
  return precision === undefined ? numericValue.toString() + unit : numericValue.toFixed(precision) + unit
}

type NumericValueProps = {
  value?: number
  unit?: string
  precision?: number
  factor?: number
  defaultValue?: string | null
}

export const NumericValue = ({
  value,
  unit = "",
  precision = 0,
  factor = 1.0,
  defaultValue = " - ",
}: NumericValueProps) => {
  return <span className="value">{formatNumber({ value, unit, precision, factor, defaultValue })}</span>
}

export default NumericValue
