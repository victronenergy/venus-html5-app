import React, { Component } from "react"
import NumericValue from "./../NumericValue"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttTopicWildcard from "../../mqtt/MqttTopicWildcard"
import BatteryLevel from "./BatteryLevel"
import BatteryName from "./BatteryName"

const secondaryBatteriesFeatureEnabled = true

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

const mapChannelsToInstances = (instances, mainBatteryInstanceNumber) => {
  let instancesWithChannels = []
  instances.forEach((i, index) => {
    if (i !== Number(mainBatteryInstanceNumber)) {
      instancesWithChannels.push([i, 0, index])
    }

    instancesWithChannels.push([i, 1, index])
  })
  return instancesWithChannels
}

const secondaryBatteries = (instances, mainBatteryInstance, portalId) => {
  const instancesWithChannels = mapChannelsToInstances(instances, mainBatteryInstance)
  return instancesWithChannels.map(([instance, channel, index]) => {
    return (
      <MqttSubscriptions
        key={instance + channel}
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
                <BatteryName
                  portalId={portalId}
                  batteryInstanceId={instance}
                  batteryChannel={channel}
                  index={index + 1}
                />
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
  if (!props.mainBattery) {
    return null
  }
  const [, mainBatteryInstanceNumber] = props.mainBattery.split("battery/")
  return (
    <div className="metric metric__container metric__battery">
      <div className="metric__container--left">
        <img src={require("../../../images/icons/battery.svg")} className="metric__icon" />
        <div className="metric__value-container">
          <p className="text text--medium">
            <BatteryName
              portalId={props.portalId}
              batteryInstanceId={mainBatteryInstanceNumber}
              main
              batteryChannel={0}
            />
          </p>
          <div className="metric__values">
            <NumericValue value={props.voltage} unit="V" precision={1} />
            <NumericValue value={props.current} unit="A" precision={1} />
            <NumericValue value={props.power} unit="W" />
          </div>
          {secondaryBatteriesFeatureEnabled &&
            secondaryBatteries(props.batteryInstances, mainBatteryInstanceNumber, props.portalId)}
        </div>
      </div>
      <BatteryLevel state={props.state} soc={props.soc} timeToGo={props.timeToGo} />
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
            <MqttTopicWildcard wildcard={`N/${portalId}/battery/+/DeviceInstance`}>
              {batteryInstances => {
                return (
                  <Battery
                    soc={topics.soc.value}
                    state={topics.state.value}
                    voltage={topics.voltage.value}
                    current={topics.current.value}
                    power={topics.power.value}
                    timeToGo={topics.timeToGo.value}
                    mainBattery={topics.mainBattery.value}
                    batteryInstances={Object.values(batteryInstances).map(b => b.value)}
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
