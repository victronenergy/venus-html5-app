import { SpeedUnit } from "@victronenergy/mfd-modules"

export const speedValueFor = (speed: number, unit: SpeedUnit) => {
  // perform conversion from the base unit that is assumed to be "km/h"
  switch (unit) {
    case "km/h":
      return speed
    case "m/s":
      return speed / 3.6
    case "mph":
      return speed / 1.60934
    case "kt":
      return speed / 1.852
  }
}
