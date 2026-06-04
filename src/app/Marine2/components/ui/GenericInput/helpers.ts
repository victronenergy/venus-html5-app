import { GenericInputState, SwitchableOutputUnit } from "@victronenergy/mfd-modules"
import { GENERIC_INPUT_STATUS } from "@victronenergy/mfd-modules/dist/src/utils/constants"
import { translate } from "react-i18nify"

export const getLocalizedOrDefault = (label: string): string => {
  if (label.charAt(0) === "/") {
    return translate("switches." + label.slice(1))
  }
  return label
}

export const getStatusLabel = (status: GenericInputState["status"]): string | null => {
  if (status === GENERIC_INPUT_STATUS.FAULT) return translate("switches.fault")
  if (status === GENERIC_INPUT_STATUS.BATTERY_LOW) return translate("switches.batteryLow")
  return null
}

export const defaultLabelForUnit = (unit: SwitchableOutputUnit): string => {
  if (unit === "/Temperature") return translate("switches.temperature")
  if (unit === "/Volume") return translate("switches.volume")
  if (unit === "/Speed") return translate("switches.speed")
  return translate("switches.value")
}
