import { objectValues } from "./util"
import { DBUS_PATHS } from "../config/dbusPaths"

export const SERVICES = {
  SYSTEM: objectValues(DBUS_PATHS.GENERAL)
    .concat(objectValues(DBUS_PATHS.BATTERY))
    .concat(objectValues(DBUS_PATHS.SOLAR_CHARGERS))
    .concat(objectValues(DBUS_PATHS.INVERTER_CHARGER.DC_LOADS))
    .concat(DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE)
    .concat(DBUS_PATHS.INVERTER_CHARGER.SYSTEM.VEBUS_SERVICE)
    .concat(DBUS_PATHS.INVERTER_CHARGER.AC_SOURCE),
  VEBUS: objectValues(DBUS_PATHS.INVERTER_CHARGER.AC_LOADS)
    .concat(objectValues(DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER))
    .concat(DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE)
    .concat(objectValues(DBUS_PATHS.INVERTER_CHARGER.GENERATOR))
    .concat([DBUS_PATHS.INVERTER_CHARGER.SYSTEM.AC_NUMBER_OF_PHASES])
}

export const BATTERY_STATE = {
  IDLE: 0,
  CHARGING: 1,
  DISCHARGING: 2
}

export const VEBUS_SYSTEM_STATE = {
  OFF: 0,
  LOW_POWER: 1,
  FAULT_CONDITION: 2,
  BULK_CHARGING: 3,
  ABSORPTION_CHARGINNG: 4,
  FLOAT_CHARGING: 5,
  STORAGE_MODE: 6,
  EQUALISATION_CHARGING: 7,
  PASSTHRU: 8,
  INVERTING: 9,
  ASSISTING: 10,
  DISCHARGING: 256,
  SUSTAIN: 257
}

export const AC_SOURCE = {
  NOT_AVAILABLE: 0,
  GRID: 1,
  GENSET: 2,
  SHORE: 3,
  INVERTING_ISLAND_MODE: 240
}

export const SYSTEM_MODE = {
  CHARGER_ONLY: 1,
  INVERTER_ONLY: 2,
  ON: 3,
  OFF: 4
}

export const TOPICS = {
  /**
   * Topic structure is:
   * N/<portal ID>/<service_type>/<device instance>/<D-Bus path>
   *
   * See details at https://github.com/victronenergy/dbus-mqtt
   */
  NOTIFICATION: {
    ALL: "N/#",
    SERIAL: "N/+/system/0/Serial",
    ALL_DEVICES_CONNECTED: "N/+/+/+/ProductId",
    ALL_DEVICE_INSTANCES: "N/+/+/+/DeviceInstance"
  }
}
