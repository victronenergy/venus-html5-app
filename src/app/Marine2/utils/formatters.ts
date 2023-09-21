import { BATTERY } from "./constants"
import { Replacements, TranslateOptions } from "react-i18nify"

export const batteryStateNameFormatter = function (
  t: (key: string, replacements?: Replacements, options?: TranslateOptions) => string,
  state: number,
  percentage?: number,
  timetogo?: number
): string | null {
  if (percentage === 100) return t("common.charged")
  switch (state) {
    case BATTERY.CHARGING:
      return t("common.charging")
    case BATTERY.IDLE:
      return t("common.idle")
    case BATTERY.DISCHARGING:
      return timetogo ? timeAsStringFormatter(t, timetogo) + " " + t("common.timetogo") : t("common.discharging")
  }
  return null
}

export const timeAsStringFormatter = function (
  t: (key: string, replacements?: Replacements, options?: TranslateOptions) => string,
  timeInSeconds: number
): string {
  const hours = Math.floor(timeInSeconds / (60 * 60))
  const minutes = Math.floor((timeInSeconds / 60) % 60)
  return (
    (hours ? hours + t("common.hours_short") + " " : "") + (minutes || hours ? minutes + t("common.minutes_short") : "")
  )
}

export const colorForPercentageFormatter = function (percentage: number) {
  if (percentage <= 12) {
    return "victron-red"
  } else if (percentage <= 40) {
    return "victron-yellow"
  } else if (percentage === 100) {
    return "victron-blue"
  }
  return "victron-green"
}

export const formatValue = (value?: number, decimalPlaces: number = 1): string => {
  if (typeof value !== "number" || isNaN(value)) {
    return "--"
  }

  if (!Number.isInteger(decimalPlaces) || decimalPlaces < 0) {
    throw new Error("decimalPlaces must be a non-negative integer")
  }

  return value.toFixed(decimalPlaces)
}
