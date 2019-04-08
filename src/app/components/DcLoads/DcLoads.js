import React, { Component } from "react"

import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import MetricValues from "../MetricValues"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import NumericValue from "../NumericValue/index"

const getTopics = portalId => {
  return {
    hasDcSystem: `N/${portalId}/settings/0/Settings/SystemSetup/HasDcSystem`,
    voltage: `N/${portalId}/system/0/Dc/Battery/Voltage`,
    power: `N/${portalId}/system/0/Dc/System/Power`
  }
}

export const DcLoads = ({ hasDcSystem, voltage, power }) => {
  return (
    <MetricValues>
      {hasDcSystem !== 0 ? (
        <>
          <NumericValue value={voltage && power ? power / voltage : undefined} unit="A" precision={1} />
          <NumericValue value={power} unit="W" />
        </>
      ) : (
        <p className="text--smaller">
          Please check that "DC System" setting is enabled under "Remote Console" > "Settings" > "System setup" > "Has
          DC System".
        </p>
      )}
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
              <HeaderView icon={require("../../../images/icons/dc.svg")} title="DC Loads" showBoat>
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
