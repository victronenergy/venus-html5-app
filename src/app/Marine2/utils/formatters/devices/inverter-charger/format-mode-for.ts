import { SYSTEM_MODE } from "../../../constants/generic"
import { translate } from "react-i18nify"

export const formatModeFor = (value: number) => {
  switch (Number(value)) {
    case SYSTEM_MODE.CHARGER_ONLY:
      return translate("common.chargerOnly")
    case SYSTEM_MODE.INVERTER_ONLY:
      return translate("common.inverterOnly")
    case SYSTEM_MODE.ON:
      return translate("common.on")
    case SYSTEM_MODE.OFF:
      return translate("common.off")
    default:
      return ""
  }
}
