import React, { Component } from "react"
import NumericValue from "./NumericValue"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"

const getTopics = portalId => {
  return {
    voltage: `N/${portalId}/system/0/Dc/Battery/Voltage`,
    power: `N/${portalId}/system/0/Dc/System/Power`
  }
}

const DcLoads = props => {
  return (
    <div className="metric metric--small">
      <img src={require("../../images/icons/dc.svg")} className="metric__icon" />
      <div className="metric__value-container">
        <p className="text text--medium">DC Loads</p>
        <div className="metric__values">
          <NumericValue value={props.voltage ? props.power / props.voltage : null} unit="A" precision={1} />
          <NumericValue value={props.power} unit="W" />
        </div>
      </div>
    </div>
  )
}

class DcLoadsWithData extends Component {
  render() {
    const { portalId } = this.props
    if (!portalId) {
      return <DcLoads loading />
    }
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics => {
          return <DcLoads voltage={topics.voltage.value} power={topics.power.value} />
        }}
      </MqttSubscriptions>
    )
  }
}

export default DcLoadsWithData
