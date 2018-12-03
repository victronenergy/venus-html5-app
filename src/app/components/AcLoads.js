import React, { Component } from "react"
import NumericValue from "./NumericValue"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"
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
    <div className="metric metric--small">
      <img src={require("../../images/icons/ac.svg")} className="metric__icon" />
      <div className="metric__value-container">
        <p className="text text--medium">AC Loads</p>
        {props.loading ? (
          <div className="metric__values">Loading...</div>
        ) : (
          <div className="metric__values">
            <NumericValue value={voltagePhase1.value} unit="V" />
            <NumericValue value={phaseSum(props.current)} unit="A" precision={1} />
            <NumericValue value={phaseSum(props.power)} unit={"W"} />
          </div>
        )}
      </div>
    </div>
  )
}

class AcLoadsWithData extends Component {
  render() {
    const { portalId, vebusInstanceId } = this.props
    if (!portalId || !vebusInstanceId) {
      return <AcLoads loading />
    }
    return (
      <MqttSubscriptions topics={getTopics(portalId, vebusInstanceId)}>
        {topics => {
          const { current, voltage, power } = topics
          return <AcLoads current={current} voltage={voltage} power={power} />
        }}
      </MqttSubscriptions>
    )
  }
}

export default AcLoadsWithData
