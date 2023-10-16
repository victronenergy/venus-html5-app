import { translate } from "react-i18nify"
import { INVERTER_MODE } from "../../../constants"

export const formatModeFor = (value: number) => {
  switch (Number(value)) {
    case INVERTER_MODE.OFF:
      return translate("common.off")
    case INVERTER_MODE.VEBUS_ON:
    case INVERTER_MODE.ON:
      return translate("common.on")
    case INVERTER_MODE.ECO:
      return translate("common.eco")
    default:
      return translate("common.emptyBar")
  }
}
