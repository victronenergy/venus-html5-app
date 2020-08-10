import React, { Component } from "react"

import HeaderView from "../HeaderView/HeaderView"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import NumericValue from "../NumericValue/index"

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
    const { portalId } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics => {
          if (topics && !topics.power) return null
          return (
            <ColumnContainer>
              <HeaderView icon={require("../../../images/icons/dc.svg")} title="DC Loads" showBoat>
                <DcLoads {...topics} />
              </HeaderView>
            </ColumnContainer>
          )
        }}
      </MqttSubscriptions>
    )
  }
}

export default DcLoadsWithData
