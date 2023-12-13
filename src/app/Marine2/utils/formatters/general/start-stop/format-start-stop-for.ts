import { translate } from "react-i18nify"

export type StartStopValue = 0 | 1 | 2

export const formatStartStopFor = (value: StartStopValue) => {
  switch (value) {
    case 0:
      return translate("common.on")
    case 1:
      return translate("common.off")
    case 2:
      return translate("common.autoStartStop")
  }
}
