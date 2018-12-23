import React, { Component } from "react"

import BatteryLevel from "./BatteryLevel"
import HidingContainer from "../HidingContainer"
import NumericValue from "./../NumericValue"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"

import { getMessageJson } from "../../utils/util"

import "./Battery.scss"

const getTopics = portalId => {
  return {
    batteries: `N/${portalId}/system/0/Batteries`
  }
}

const BatteryHeader = ({ amount }) => {
  return (
    <div className="battery__header">
      <img src={require("../../../images/icons/battery.svg")} className="metric__icon" />
      <div className="battery__header-text">
        <span>Batteries</span>
        <span className="text text--smaller text--opaque">{`${amount} instance${amount > 1 ? "s" : ""}`}</span>
      </div>
    </div>
  )
}

const Batteries = ({ batteries }) => {
  return (
    <div className="batteries">
      {batteries.map(({ voltage, current, power, name, soc, state, id, timetogo }, i) => (
        <div className="battery" key={id}>
          <div className="battery__index">{i}</div>
          <div className="battery__data">
            {name}
            <div>
              {voltage && <NumericValue value={voltage} unit="V" precision={1} />}
              {current && <NumericValue value={current} unit="A" precision={1} />}
              {power && <NumericValue value={power} unit="W" />}
            </div>
          </div>
          {soc && <BatteryLevel state={state} soc={soc} timeToGo={timetogo} />}
        </div>
      ))}
    </div>
  )
}

const mainBatteryToFirst = batteries => {
  // Move main battery to first in the array
  return batteries.sort((a, b) => (a.active_battery_service ? -1 : b.active_battery_service ? 1 : 0))
}

class BatteryWithData extends Component {
  render() {
    const { portalId } = this.props
    return (
      <HidingContainer>
        <MqttSubscriptions topics={getTopics(portalId)}>
          {topics => {
            const batteries = topics.batteries.value
            if (!batteries) {
              return null
            } else {
              mainBatteryToFirst(batteries)
              return (
                <div className="metric metric__battery">
                  <BatteryHeader amount={batteries.length} />
                  <Batteries batteries={batteries} />
                </div>
              )
            }
          }}
        </MqttSubscriptions>
      </HidingContainer>
    )
  }
}
export default BatteryWithData
