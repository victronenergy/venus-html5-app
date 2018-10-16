import { numericFormatter, systemModeFormatter, systemStateFormatter } from "./util"

export default {
  "/system/0/Dc/Battery/Voltage": {
    name: "Dc/Battery/Voltage",
    description: "Voltage",
    unit: "V",
    formatter: numericFormatter(1),
    timeout: 0
  },
  "/system/0/Dc/Battery/Current": {
    name: "Dc/Battery/Current",
    description: "Current",
    unit: "A",
    formatter: numericFormatter(1),
    timeout: 0
  },
  "/system/0/Dc/Battery/Power": {
    name: "Dc/Battery/Power",
    description: "Power",
    unit: "W",
    formatter: numericFormatter(),
    timeout: 0
  },
  "/system/0/Dc/Battery/Soc": {
    name: "Dc/Battery/Soc",
    description: "State of charge",
    unit: "%",
    formatter: numericFormatter(),
    timeout: 0
  },
  "/system/0/Dc/Vebus/Current": {
    name: "Dc/Loads/Current",
    description: "DC loads current",
    unit: "A",
    formatter: numericFormatter(1),
    timeout: 0
  },
  "/system/0/Dc/Vebus/Power": {
    name: "Dc/Loads/Power",
    description: "DC loads power",
    unit: "W",
    formatter: numericFormatter(),
    timeout: 0
  },
  "/vebus/257/Ac/Out/L1/V": {
    name: "Ac/Loads/Voltage",
    description: "AC loads voltage",
    unit: "V",
    formatter: numericFormatter(),
    timeout: 0
  },
  "/vebus/257/Ac/Out/L1/I": {
    name: "Ac/Loads/Current",
    description: "AC loads current",
    unit: "A",
    formatter: numericFormatter(1),
    timeout: 0
  },
  "/vebus/257/Ac/Out/L1/P": {
    name: "Ac/Loads/Power",
    description: "AC loads power",
    unit: "W",
    formatter: numericFormatter(),
    timeout: 0
  },
  "/vebus/257/Ac/ActiveIn/Connected": {
    name: "Ac/Grid/IsConnected",
    description: "Grid is connected",
    formatter: numericFormatter()
  },
  "/vebus/257/Ac/ActiveIn/L1/V": {
    name: "Ac/Grid/Voltage",
    description: "Grid voltage",
    unit: "V",
    formatter: numericFormatter(),
    timeout: 0
  },
  "/vebus/257/Ac/ActiveIn/L1/I": {
    name: "Ac/Grid/Current",
    description: "Grid current",
    unit: "A",
    formatter: numericFormatter(1),
    timeout: 0
  },
  "/vebus/257/Ac/ActiveIn/L1/P": {
    name: "Ac/Grid/Power",
    description: "Grid power",
    unit: "W",
    formatter: numericFormatter(),
    timeout: 0
  },
  "/system/0/SystemState/State": {
    name: "System/State",
    description: "System state",
    unit: "",
    formatter: systemStateFormatter,
    timeout: 0
  },
  "/vebus/257/Mode": {
    name: "System/Mode",
    description: "System mode",
    unit: "",
    formatter: systemModeFormatter,
    timeout: 0,
    write: true
  },
  "/vebus/257/Ac/ActiveIn/CurrentLimit": {
    name: "Ac/Grid/CurrentLimit",
    description: "Grid input limit",
    unit: "A",
    formatter: numericFormatter(),
    timeout: 0,
    write: true
  }
}
