import { SwitchableOutputUnit, useAppStore } from "@victronenergy/mfd-modules"
import { speedValueFor } from "app/Marine2/utils/formatters/speed/speed-value-for"
import { temperatureValueFor } from "app/Marine2/utils/formatters/temperature/temperature-value-for"
import { volumeValueFor } from "app/Marine2/utils/formatters/volume/volume-value-for"
import { useCallback } from "react"

// NOTE: Old MFD devices lack nullish coalescing operator `??` thus this version
export const getValueOrDefault = <T extends number | string>(value: T | undefined | null, defaultValue: T) => {
  return value === undefined || value === null ? defaultValue : value
}

interface UseFormattedValueOptions {
  decimals: number
}

export const useValueFormatter = ({ decimals }: UseFormattedValueOptions) => {
  const {
    temperatureUnitToHumanReadable,
    temperatureUnit,
    speedUnitToHumanReadable,
    speedUnit,
    volumeUnitToHumanReadable,
    volumeUnit,
  } = useAppStore()

  const formattedValueAndUnit = useCallback(
    (value: number, unit: SwitchableOutputUnit, includeUnit: boolean = true): string => {
      if (unit === "/Speed") {
        return `${speedValueFor(value, speedUnit).toFixed(decimals)}${includeUnit ? speedUnitToHumanReadable : ""}`
      } else if (unit === "/Volume") {
        return `${volumeValueFor(value, volumeUnit).toFixed(decimals)}${includeUnit ? volumeUnitToHumanReadable : ""}`
      } else if (unit === "/Temperature") {
        return `${temperatureValueFor(value, temperatureUnit, false).toFixed(decimals)}${includeUnit ? temperatureUnitToHumanReadable : ""}`
      }
      return `${value.toFixed(decimals)}${unit}`
    },
    [
      speedUnit,
      speedUnitToHumanReadable,
      decimals,
      temperatureUnit,
      temperatureUnitToHumanReadable,
      volumeUnit,
      volumeUnitToHumanReadable,
    ],
  )

  return formattedValueAndUnit
}

export const getDecimalPlaces = (num: number): number => {
  if (!isFinite(num) || num === 0) return 0

  // Step 1: Clean up floating-point errors by rounding to 15 significant digits
  // (IEEE 754 double has ~15-17 decimal digits of precision)
  const cleaned = parseFloat(num.toPrecision(15))

  // Step 2: Convert to string and find decimal places
  const str = Math.abs(cleaned).toString()

  // Handle scientific notation (e.g., 1.23e-8)
  if (str.includes("e")) {
    const parts = str.split("e")
    const exponent = parseInt(parts[1])
    const mantissa = parts[0].replace(".", "")

    if (exponent < 0) {
      // For small numbers: decimal places = |exponent| + mantissa digits - 1
      return Math.abs(exponent) + mantissa.length - 1
    } else {
      // For large numbers in scientific notation, no decimal places needed
      return 0
    }
  }

  // Step 3: Count digits after decimal point
  const decimalIndex = str.indexOf(".")
  if (decimalIndex === -1) return 0

  const afterDecimal = str.slice(decimalIndex + 1)
  // Remove trailing zeros
  const withoutTrailingZeros = afterDecimal.replace(/0+$/, "")

  return withoutTrailingZeros.length
}
