import { AC_SOURCE_TYPE } from "app/utils/constants"
import { translate } from "react-i18nify"

export const formatInputTypeFor = (value: number) => {
  switch (Number(value)) {
    case AC_SOURCE_TYPE.NOT_IN_USE:
      return translate("common.notAvailable")
    case AC_SOURCE_TYPE.GENERATOR:
      return translate("common.generator")
    case AC_SOURCE_TYPE.GRID:
      return translate("common.grid")
    case AC_SOURCE_TYPE.SHORE:
      return translate("common.shorePower")
    default:
      return ""
  }
}
