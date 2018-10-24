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
      CURRENT: "/Ac/Out/L1/I",
      POWER: "/Ac/Out/L1/V",
      VOLTAGE: "/Ac/Out/L1/P",

      CONSUMPTION_OUTPUT_L1_POWER: "/Ac/ConsumptionOnOutput/L1/Power", // <- Use this for AC Consumption.
      CONSUMPTION_OUTPUT_L2_POWER: "/Ac/ConsumptionOnOutput/L2/Power",
      CONSUMPTION_OUTPUT_L3_POWER: "/Ac/ConsumptionOnOutput/L3/Power"
    },
    AC_SOURCE: "/Ac/ActiveIn/Source", // <- The active AC-In source of the multi.
    // also known as GRID
    SHORE_POWER: {
      IS_CONNECTED: "/Ac/ActiveIn/Connected", // 0 when inverting, 1 when connected to an AC in.
      VOLTAGE: "/Ac/ActiveIn/L1/V",
      CURRENT: "/Ac/ActiveIn/L1/I",
      POWER: "/Ac/ActiveIn/L1/P",
      CURRENT_LIMIT: "/Ac/ActiveIn/CurrentLimit",

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
      STATES: {
        CHARGER_ONLY: 1,
        INVERTER_ONLY: 2,
        ON: 3,
        OFF: 4
      },

      AC_NUMBER_OF_PHASES: "/Ac/Consumption/NumberOfPhases", //  <- Either 1 (single phase), 2 (split-phase) or 3 (three-phase)
      VEBUS_SERVICE: "/VebusService" // <- Returns the service name of the vebus service.
    }
  }
}
