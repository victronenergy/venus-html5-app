import React, { Component } from "react"

import HeaderView from "./HeaderView"
import HidingContainer from "./HidingContainer"
import { ListView, ListRow } from "./ListView"
import MetricValues from "./MetricValues"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"
import NumericValue from "./NumericValue/index"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    phases: `N/${portalId}/system/0/Ac/ConsumptionOnOutput/NumberOfPhases`,
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
  const { current, voltage, power, phases } = props
  const showAsList = phases.value > 1

  return showAsList ? (
    <ListView icon={require("../../images/icons/ac.svg")} title="AC Loads" subTitle={`${phases.value} phases`}>
      {voltage.map((v, i) => (
        <ListRow>
          <span className="text text--smaller">Phase {i + 1}</span>
          <NumericValue value={v.value} unit="V" />
          <NumericValue value={current[i].value} unit="A" precision={1} />
          <NumericValue value={power[i].value} unit={"W"} />
        </ListRow>
      ))}
    </ListView>
  ) : (
    <HeaderView icon={require("../../images/icons/ac.svg")} title="AC Loads">
      <MetricValues>
        <NumericValue value={voltage[0].value} unit="V" />
        <NumericValue value={current[0].value} unit="A" precision={1} />
        <NumericValue value={power[0].value} unit={"W"} />
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
              return <AcLoads {...topics} />
            }}
          </MqttSubscriptions>
        )}
      </HidingContainer>
    )
  }
}

export default AcLoadsWithData
