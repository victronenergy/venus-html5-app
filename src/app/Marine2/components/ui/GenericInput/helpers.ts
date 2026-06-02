import { SwitchableOutputUnit } from "@victronenergy/mfd-modules"
import { translate } from "react-i18nify"

export const getLocalizedOrDefault = (label: string): string => {
  if (label.charAt(0) === "/") {
    return translate("switches." + label.slice(1))
  }
  return label
}

export const defaultLabelForUnit = (unit: SwitchableOutputUnit): string => {
  if (unit === "/Temperature") return translate("switches.temperature")
  if (unit === "/Volume") return translate("switches.volume")
  if (unit === "/Speed") return translate("switches.speed")
  return translate("switches.value")
}
