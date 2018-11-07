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
    STATE: "/Dc/Battery/State",

    CIRCUIT_BREAKER_ALARM: "/Dc/Battery/Alarms/CircuitBreakerTripped", //<- Something special
    CONSUMED_AMP_HOURRS: "/Dc/Battery/ConsumedAmphours",
    TIME_TO_GO: "/Dc/Battery/TimeToGo"
  },
  SOLAR_CHARGERS: {
    CURRENT: "/Dc/Pv/Current", //<- total output current of all connected solar chargers
    POWER: "/Dc/Pv/Power" //<- same, but then the power
  },
  // VE.Bus systems (Multis, Quattros, Inverters)
  INVERTER_CHARGER: {
    DC_LOADS: {
      POWER: "/Dc/System/Power"
    },
    AC_LOADS: {
      OUTPUT_CURRENT_PHASE_1: "/Ac/Out/L1/I",
      OUTPUT_CURRENT_PHASE_2: "/Ac/Out/L2/I",
      OUTPUT_CURRENT_PHASE_3: "/Ac/Out/L3/I",
      OUTPUT_VOLTAGE_PHASE_1: "/Ac/Out/L1/V",
      OUTPUT_VOLTAGE_PHASE_2: "/Ac/Out/L2/V",
      OUTPUT_VOLTAGE_PHASE_3: "/Ac/Out/L3/V",
      OUTPUT_POWER_PHASE_1: "/Ac/ConsumptionOnOutput/L1/Power",
      OUTPUT_POWER_PHASE_2: "/Ac/ConsumptionOnOutput/L2/Power",
      OUTPUT_POWER_PHASE_3: "/Ac/ConsumptionOnOutput/L3/Power"
    },
    PRODUCT_ID: "/ProductId",
    ACTIVE_INPUT: "/Ac/ActiveIn/ActiveInput", // Active input: 0 = ACin-1, 1 = ACin-2, 240 is none (inverting).
    // also known as GRID
    ACTIVE_IN: {
      VOLTAGE_PHASE_1: "/Ac/ActiveIn/L1/V", //  <- Voltage (Volts)
      CURRENT_PHASE_1: "/Ac/ActiveIn/L1/I", // <- Current (Amps)
      POWER_PHASE_1: "/Ac/ActiveIn/L1/P", //  <- Power (Watts)
      FREQUENCY_PHASE_1: "/Ac/ActiveIn/L1/F", // <- Frequency (Hz)

      VOLTAGE_PHASE_2: "/Ac/ActiveIn/L2/V",
      CURRENT_PHASE_2: "/Ac/ActiveIn/L2/I",
      POWER_PHASE_2: "/Ac/ActiveIn/L2/P",
      FREQUENCY_PHASE_2: "/Ac/ActiveIn/L2/F",

      VOLTAGE_PHASE_3: "/Ac/ActiveIn/L3/V",
      CURRENT_PHASE_3: "/Ac/ActiveIn/L3/I",
      POWER_PHASE_3: "/Ac/ActiveIn/L3/P",
      FREQUENCY_PHASE_3: "/Ac/ActiveIn/L3/F",

      CURRENT_LIMIT: "/Ac/ActiveIn/CurrentLimit",
      CURRENT_LIMIT_IS_ADJUSTABLE: "/Ac/ActiveIn/CurrentLimitIsAdjustable"
    },
    SHORE_POWER: {
      // Only available for VE.Bus versions > 415
      CURRENT_LIMIT: "/CurrentLimit",
      CURRENT_LIMIT_MAX: "/CurrentLimitGetMax",
      CURRENT_LIMIT_IS_ADJUSTABLE: "/CurrentLimitIsAdjustable"
    },
    GENERATOR: {
      AC_GENSET_L1_POWER: "/Ac/Genset/L1/Power", // <- All from the genset.
      AC_GENSET_L2_POWER: "/Ac/Genset/L2/Power",
      AC_GENSET_L3_POWER: "/Ac/Genset/L3/Power"
    },
    SYSTEM: {
      STATE: "/SystemState/State",
      MODE: "/Mode", // Position of the switch. 1=Charger Only;2=Inverter Only;3=On;4=Off
      MODE_IS_ADJUSTABLE: "/ModeIsAdjustable",
      AC_NUMBER_OF_PHASES: "/Ac/Consumption/NumberOfPhases", //  <- Either 1 (single phase), 2 (split-phase) or 3 (three-phase)
      VEBUS_SERVICE: "/VebusService" // <- Returns the service name of the vebus service.
    }
  },
  SETTINGS: {
    AC_INPUT_TYPE1: "/Settings/SystemSetup/AcInput1",
    AC_INPUT_TYPE2: "/Settings/SystemSetup/AcInput2"
  }
}
