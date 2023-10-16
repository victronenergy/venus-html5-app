import { translate } from "react-i18nify"
import { CHARGER_MODE } from "../../../constants"

export const formatModeFor = (value: number) => {
  switch (Number(value)) {
    case CHARGER_MODE.OFF:
      return translate("common.off")
    case CHARGER_MODE.ON:
      return translate("common.on")
    default:
      return translate("common.emptyBar")
  }
}
