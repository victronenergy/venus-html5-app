import { Replacements, TranslateOptions } from "react-i18nify"

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

  const rounded = value.toFixed(decimalPlaces)

  if (rounded === "-0.0") {
    return "0.0"
  }

  return rounded
}
