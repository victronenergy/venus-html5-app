import { numericFormatter, systemModeFormatter, systemStateFormatter, acSourceFormatter } from "../js/formatters"
import { DBUS_PATHS } from "../config/dbusPaths"

export default {
  [DBUS_PATHS.BATTERY.VOLTAGE]: {
    description: "Voltage",
    unit: "V",
    formatter: numericFormatter(1),
    timeout: 0
  },
  [DBUS_PATHS.BATTERY.CURRENT]: {
    description: "Current",
    unit: "A",
    formatter: numericFormatter(1),
    timeout: 0
  },
  [DBUS_PATHS.BATTERY.POWER]: {
    description: "Power",
    unit: "W",
    formatter: numericFormatter(),
    timeout: 0
  },
  [DBUS_PATHS.BATTERY.SOC]: {
    description: "State of charge",
    unit: "%",
    formatter: numericFormatter(),
    timeout: 0
  },
  [DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.CURRENT]: {
    description: "DC loads current",
    unit: "A",
    formatter: numericFormatter(1),
    timeout: 0
  },
  [DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER]: {
    description: "DC loads power",
    unit: "W",
    formatter: numericFormatter(),
    timeout: 0
  },
  [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.VOLTAGE]: {
    description: "AC loads voltage",
    unit: "V",
    formatter: numericFormatter(),
    timeout: 0
  },
  [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.CURRENT]: {
    description: "AC loads current",
    unit: "A",
    formatter: numericFormatter(1),
    timeout: 0
  },
  [DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.POWER]: {
    description: "AC loads power",
    unit: "W",
    formatter: numericFormatter(),
    timeout: 0
  },
  [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.IS_CONNECTED]: {
    description: "Grid is connected",
    formatter: numericFormatter()
  },
  [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.VOLTAGE]: {
    description: "Grid voltage",
    unit: "V",
    formatter: numericFormatter(),
    timeout: 0
  },
  [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT]: {
    description: "Grid current",
    unit: "A",
    formatter: numericFormatter(1),
    timeout: 0
  },
  [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]: {
    description: "Grid input limit",
    unit: "A",
    formatter: numericFormatter(),
    timeout: 0,
    write: true
  },
  [DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.POWER]: {
    description: "Grid power",
    unit: "W",
    formatter: numericFormatter(),
    timeout: 0
  },
  [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE]: {
    description: "System state",
    unit: "",
    formatter: systemStateFormatter,
    timeout: 0
  },
  [DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE]: {
    description: "System mode",
    unit: "",
    formatter: systemModeFormatter,
    timeout: 0,
    write: true
  },
  [DBUS_PATHS.INVERTER_CHARGER.AC_SOURCE]: {
    unit: "",
    formatter: acSourceFormatter,
    timeout: 0
  }
}
