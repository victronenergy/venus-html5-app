import React, { Component } from "react"
import NumericValue from "../NumericValue"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import HeaderView from "../HeaderView/HeaderView"
import MetricValues from "../MetricValues/MetricValues"

const getTopics = portalId => {
  return {
    power: `N/${portalId}/system/0/Dc/Pv/Power`,
    current: `N/${portalId}/system/0/Dc/Pv/Current`
  }
}

const Solar = props => {
  return (
    <HeaderView small icon={require("../../../images/icons/dc.svg")} title="Solar">
      <MetricValues>
        <NumericValue value={props.current} unit="A" precision={1} />
        <NumericValue value={props.power} unit="W" />
      </MetricValues>
    </HeaderView>
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
