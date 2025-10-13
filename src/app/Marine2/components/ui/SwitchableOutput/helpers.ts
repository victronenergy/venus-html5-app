import { SwitchableOutputUnit, useAppStore } from "@victronenergy/mfd-modules"
import { speedValueFor } from "app/Marine2/utils/formatters/speed/speed-value-for"
import { temperatureValueFor } from "app/Marine2/utils/formatters/temperature/temperature-value-for"
import { volumeValueFor } from "app/Marine2/utils/formatters/volume/volume-value-for"
import { useCallback } from "react"

// NOTE: Old MFD devices lack nullish coalescing operator `??` thus this version
export const getValueOrDefault = (value: number | undefined | null, defaultValue: number) => {
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
      if (unit === "/S") {
        return `${speedValueFor(value, speedUnit).toFixed(decimals)}${includeUnit ? speedUnitToHumanReadable : ""}`
      } else if (unit === "/V") {
        return `${volumeValueFor(value, volumeUnit).toFixed(decimals)}${includeUnit ? volumeUnitToHumanReadable : ""}`
      } else if (unit === "/T") {
        return `${temperatureValueFor(value, temperatureUnit).toFixed(decimals)}${includeUnit ? temperatureUnitToHumanReadable : "°"}`
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
