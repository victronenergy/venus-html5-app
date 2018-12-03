import React, { Component } from "react"
import NumericValue from "./NumericValue"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"

import { BATTERY_STATE } from "../utils/constants"

const getTopics = portalId => {
  return {
    current: `N/${portalId}/system/0/Dc/Battery/Current`,
    state: `N/${portalId}/system/0/Dc/Battery/State`,
    soc: `N/${portalId}/system/0/Dc/Battery/Soc`,
    timeToGo: `N/${portalId}/system/0/Dc/Battery/TimeToGo`,
    power: `N/${portalId}/system/0/Dc/Battery/Power`,
    voltage: `N/${portalId}/system/0/Dc/Battery/Voltage`
  }
}

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

const Battery = props => {
  const showTimetoGo = props.state === "Discharging"
  return (
    <div className="metric metric__container metric__battery">
      <div className="metric__container--left">
        <img src={require("../../images/icons/battery.svg")} className="metric__icon" />
        <div className="metric__value-container">
          <p className="text text--medium">Battery</p>
          <div className="metric__values">
            <NumericValue value={props.voltage} unit="V" precision={1} />
            <NumericValue value={props.current} unit="A" precision={1} />
            <NumericValue value={props.power} unit="W" />
          </div>
        </div>
      </div>
      <div
        className={"metric__battery-level-container" + (showTimetoGo ? " metric__battery-level-container--col" : "")}
      >
        <div className="text--bottom-align">
          <span className="text text--bold text--large">{props.soc ? props.soc : ""}</span>
          <span className="text text--small metric__battery-state">
            {props.soc ? "%" : ""}
            &nbsp;
            {props.state || ""}
          </span>
        </div>
        {showTimetoGo && props.timeToGo ? <p className="text text--small">{props.timeToGo}</p> : ""}
      </div>
    </div>
  )
}

class BatteryWithData extends Component {
  render() {
    const { portalId } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics => {
          return (
            <Battery
              soc={topics.soc.value}
              state={batteryStateFormatter(topics.state.value)}
              voltage={topics.voltage.value}
              current={topics.current.value}
              power={topics.power.value}
              timeToGo={batteryTimeToGoFormatter(topics.timeToGo.value)}
            />
          )
        }}
      </MqttSubscriptions>
    )
  }
}
export default BatteryWithData
