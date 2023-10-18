import { translate } from "react-i18nify"
import { isSinglePhaseFor } from "../../../helpers/is-single-phase-for"

export const generatorStateFor = (value: number, active: boolean = false, phases: number) => {
  if (active) {
    return isSinglePhaseFor(phases) ? translate("common.running") : translate("common.nrOfPhases", { phases })
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
