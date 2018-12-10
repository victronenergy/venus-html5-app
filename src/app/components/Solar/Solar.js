import React, { Component } from "react"
import NumericValue from "../NumericValue"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"

const getTopics = portalId => {
  return {
    power: `N/${portalId}/system/0/Dc/Pv/Power`,
    current: `N/${portalId}/system/0/Dc/Pv/Current`
  }
}

const Solar = props => {
  return (
    <div className="metric metric--small">
      <img src={require("../../../images/icons/dc.svg")} className="metric__icon" />
      <div className="metric__value-container">
        <p className="text text--medium">Solar</p>
        <div className="metric__values">
          <NumericValue value={props.current} unit="A" precision={1} />
          <NumericValue value={props.power} unit="W" />
        </div>
      </div>
    </div>
  )
}

class SolarWithData extends Component {
  render() {
    const { portalId } = this.props
    if (!portalId) {
      return <Solar loading />
    }
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics => {
          return <Solar current={topics.current.value} power={topics.power.value} />
        }}
      </MqttSubscriptions>
    )
  }
}

export default SolarWithData
