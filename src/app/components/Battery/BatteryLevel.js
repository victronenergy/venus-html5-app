import { BATTERY_STATE } from "../../utils/constants"
import { formatNumber } from "../NumericValue/index"
import React from "react"

const batteryStateFormatter = value => {
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

const batteryTimeToGoFormatter = timeToGo => {
  const secs = parseInt(timeToGo)
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

const BatteryLevel = ({ state, timeToGo, soc }) => {
  const batteryStateLabel = batteryStateFormatter(state)
  const timeToGoLabel = batteryTimeToGoFormatter(timeToGo)
  const showTimetoGo = state === BATTERY_STATE.DISCHARGING && timeToGo
  const showSoc = soc !== undefined && soc !== null

  return (
    <div className="metrics__right">
      {batteryStateLabel && <span>{batteryStateLabel}</span>}
      {showTimetoGo && <span>{timeToGoLabel}</span>}
      {showSoc && <span>{formatNumber({ value: soc })}%</span>}
    </div>
  )
}

// BatteryLevel.propTypes = {
//   state: PropTypes.oneOf(Object.values(BATTERY_STATE)),
//   soc: PropTypes.number,
//   timeToGo: PropTypes.number
// }

export default BatteryLevel
