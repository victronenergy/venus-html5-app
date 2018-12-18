import { BATTERY_STATE } from "../../utils/constants"
import React from "react"
import PropTypes from "prop-types"

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
  const batteryStateLabel = batteryStateFormatter(props.state)
  const timeToGoLabel = batteryTimeToGoFormatter(props.timeToGo)
  const showTimetoGo = props.state === BATTERY_STATE.DISCHARGING
  return (
    <div
      className={
        "metric__container--right metric__battery-level-container" +
        (showTimetoGo ? " metric__battery-level-container--col" : "")
      }
    >
      <div className="text--bottom-align">
        <span className="text text--bold text--large">{props.soc ? props.soc : ""}</span>
        <span className="text text--small metric__battery-state">
          {props.soc ? "%" : ""}
          &nbsp;
          {batteryStateLabel || ""}
        </span>
      </div>
      {showTimetoGo && props.timeToGo ? <p className="text text--small">{timeToGoLabel}</p> : ""}
    </div>
  )
}

BatteryLevel.propTypes = {
  state: PropTypes.oneOf(Object.values(BATTERY_STATE)),
  soc: PropTypes.number,
  timeToGo: PropTypes.number
}

export default BatteryLevel
