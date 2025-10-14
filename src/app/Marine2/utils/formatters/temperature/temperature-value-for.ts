import { TemperatureUnit } from "@victronenergy/mfd-modules"
import { celsiusToFahrenheit } from "./celcius-to-fahrenheit"

export const temperatureValueFor = (temperature: number, unit: TemperatureUnit, rounded: boolean = true) => {
  if (unit === "fahrenheit") {
    const fahrenheitValue = celsiusToFahrenheit(temperature)
    return rounded ? Math.round(fahrenheitValue * 10) / 10 : fahrenheitValue
  }

  return rounded ? Math.round(temperature * 10) / 10 : temperature
}
