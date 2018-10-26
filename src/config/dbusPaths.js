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
    ACTIVE_INPUT: "/Ac/ActiveIn/ActiveInput", // Active input: 0 = ACin-1, 1 = ACin-2, 240 is none (inverting).
    IS_CONNECTED_TO_POWER: "/Ac/ActiveIn/Connected", // 0 when inverting, 1 when connected to an AC in.
    // also known as GRID
    SHORE_POWER: {
      L1_VOLTAGE: "/Ac/ActiveIn/L1/V", //  <- Voltage (Volts)
      L1_CURRENT: "/Ac/ActiveIn/L1/I", // <- Current (Amps)
      L1_POWER: "/Ac/ActiveIn/L1/P", //  <- Power (Watts)
      L1_FREQUENCY: "/Ac/ActiveIn/L1/F", // <- Frequency (Hz)
      L2_VOLTAGE: "/Ac/ActiveIn/L2/V", //  <- Voltage (Volts)
      L2_CURRENT: "/Ac/ActiveIn/L2/I", // <- Current (Amps)
      L2_POWER: "/Ac/ActiveIn/L2/P", //  <- Power (Watts)
      L2_FREQUENCY: "/Ac/ActiveIn/L2/F", // <- Frequency (Hz)
      L3_VOLTAGE: "/Ac/ActiveIn/L3/V", //  <- Voltage (Volts)
      L3_CURRENT: "/Ac/ActiveIn/L3/I", // <- Current (Amps)
      L3_POWER: "/Ac/ActiveIn/L3/P", //  <- Power (Watts)
      L3_FREQUENCY: "/Ac/ActiveIn/L3/F", // <- Frequency (Hz)

      CURRENT_LIMIT: "/Ac/ActiveIn/CurrentLimit"
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
  },
  SETTINGS: {
    AC_INPUT_TYPE1: "/Settings/SystemSetup/AcInput1",
    AC_INPUT_TYPE2: "/Settings/SystemSetup/AcInput2"
  }
}
