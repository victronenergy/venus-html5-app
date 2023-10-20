import { INVERTER_MODE, SYSTEM_MODE } from "../constants"

export const inverterOptions = [
  { key: "common.on", value: INVERTER_MODE.ON },
  { key: "common.off", value: INVERTER_MODE.OFF },
  { key: "common.eco", value: INVERTER_MODE.ECO },
]

export const vebusInverOptions = [
  { key: "common.on", value: INVERTER_MODE.VEBUS_ON },
  { key: "common.off", value: INVERTER_MODE.OFF },
]

export const inverterChargerOptions = [
  { key: "common.on", value: SYSTEM_MODE.ON },
  { key: "common.off", value: SYSTEM_MODE.OFF },
  { key: "common.chargerOnly", value: SYSTEM_MODE.CHARGER_ONLY },
  { key: "common.inverterOnly", value: SYSTEM_MODE.INVERTER_ONLY },
]
