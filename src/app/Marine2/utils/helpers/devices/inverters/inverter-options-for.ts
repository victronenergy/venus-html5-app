import { INVERTER_OPTIONS, VEBUS_INVERTER_OPTIONS } from "../../../constants/devices/inverters"

export const inverterOptionsFor = (isVebus: boolean) => (isVebus ? VEBUS_INVERTER_OPTIONS : INVERTER_OPTIONS)
