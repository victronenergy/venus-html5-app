import { translate } from "react-i18nify"
import { GENSET_STATE } from "../../../constants/devices/generators"

export const gensetStateFormatter = (value: number) => {
  if (value === GENSET_STATE.STANDBY) {
    return translate("common.standby")
    // @ts-ignore
  } else if (GENSET_STATE.STARTING.includes(value)) {
    return translate("common.standby")
  } else if (value === GENSET_STATE.RUNNING) {
    return translate("common.running")
  } else if (value === GENSET_STATE.STOPPING) {
    return translate("common.stopping")
  } else if (value === GENSET_STATE.ERROR) {
    return translate("common.error")
  } else {
    return translate("common.notAvailable")
  }
}
