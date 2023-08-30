import { BATTERY_STATE } from "../../../utils/constants"
import { Battery, useLanguage } from "@victronenergy/mfd-modules"
import { formatNumber } from "../../../components/NumericValue"
import { translate, Translate } from "react-i18nify"
import { mfdLanguageOptions } from "app/locales/constants"
import { observer } from "mobx-react"

const batteryStateFormatter = (value: number) => {
  switch (value) {
    case BATTERY_STATE.CHARGING:
      return "charging"
    case BATTERY_STATE.DISCHARGING:
      return "discharging"
    case BATTERY_STATE.IDLE:
      return "idle"
    default:
      return null
  }
}

const batteryTimeToGoFormatter = (timeToGo: number) => {
  const secs = timeToGo
  if (!isNaN(secs)) {
    const days = Math.floor(secs / 86400)
    const hours = Math.floor((secs - days * 86400) / 3600)
    const minutes = Math.floor((secs - hours * 3600) / 60)
    // const seconds = Math.floor(secs - minutes * 60)

    if (days) return `${days} ${translate("common.days")}`
    else if (hours) return `${hours} ${translate("common.hours")}`
    else if (minutes) return `${minutes} ${translate("common.minutes")}`
    // we are not interested in seconds, since it's an
    // estimate anyways
  } else {
    return null
  }
}

type BatteryLevelProps = {
  battery: Battery
}

export const BatteryLevel = observer(({ battery }: BatteryLevelProps) => {
  // listen for language change to re-render component
  // since we are using translate func and need to rerun it again
  useLanguage(mfdLanguageOptions)

  const batteryStateLabel = batteryStateFormatter(battery.state!)
  const timeToGoLabel = batteryTimeToGoFormatter(battery.timetogo!) + " "
  const showTimetoGo = battery.state === BATTERY_STATE.DISCHARGING && battery.timetogo
  const showSoc = battery.soc !== undefined && battery.soc !== null

  return (
    <div className="metrics__right battery-level">
      {batteryStateLabel && (
        <span>
          <Translate data-test-id="batteryStatus" value={"common." + batteryStateLabel} />
        </span>
      )}
      <div className="charge-indicator">
        {showTimetoGo && <div className="time-to-go">{timeToGoLabel}</div>}
        {showSoc && (
          <>
            <span>{formatNumber({ value: battery.soc })}</span>
            <span>%</span>
          </>
        )}
      </div>
    </div>
  )
})
