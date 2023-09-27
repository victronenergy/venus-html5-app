import { POWER_HYSTERESIS_THRESHOLD } from "../constants/generic"

export const isPowerUnderThreshold = (value?: number) => {
  if (!value) {
    return false
  }

  return value < POWER_HYSTERESIS_THRESHOLD
}
