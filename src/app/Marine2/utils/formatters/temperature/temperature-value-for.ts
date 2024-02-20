import { TemperatureUnit } from "@victronenergy/mfd-modules"
import { celsiusToFahrenheit } from "./celcius-to-fahrenheit"

export const temperatureValueFor = (temperature: number, unit: TemperatureUnit) => {
  if (unit === "fahrenheit") {
    const fahrenheitValue = celsiusToFahrenheit(temperature)
    return Math.round(fahrenheitValue * 10) / 10
  }

  return Math.round(temperature * 10) / 10
}
