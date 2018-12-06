import React, { Component } from "react"
import NumericValue from "./NumericValue"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"
import MqttTopicWildcard from "../mqtt/MqttTopicWildcard"

import { BATTERY_STATE } from "../utils/constants"

const getTopics = portalId => {
  return {
    current: `N/${portalId}/system/0/Dc/Battery/Current`,
    state: `N/${portalId}/system/0/Dc/Battery/State`,
    soc: `N/${portalId}/system/0/Dc/Battery/Soc`,
    timeToGo: `N/${portalId}/system/0/Dc/Battery/TimeToGo`,
    power: `N/${portalId}/system/0/Dc/Battery/Power`,
    voltage: `N/${portalId}/system/0/Dc/Battery/Voltage`,
    mainBattery: `N/${portalId}/system/0/ActiveBatteryService`
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

const batteryInstanceRe = new RegExp("N/.*/battery/(\\d+)/Dc/\\d+/.*")

const getBatteryInstances = batteries => {
  return new Set(
    Object.keys(batteries).map(batteryPath => {
      const [, instance] = batteryPath.match(batteryInstanceRe)
      return instance
    })
  )
}

const mapChannelsToInstances = (instances, mainBatteryInstance) => {
  const [, mainBatteryInstanceNumber] = mainBatteryInstance.split("battery/")
  let instancesWithChannels = []
  instances.forEach(i => {
    if (i !== mainBatteryInstanceNumber) instancesWithChannels.push([i, 0])
    instancesWithChannels.push([i, 1])
  })
  return instancesWithChannels
}

const secondaryBatteries = (batteries, mainBatteryInstance, portalId) => {
  const instances = getBatteryInstances(batteries)
  const instancesWithChannels = mapChannelsToInstances(instances, mainBatteryInstance)
  return instancesWithChannels.map(([instance, channel]) => {
    return (
      <MqttSubscriptions
        topics={{
          voltage: `N/${portalId}/battery/${instance}/Dc/${channel}/Voltage`,
          current: `N/${portalId}/battery/${instance}/Dc/${channel}/Current`,
          power: `N/${portalId}/battery/${instance}/Dc/${channel}/Power`
        }}
      >
        {topics => {
          if (topics.voltage.value || topics.current.value || topics.power.value)
            return (
              <div className="metric__values">
                {`Instance ${instance} channel ${channel}`}
                <NumericValue value={topics.voltage.value} unit="V" precision={1} />
                <NumericValue value={topics.current.value} unit="A" precision={1} />
                <NumericValue value={topics.power.value} unit="W" />
              </div>
            )
        }}
      </MqttSubscriptions>
    )
  })
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
          {props.mainBattery && secondaryBatteries(props.batteries, props.mainBattery, props.portalId)}
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
            <MqttTopicWildcard wildcard={`N/${portalId}/battery/+/Dc/+/+`}>
              {allBatteries => {
                return (
                  <Battery
                    soc={topics.soc.value}
                    state={batteryStateFormatter(topics.state.value)}
                    voltage={topics.voltage.value}
                    current={topics.current.value}
                    power={topics.power.value}
                    timeToGo={batteryTimeToGoFormatter(topics.timeToGo.value)}
                    mainBattery={topics.mainBattery.value}
                    batteries={allBatteries}
                    portalId={portalId}
                  />
                )
              }}
            </MqttTopicWildcard>
          )
        }}
      </MqttSubscriptions>
    )
  }
}
export default BatteryWithData
