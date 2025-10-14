import { SpeedUnit } from "@victronenergy/mfd-modules"

export const speedValueFor = (speed: number, unit: SpeedUnit) => {
  // perform conversion from the base unit that is assumed to be "m/s"
  switch (unit) {
    case "m/s":
      return speed
    case "km/h":
      return speed * 3.6
    case "mph":
      return speed * 2.23694
    case "kt":
      return speed * 1.94384
  }
}
