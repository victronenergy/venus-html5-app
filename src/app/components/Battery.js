import React, { Component } from "react"
import NumericValue from "./NumericValue"
import MqttListOfTopics from "../mqtt/MqttListOfTopics"

import { BATTERY_STATE } from "../../service/topics"
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
      <MqttListOfTopics
        topicList={[
          `N/${portalId}/system/0/Dc/Battery/Current`,
          `N/${portalId}/system/0/Dc/Battery/State`,
          `N/${portalId}/system/0/Dc/Battery/Soc`,
          `N/${portalId}/system/0/Dc/Battery/TimeToGo`,
          `N/${portalId}/system/0/Dc/Battery/Power`,
          `N/${portalId}/system/0/Dc/Battery/Voltage`
        ]}
      >
        {topics => {
          return (
            <Battery
              soc={topics[`N/${portalId}/system/0/Dc/Battery/Soc`].value}
              state={batteryStateFormatter(topics[`N/${portalId}/system/0/Dc/Battery/State`].value)}
              voltage={topics[`N/${portalId}/system/0/Dc/Battery/Voltage`].value}
              current={topics[`N/${portalId}/system/0/Dc/Battery/Current`].value}
              power={topics[`N/${portalId}/system/0/Dc/Battery/Power`].value}
              timeToGo={batteryTimeToGoFormatter(topics[`N/${portalId}/system/0/Dc/Battery/TimeToGo`].value)}
            />
          )
        }}
      </MqttListOfTopics>
    )
  }
}
export default BatteryWithData
