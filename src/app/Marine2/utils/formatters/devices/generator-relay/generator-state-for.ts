import { translate } from "react-i18nify"

export const generatorStateFor = (value: number, active: boolean = false) => {
  if (active) {
    return translate("common.running")
  }

  switch (value) {
    case 1:
      return translate("common.running")
    case 10:
      return translate("common.error")
    default:
      return translate("common.stopped")
  }
}
