import {
  SWITCHABLE_OUTPUT_STATUS,
  SWITCHABLE_OUTPUT_TYPE,
  SwitchableOutputType,
} from "@victronenergy/mfd-modules/dist/src/utils/constants"
import { translate } from "react-i18nify"
import { StatusPillVariant } from "../StatusPill"

interface StatusPillInfo {
  label: string
  variant: StatusPillVariant
}

export const isSwitchableOutputDisabled = (status: number): boolean =>
  (status & SWITCHABLE_OUTPUT_STATUS.STATUS_DISABLED) !== 0

export const getSwitchableOutputStatusPill = (status: number, type: SwitchableOutputType): StatusPillInfo | null => {
  var isBilgePump = type === SWITCHABLE_OUTPUT_TYPE.BILGE_PUMP_CONTROL
  var isOn = (status & 0x09) === 0x09

  // Bilge pump: always shows a pill, combined labels, On bits NOT masked
  if (isBilgePump) {
    if (isOn) {
      if ((status & 0x04) !== 0) return { label: translate("switches.runningOverTemperature"), variant: "red" }
      if ((status & 0x20) !== 0) return { label: translate("switches.runningDisabled"), variant: "red" }
      return { label: translate("switches.running"), variant: "yellow" }
    }
    if (status === 0x20) return { label: translate("switches.notRunningDisabled"), variant: "red" }
    if (status === 0x01) return { label: translate("switches.powered"), variant: "green" }
    if (status === 0x00) return { label: translate("switches.notRunning"), variant: "gray" }
    // Other bilge pump statuses fall through to common handling
  }

  // Common handling for all types (and bilge pump fallthrough)
  // Mask out On bits (0x09) when combined with other flags
  var effective = status
  if ((effective & 0x09) === 0x09 && effective !== 0x09) {
    effective = effective & ~0x09
  }

  switch (effective) {
    // Faults
    case 0x10:
      return { label: translate("switches.short"), variant: "red" }
    case 0x06:
      return { label: translate("switches.overTempTripped"), variant: "red" }
    case 0x04:
      return { label: translate("switches.overTemperature"), variant: "red" }
    case 0x02:
      return { label: translate("switches.tripped"), variant: "red" }
    case 0x08:
      return { label: translate("switches.fault"), variant: "red" }

    // Disabled combinations
    case 0x24:
      return { label: translate("switches.disabledOverTemp"), variant: "red" }
    case 0x22:
      return { label: translate("switches.disabledTripped"), variant: "red" }
    case 0x20:
      return { label: translate("switches.disabled"), variant: "red" }

    // Bypassed combinations
    case 0x44:
      return { label: translate("switches.bypassedOverTemp"), variant: "red" }
    case 0x42:
      return { label: translate("switches.bypassedTripped"), variant: "red" }
    case 0x40:
      return { label: translate("switches.bypassed"), variant: "yellow" }

    // External control combinations
    case 0x84:
      return { label: translate("switches.externalControlOverTemp"), variant: "red" }
    case 0x82:
      return { label: translate("switches.externalControlTripped"), variant: "red" }
    case 0x80:
      return { label: translate("switches.externalControl"), variant: "green" }

    // Normal states — no pill
    case 0x00:
    case 0x01:
    case 0x09:
      return null
  }

  return { label: translate("switches.unknownStatus"), variant: "red" }
}
