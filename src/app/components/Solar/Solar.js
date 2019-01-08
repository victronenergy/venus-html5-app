import React, { Component } from "react"

import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import MetricValues from "../MetricValues"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import NumericValue from "../NumericValue/index"

const getTopics = portalId => {
  return {
    power: `N/${portalId}/system/0/Dc/Pv/Power`,
    current: `N/${portalId}/system/0/Dc/Pv/Current`
  }
}

const Solar = ({ current, power }) => {
  return (
    <HeaderView icon={require("../../../images/icons/icon_solar.svg")} title="Solar">
      <MetricValues>
        <NumericValue value={current} unit="A" precision={1} />
        <NumericValue value={power} unit="W" />
      </MetricValues>
    </HeaderView>
  )
}

class SolarWithData extends Component {
  render() {
    const { portalId } = this.props
    return (
      <HidingContainer>
        {!portalId ? null : (
          <MqttSubscriptions topics={getTopics(portalId)}>
            {topics => {
              if (!topics.current.value && !topics.power.value) {
                return null
              } else {
                return <Solar current={topics.current.value} power={topics.power.value} />
              }
            }}
          </MqttSubscriptions>
        )}
      </HidingContainer>
    )
  }
}

export default SolarWithData
