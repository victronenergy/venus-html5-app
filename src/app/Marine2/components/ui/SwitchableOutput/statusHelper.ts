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
  const isBilgePump = type === SWITCHABLE_OUTPUT_TYPE.BILGE_PUMP_CONTROL
  const isOn = (status & 0x09) === 0x09

  if ((status & SWITCHABLE_OUTPUT_STATUS.STATUS_SHORT_FAULT) !== 0)
    return { label: translate("switches.shortFault"), variant: "red" }
  if ((status & SWITCHABLE_OUTPUT_STATUS.STATUS_OVER_TEMPERATURE) !== 0)
    return { label: translate("switches.overTemperature"), variant: "red" }
  if ((status & SWITCHABLE_OUTPUT_STATUS.STATUS_TRIPPED) !== 0)
    return { label: translate("switches.tripped"), variant: "red" }
  if ((status & 0x08) !== 0 && (status & 0x01) === 0)
    return { label: translate("switches.outputFault"), variant: "red" }

  if ((status & SWITCHABLE_OUTPUT_STATUS.STATUS_BYPASSED) !== 0)
    return { label: translate("switches.bypassed"), variant: "yellow" }
  if ((status & SWITCHABLE_OUTPUT_STATUS.STATUS_DISABLED) !== 0)
    return { label: translate("switches.disabled"), variant: "red" }
  if ((status & SWITCHABLE_OUTPUT_STATUS.STATUS_EXT_CONTROL) !== 0)
    return { label: translate("switches.externalControl"), variant: "green" }

  if (isBilgePump) {
    if (isOn) return { label: translate("switches.running"), variant: "yellow" }
    return { label: translate("switches.notRunning"), variant: "gray" }
  }

  if (
    status === SWITCHABLE_OUTPUT_STATUS.STATUS_OFF ||
    status === SWITCHABLE_OUTPUT_STATUS.STATUS_ON ||
    status === SWITCHABLE_OUTPUT_STATUS.STATUS_POWERED
  )
    return null

  return { label: translate("switches.unknownStatus"), variant: "red" }
}
