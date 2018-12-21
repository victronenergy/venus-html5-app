import React, { Component } from "react"

import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import MetricValues from "../MetricValues/MetricValues"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import NumericValue from "./../NumericValue"

const getTopics = portalId => {
  return {
    hasDcSystem: `N/${portalId}/settings/0/Settings/SystemSetup/HasDcSystem`,
    voltage: `N/${portalId}/system/0/Dc/Battery/Voltage`,
    power: `N/${portalId}/system/0/Dc/System/Power`
  }
}

export const DcLoads = props => {
  return (
    <HeaderView icon={require("../../../images/icons/dc.svg")} title="DC Loads">
      <MetricValues>
        {props.hasDcSystem !== 0 ? (
          <>
            <NumericValue
              value={props.voltage && props.power ? props.power / props.voltage : undefined}
              unit="A"
              precision={1}
            />
            <NumericValue value={props.power} unit="W" />
          </>
        ) : (
          <p className="text--smaller">
            Please check that "DC System" setting is enabled under "Remote Console" > "Settings" > "System setup" > "Has
            DC System".
          </p>
        )}
      </MetricValues>
    </HeaderView>
  )
}

class DcLoadsWithData extends Component {
  render() {
    return (
      <HidingContainer>
        <MqttSubscriptions topics={getTopics(this.props.portalId)}>
          {topics => {
            return (
              <DcLoads
                voltage={topics.voltage.value}
                power={topics.power.value}
                hasDcSystem={topics.hasDcSystem.value}
              />
            )
          }}
        </MqttSubscriptions>
      </HidingContainer>
    )
  }
}

export default DcLoadsWithData
