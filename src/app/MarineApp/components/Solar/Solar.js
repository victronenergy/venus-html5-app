import React, { Component } from "react"

import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import MetricValues from "../MetricValues"
import MqttSubscriptions from "../../../mqtt/MqttSubscriptions"
import NumericValue from "../../../components/NumericValue"

import SolarIcon from "../../images/icons/icon_solar.svg"

const getTopics = (portalId) => {
  return {
    power: `N/${portalId}/system/0/Dc/Pv/Power`,
    current: `N/${portalId}/system/0/Dc/Pv/Current`,
  }
}

const Solar = ({ current, power }) => {
  return (
    <HeaderView icon={SolarIcon} title="Solar">
      <MetricValues>
        <NumericValue value={current} unit="A" precision={1} />
        <NumericValue value={power} unit="W" />
      </MetricValues>
    </HeaderView>
  )
}

class SolarWithData extends Component {
  render() {
    const { portalId, metricsRef } = this.props
    return (
      portalId && (
        <MqttSubscriptions topics={getTopics(portalId)}>
          {(topics) => {
            if (topics.current || topics.power || topics.power === 0) {
              return (
                <HidingContainer metricsRef={metricsRef}>
                  <Solar {...topics} />
                </HidingContainer>
              )
            } else return null
          }}
        </MqttSubscriptions>
      )
    )
  }
}

export default SolarWithData
