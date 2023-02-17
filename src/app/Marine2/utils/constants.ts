export const WIDGET_TYPES = {
  AC_LOADS: "AcLoads",
  ACTIVE_SOURCE: "ActiveSource",
  BATTERY: "Battery",
  CHARGERS: "Chargers",
  DC_LOADS: "DcLoads",
  GENERATOR_FP: "GeneratorFp",
  GENERATOR_RELAY: "GeneratorRelay",
  INVERTER_CHARGER: "InverterCharger",
  INVERTERS: "Inverters",
  SOLAR: "Solar",
} as const

export const BATTERY = {
  IDLE: 0,
  CHARGING: 1,
  DISCHARGING: 2,
}

export const AC_SOURCE = {
  UNUSED: 0,
  GRID: 1,
  GENERATOR: 2,
  SHORE: 3,
}

export const ACTIVE_INPUT = {
  NONE: 240, // Most likely inverting
}
