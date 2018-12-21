import React, { Component } from "react"

import HeaderView from "./HeaderView/HeaderView"
import HidingContainer from "./HidingContainer"
import MetricValues from "./MetricValues/MetricValues"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"
import NumericValue from "./NumericValue"

import { phaseSum } from "../utils/util"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    current: [
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L1/I`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L2/I`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L3/I`
    ],
    voltage: [
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L1/V`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L2/V`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L3/V`
    ],
    power: [
      `N/${portalId}/system/0/Ac/ConsumptionOnOutput/L1/Power`,
      `N/${portalId}/system/0/Ac/ConsumptionOnOutput/L2/Power`,
      `N/${portalId}/system/0/Ac/ConsumptionOnOutput/L3/Power`
    ]
  }
}

const AcLoads = props => {
  const [voltagePhase1] = props.voltage
  return (
    <HeaderView icon={require("../../images/icons/ac.svg")} title="AC Loads">
      <MetricValues>
        <NumericValue value={voltagePhase1 ? voltagePhase1.value : null} unit="V" />
        <NumericValue value={phaseSum(props.current)} unit="A" precision={1} />
        <NumericValue value={phaseSum(props.power)} unit={"W"} />
      </MetricValues>
    </HeaderView>
  )
}

const AcLoadsLoading = () => {
  return (
    <HeaderView icon={require("../../images/icons/ac.svg")} title="AC Loads">
      <MetricValues>
        <NumericValue value={null} />
        <NumericValue value={null} />
        <NumericValue value={null} />
      </MetricValues>
    </HeaderView>
  )
}

class AcLoadsWithData extends Component {
  render() {
    const { portalId, vebusInstanceId } = this.props
    return (
      <HidingContainer>
        {!vebusInstanceId ? (
          <AcLoadsLoading />
        ) : (
          <MqttSubscriptions topics={getTopics(portalId, vebusInstanceId)}>
            {topics => {
              const { current, voltage, power } = topics
              return <AcLoads current={current} voltage={voltage} power={power} />
            }}
          </MqttSubscriptions>
        )}
      </HidingContainer>
    )
  }
}

export default AcLoadsWithData
