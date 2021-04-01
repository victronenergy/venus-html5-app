import React, { Component } from "react"

import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import MetricValues from "../MetricValues"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import NumericValue from "../NumericValue/index"

import DcIcon from "../../../images/icons/dc.svg"

const getTopics = portalId => {
  return {
    voltage: `N/${portalId}/system/0/Dc/Battery/Voltage`,
    power: `N/${portalId}/system/0/Dc/System/Power`
  }
}

export const DcLoads = ({ voltage, power }) => {
  return (
    <MetricValues>
      <NumericValue value={voltage && power ? power / voltage : undefined} unit="A" precision={1} />
      <NumericValue value={power} unit="W" />
    </MetricValues>
  )
}

class DcLoadsWithData extends Component {
  render() {
    const { portalId, metricsRef } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics => {
          if (topics && !topics.power) return null
          return (
            <HidingContainer metricsRef={metricsRef}>
              <HeaderView icon={DcIcon} title="DC Loads" showBoat>
                <DcLoads {...topics} />
              </HeaderView>
            </HidingContainer>
          )
        }}
      </MqttSubscriptions>
    )
  }
}

export default DcLoadsWithData
