import { BATTERY_STATE } from "../../utils/constants"
import { formatNumber } from "./../NumericValue"
import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

function batteryStateFormatter(value) {
  switch (value) {
    case BATTERY_STATE.CHARGING:
      return "Charging"
    case BATTERY_STATE.DISCHARGING:
      return "Discharging"
    case BATTERY_STATE.IDLE:
      return "Idle"
  }
}
function batteryTimeToGoFormatter(timeToGo) {
  const secs = parseInt(timeToGo)
  if (!isNaN(secs)) {
    const days = Math.floor(secs / 86400)
    const hours = Math.floor((secs - days * 86400) / 3600)
    const minutes = Math.floor((secs - hours * 3600) / 60)
    const seconds = Math.floor(secs - minutes * 60)
    if (days) return `${days}d ${hours}h`
    else if (hours) return `${hours}h ${minutes}m`
    else if (minutes) return `${minutes}m ${seconds}s`
    else return `${seconds}s`
  } else {
    return null
  }
}

const BatteryLevel = props => {
  const { state, timeToGo, soc } = props
  const batteryStateLabel = batteryStateFormatter(state)
  const timeToGoLabel = batteryTimeToGoFormatter(timeToGo)
  const showTimetoGo = state === BATTERY_STATE.DISCHARGING && timeToGo
  return (
    <div
      className={classNames("metric__battery-level-container", "text--opaque", {
        "metric__battery-level-container--col": showTimetoGo
      })}
    >
      <div className="text--bottom-align">
        {batteryStateLabel && (
          <span className="text text--small metric__battery-state">
            {batteryStateLabel}
            &nbsp;
          </span>
        )}
        <span className="text text--bold">
          {soc ? formatNumber({ value: soc }) : ""}
          <span className="text text--small">%</span>
        </span>
      </div>
      {showTimetoGo && <span className="text text--small battery-level__time-to-go">{timeToGoLabel}</span>}
    </div>
  )
}

BatteryLevel.propTypes = {
  state: PropTypes.oneOf(Object.values(BATTERY_STATE)),
  soc: PropTypes.number,
  timeToGo: PropTypes.number
}

export default BatteryLevel
