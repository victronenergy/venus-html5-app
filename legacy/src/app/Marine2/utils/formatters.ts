import { BATTERY } from "./constants"
import { Replacements, TranslateOptions } from "react-i18nify"

export const batteryStateNameFormatter = function (
  t: (key: string, replacements?: Replacements, options?: TranslateOptions) => string,
  state: number,
  percentage?: number
): string | null {
  if (percentage === 100) return t("common.charged")
  switch (state) {
    case BATTERY.CHARGING:
      return t("common.charging")
    case BATTERY.IDLE:
      return t("common.idle")
    case BATTERY.DISCHARGING:
      return t("common.discharging")
  }
  return null
}

export const timeAsStringFormatter = function (
  t: (key: string, replacements?: Replacements, options?: TranslateOptions) => string,
  timeInSeconds: number
): string {
  const days = Math.floor(timeInSeconds / (24 * 60 * 60))
  const hours = Math.floor(timeInSeconds / (60 * 60))
  const minutes = Math.floor((timeInSeconds / 60) % 60)
  return (
    (days ? days + t("common.days_short") + " " : "") +
    (hours || days ? hours + t("common.hours_short") + " " : "") +
    (minutes || hours || days ? minutes + t("common.minutes_short") : "")
  )
}

export const dcVoltageFormatter = function (voltage?: number): string {
  if (!voltage && voltage !== 0) return "--"
  return Math.floor(voltage).toString().padStart(2, "0") + "." + Math.round((voltage % 1) * 10)
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
