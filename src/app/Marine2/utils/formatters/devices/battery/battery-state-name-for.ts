import { translate } from "react-i18nify"
import { BATTERY } from "../../../constants"
import { timeAsStringFormatter } from "../../../formatters"

export const batteryStateNameFor = (state: number, timetogo?: number): string | null => {
  switch (state) {
    case BATTERY.CHARGING:
      return translate("common.charging")
    case BATTERY.IDLE:
      return translate("common.idle")
    case BATTERY.DISCHARGING:
      return timetogo
        ? `${timeAsStringFormatter(translate, timetogo)} ${translate("common.timetogo")}`
        : translate("common.discharging")
  }
  return null
}
