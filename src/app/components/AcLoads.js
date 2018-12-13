import React, { Component } from "react"
import NumericValue from "./NumericValue"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"
import HidingContainer from "./HidingContainer"
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

const AcLoadsContainer = props => {
  return (
    <div className="metric metric--small">
      <img src={require("../../images/icons/ac.svg")} className="metric__icon" />
      <div className="metric__value-container">
        <p className="text text--medium">AC Loads</p>
        <div className="metric__values">{props.children}</div>
      </div>
    </div>
  )
}

const AcLoads = props => {
  const [voltagePhase1] = props.voltage
  return (
    <AcLoadsContainer>
      <NumericValue value={voltagePhase1 ? voltagePhase1.value : null} unit="V" />
      <NumericValue value={phaseSum(props.current)} unit="A" precision={1} />
      <NumericValue value={phaseSum(props.power)} unit={"W"} />
    </AcLoadsContainer>
  )
}

const AcLoadsLoading = () => {
  return (
    <AcLoadsContainer>
      <NumericValue value={null} />
      <NumericValue value={null} />
      <NumericValue value={null} />
    </AcLoadsContainer>
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
