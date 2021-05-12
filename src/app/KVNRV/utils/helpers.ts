import { Conf } from "./constants"
import { STATUS_LEVELS } from "../components/Views/Metrics"

export const sendUpdate = (percent: number, conf: Conf, part: string, addFunc: Function, removeFunc: Function) => {
  if (percent > conf.THRESHOLDS[0]) {
    if (percent < conf.THRESHOLDS[0] + conf.THRESHOLDS[1]) {
      addFunc({ part, message: " too much power!", level: STATUS_LEVELS.WARNING })
    } else {
      addFunc({ part, message: " too much power!", level: STATUS_LEVELS.ALARM })
    }
  } else {
    removeFunc(part)
  }
}

export const normalizePower = (power: number, max: number) => {
  return Math.max(Math.min(power / max, 1), 0)
}
