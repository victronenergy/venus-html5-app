import React, { Component } from "react"
import NumericValue from "./../NumericValue"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttTopicWildcard from "../../mqtt/MqttTopicWildcard"
import BatteryLevel from "./BatteryLevel"
import BatteryName from "./BatteryName"
import "./Battery.scss"

const getTopics = portalId => {
  return {
    mainBattery: `N/${portalId}/system/0/ActiveBatteryService`
  }
}

const BatteryHeader = props => {
  return (
    <div className="battery__header">
      <img src={require("../../../images/icons/battery.svg")} className="metric__icon" />
      <div className="battery__header-text">
        <span>Batteries</span>
        <span className="text text--smaller text--opaque">{`${props.amount} instance${
          props.amount.length > 1 ? "s" : ""
        }`}</span>
      </div>
    </div>
  )
}

const Battery = props => {
  const { instance, channel, portalId, index, i } = props
  const isStarter = channel === 1
  return (
    <MqttSubscriptions
      topics={{
        voltage: `N/${portalId}/battery/${instance}/Dc/${channel}/Voltage`,
        current: `N/${portalId}/battery/${instance}/Dc/${channel}/Current`,
        power: `N/${portalId}/battery/${instance}/Dc/${channel}/Power`,
        soc: `N/${portalId}/battery/${instance}/Soc`,
        timeToGo: `N/${portalId}/battery/${instance}/TimeToGo`,
        state: `N/${portalId}/battery/${instance}/State`
      }}
    >
      {topics => {
        if (topics.voltage.value || topics.current.value || topics.power.value) {
          return (
            <div className="battery">
              <div className="battery__index">{i}</div>
              <div className="battery__data">
                <BatteryName portalId={portalId} batteryInstanceId={instance} batteryChannel={channel} index={index} />
                <div>
                  <NumericValue value={topics.voltage.value} unit="V" precision={1} />
                  {!isStarter && <NumericValue value={topics.current.value} unit="A" precision={1} />}
                  {!isStarter && <NumericValue value={topics.power.value} unit="W" />}
                </div>
              </div>
              {!isStarter && (
                <BatteryLevel state={topics.state.value} soc={topics.soc.value} timeToGo={topics.timeToGo.value} />
              )}
            </div>
          )
        }
      }}
    </MqttSubscriptions>
  )
}

const Batteries = props => {
  const { instancesWithChannels, portalId } = props
  return (
    <div className="batteries">
      {instancesWithChannels.map(([instance, channel, indexByInstance], i) => (
        <Battery
          instance={instance}
          channel={channel}
          index={indexByInstance}
          i={i + 1}
          portalId={portalId}
          key={`battery-${indexByInstance}-channel-${channel}`}
        />
      ))}
    </div>
  )
}

const mainBatteryToFirst = (instances, mainBattery) => {
  let [, mainBatteryInstance] = mainBattery.split("battery/")
  // Move main battery to first in the array
  return [...instances].sort((a, b) => (a === mainBatteryInstance ? -1 : b === mainBatteryInstance ? 1 : 0))
}

const mapChannelsToInstances = instances => {
  const instancesWithChannels = []
  instances.forEach((i, index) => {
    instancesWithChannels.push([i, 0, index + 1])
    instancesWithChannels.push([i, 1, index + 1])
  })
  return instancesWithChannels
}

class BatteryWithData extends Component {
  render() {
    const { portalId } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics => {
          const { mainBattery } = topics
          if (!mainBattery.value) {
            return null
          } else {
            return (
              <MqttTopicWildcard wildcard={`N/${portalId}/battery/+/DeviceInstance`}>
                {batteryInstances => {
                  const instances = Object.values(batteryInstances).map(b => parseInt(b.value))
                  const instancesSorted = mainBatteryToFirst(instances, mainBattery.value)
                  const instancesWithChannels = mapChannelsToInstances(instancesSorted)
                  return (
                    <div className="metric metric__battery">
                      <BatteryHeader amount={instances.length} />
                      <Batteries instancesWithChannels={instancesWithChannels} portalId={portalId} />
                    </div>
                  )
                }}
              </MqttTopicWildcard>
            )
          }
        }}
      </MqttSubscriptions>
    )
  }
}
export default BatteryWithData
