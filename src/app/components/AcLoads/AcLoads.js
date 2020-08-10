import React, { Component } from "react"

import HeaderView from "../HeaderView"
import ColumnContainer from "../ColumnContainer"
import { ListView, ListRow } from "../ListView"
import MetricValues from "../MetricValues"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import NumericValue from "../NumericValue/index"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    phases: `N/${portalId}/system/0/Ac/Consumption/NumberOfPhases`,
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
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L1/P`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L2/P`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L3/P`
    ]
  }
}

const AcLoads = props => {
  const { current, voltage, power, phases } = props
  const showAsList = phases > 1

  return showAsList ? (
    <ListView icon={require("../../../images/icons/ac.svg")} title="AC Loads" subTitle={`${phases} phases`}>
      {voltage.map((v, i) => (
        <ListRow key={i}>
          <span className="value value__phase">L {i + 1}</span>
          <NumericValue value={v} unit="V" />
          <NumericValue value={current[i]} unit="A" precision={1} />
          <NumericValue value={power[i]} unit={"W"} />
        </ListRow>
      ))}
    </ListView>
  ) : (
    <HeaderView icon={require("../../../images/icons/ac.svg")} title="AC Loads">
      <MetricValues>
        <NumericValue value={voltage[0]} unit="V" />
        <NumericValue value={current[0]} unit="A" precision={1} />
        <NumericValue value={power[0]} unit={"W"} />
      </MetricValues>
    </HeaderView>
  )
}

class AcLoadsWithData extends Component {
  render() {
    const { portalId, inverterChargerDeviceId } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId, inverterChargerDeviceId)}>
        {topics => {
          return (
            <ColumnContainer>
              <AcLoads {...topics} />
            </ColumnContainer>
          )
        }}
      </MqttSubscriptions>
    )
  }
}

export default AcLoadsWithData
