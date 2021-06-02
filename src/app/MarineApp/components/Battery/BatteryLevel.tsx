import { BATTERY_STATE } from "../../../utils/constants"
import { Battery } from "../../../modules/Battery/Battery.provider"
import React from "react"
import { formatNumber } from "../../../components/NumericValue"

const batteryStateFormatter = (value: number) => {
  switch (value) {
    case BATTERY_STATE.CHARGING:
      return "Charging"
    case BATTERY_STATE.DISCHARGING:
      return "Discharging"
    case BATTERY_STATE.IDLE:
      return "Idle"
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

    if (days) return `${days} days`
    else if (hours) return `${hours} hours`
    else if (minutes) return `${minutes} minutes`
    // we are not interested in seconds, since it's an
    // estimate anyways
  } else {
    return null
  }
}

type BatteryLevelProps = {
  battery: Battery
}

export const BatteryLevel = ({ battery }: BatteryLevelProps) => {
  const batteryStateLabel = batteryStateFormatter(battery.state!)
  const timeToGoLabel = batteryTimeToGoFormatter(battery.timetogo!)
  const showTimetoGo = battery.state === BATTERY_STATE.DISCHARGING && battery.timetogo
  const showSoc = battery.soc !== undefined && battery.soc !== null

  return (
    <div className="metrics__right">
      {batteryStateLabel && <span>{batteryStateLabel}</span>}
      {showTimetoGo && <span>{timeToGoLabel}</span>}
      {showSoc && <span>{formatNumber({ value: battery.soc })}%</span>}
    </div>
  )
}
