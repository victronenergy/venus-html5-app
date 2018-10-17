import { objectValues } from "./util"

export const DBUS_PATHS = {
  GENERAL: {
    SERIAL: "/Serial", // portal id
    DEVICE_INSTANCE: "/DeviceInstance"
  },
  BATTERY: {
    CURRENT: "/Dc/Battery/Current",
    POWER: "/Dc/Battery/Power",
    VOLTAGE: "/Dc/Battery/Voltage",
    SOC: "/Dc/Battery/Soc", // State of charge

    CIRCUIT_BREAKER_ALARM: "/Dc/Battery/Alarms/CircuitBreakerTripped", //<- Something special
    CONSUMED_AMP_HOURRS: "/Dc/Battery/ConsumedAmphours",
    STATE: "/Dc/Battery/State",
    TIME_TO_GO: "/Dc/Battery/TimeToGo"
  },
  SOLAR_CHARGERS: {
    CURRENT: "/Dc/Pv/Current", //<- total output current of all connected solar chargers
    POWER: "/Dc/Pv/Power" //<- same, but then the power
  },
  // VE.Bus systems (Multis, Quattros, Inverters)
  INVERTER_CHARGER: {
    DC_LOADS: {
      CURRENT: "/Dc/Vebus/Current", // charge/discharge current between battery and inverter/charger
      POWER: "/Dc/Vebus/Power"
    },
    AC_LOADS: {
      CURRENT: "/Ac/Out/L1/V",
      POWER: "/Ac/Out/L1/I",
      VOLTAGE: "/Ac/Out/L1/P",

      CONSUMPTION_OUTPUT_L1_POWER: "/Ac/ConsumptionOnOutput/L1/Power", // <- Use this for AC Consumption.
      CONSUMPTION_OUTPUT_L2_POWER: "/Ac/ConsumptionOnOutput/L2/Power",
      CONSUMPTION_OUTPUT_L3_POWER: "/Ac/ConsumptionOnOutput/L3/Power"
    },
    // also known as GRID
    SHORE_POWER: {
      IS_CONNECTED: "/Ac/ActiveIn/Connected", // 0 when inverting, 1 when connected to an AC in.
      VOLTAGE: "/Ac/ActiveIn/L1/V",
      CURRENT: "/Ac/ActiveIn/L1/I",
      POWER: "/Ac/ActiveIn/L1/P",
      CURRENT_LIMIT: "/Ac/ActiveIn/CurrentLimit",

      AC_SOURCE: "/Ac/ActiveIn/Source", // <- The active AC-In source of the multi.
      AC_GRID_L1_POWER: "/Ac/Grid/L1/Power", // <- All from the shore.
      AC_GRID_L2_POWER: "/Ac/Grid/L2/Power",
      AC_GRID_L3_POWER: "/Ac/Grid/L3/Power"
    },
    GENERATOR: {
      AC_GENSET_L1_POWER: "/Ac/Genset/L1/Power", // <- All from the genset.
      AC_GENSET_L2_POWER: "/Ac/Genset/L2/Power",
      AC_GENSET_L3_POWER: "/Ac/Genset/L3/Power"
    },
    SYSTEM: {
      STATE: "/SystemState/State",
      MODE: "/Mode", // Position of the switch.

      AC_NUMBER_OF_PHASES: "/Ac/Consumption/NumberOfPhases", //  <- Either 1 (single phase), 2 (split-phase) or 3 (three-phase)
      VEBUS_SERVICE: "/VebusService" // <- Returns the service name of the vebus service.
    }
  }
}

export const SERVICES = {
  SYSTEM: objectValues(DBUS_PATHS.GENERAL)
    .concat(objectValues(DBUS_PATHS.BATTERY))
    .concat(objectValues(DBUS_PATHS.SOLAR_CHARGERS))
    .concat(objectValues(DBUS_PATHS.INVERTER_CHARGER.DC_LOADS))
    .concat(DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE)
    .concat(DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE)
    .concat(DBUS_PATHS.INVERTER_CHARGER.SYSTEM.VEBUS_SERVICE),
  VEBUS: objectValues(DBUS_PATHS.INVERTER_CHARGER.AC_LOADS)
    .concat(objectValues(DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER))
    .concat(objectValues(DBUS_PATHS.INVERTER_CHARGER.GENERATOR))
    .concat([DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.AC_SOURCE, DBUS_PATHS.INVERTER_CHARGER.SYSTEM.AC_NUMBER_OF_PHASES])
}

export enum BATTERY_STATE {
  IDLE = 0,
  CHARGING = 1,
  DISCHARGING = 2
}

export enum VEBUS_SYSTEM_STATE {
  OFF = 0,
  LOW_POWER = 1,
  FAULT_CONDITION = 2,
  BULK_CHARGING = 3,
  ABSORPTION_CHARGINNG = 4,
  FLOAT_CHARGING = 5,
  STORAGE_MODE = 6,
  EQUALISATION_CHARGING = 7,
  PASSTHRU = 8,
  INVERTING = 9,
  ASSISTING = 10,
  DISCHARGING = 256,
  SUSTAIN = 257
}

export enum AC_SOURCE {
  NOT_AVAILABLE = 0,
  GRID = 1,
  GENSET = 2,
  SHORE = 3,
  INVERTING_ISLAND_MODE = 240
}

export enum SYSTEM_MODE {
  CHARGER_ONLY = 1,
  INVERTER_ONLY = 2,
  ON = 3,
  OFF = 4
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
