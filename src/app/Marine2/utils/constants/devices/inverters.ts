import { SYSTEM_MODE } from "../generic"

export const INVERTER_MODE = {
  ON: 2,
  VEBUS_ON: 3, // Vebus inverters use mode 3 instead of 2 for ON.
  OFF: 4,
  ECO: 5,
}

export const INVERTER_OPTIONS = [
  { key: "common.on", value: INVERTER_MODE.ON },
  { key: "common.off", value: INVERTER_MODE.OFF },
  { key: "common.eco", value: INVERTER_MODE.ECO },
]

export const VEBUS_INVERTER_OPTIONS = [
  { key: "common.on", value: INVERTER_MODE.VEBUS_ON },
  { key: "common.off", value: INVERTER_MODE.OFF },
]

export const INVERTER_CHARGER_OPTIONS = [
  { key: "common.on", value: SYSTEM_MODE.ON },
  { key: "common.off", value: SYSTEM_MODE.OFF },
  { key: "common.chargerOnly", value: SYSTEM_MODE.CHARGER_ONLY },
  { key: "common.inverterOnly", value: SYSTEM_MODE.INVERTER_ONLY },
]
