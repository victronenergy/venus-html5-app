import {
  numericFormatter,
  systemModeFormatter,
  systemStateFormatter,
  batteryStateFormatter,
  batteryTimeToGoFormatter
} from "../app/formatters"
import { DBUS_PATHS } from "../config/dbusPaths"

export default {
  [DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER]: {},
  [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE]: {
    description: "System state",
    unit: "",
    formatter: systemStateFormatter,
    timeout: 0
  },
  [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE]: {},
  [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE]: {
    description: "System mode",
    unit: "",
    formatter: systemModeFormatter,
    timeout: 0,
    write: true
  }
}
