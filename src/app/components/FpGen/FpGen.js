import React, { Component } from "react"

import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import { ListView, ListRow } from "../ListView"
import MetricValues from "../MetricValues"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../mqtt/MqttWriteValue"
import NumericValue from "../NumericValue/index"
import SelectorButton from "../SelectorButton"

const getTopics = portalId => {
  return {
    phases: `N/${portalId}/genset/0/NrOfPhases`,
    voltage: [
      `N/${portalId}/genset/0/Ac/L1/Voltage`,
      `N/${portalId}/genset/0/Ac/L2/Voltage`,
      `N/${portalId}/genset/0/Ac/L3/Voltage`
    ],
    current: [
      `N/${portalId}/genset/0/Ac/L1/Current`,
      `N/${portalId}/genset/0/Ac/L2/Current`,
      `N/${portalId}/genset/0/Ac/L3/Current`
    ],
    power: [
      `N/${portalId}/genset/0/Ac/L1/Power`,
      `N/${portalId}/genset/0/Ac/L2/Power`,
      `N/${portalId}/genset/0/Ac/L3/Power`
    ],
    frequency: [
      `N/${portalId}/genset/0/Ac/L1/Frequency`,
      `N/${portalId}/genset/0/Ac/L2/Frequency`,
      `N/${portalId}/genset/0/Ac/L3/Frequency`
    ],
    starterVoltage: `N/${portalId}/genset/0/StarterVoltage`,
    statusCode: `N/${portalId}/genset/0/StatusCode`,
    coolantTemp: `N/${portalId}/genset/0/Engine/CoolantTemperature`,
    windingTemp: `N/${portalId}/genset/0/Engine/WindingTemperature`,
    exhaustTemp: `N/${portalId}/genset/0/Engine/ExaustTemperature`
  }
}

function getState(code) {
  switch (code) {
    case 0:
      return "Standby"
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      return "Starting"
    case 8:
      return "Running"
    case 9:
      return "Stopping"
    case 10:
      return "Error"
    default:
      return "Undefined"
  }
}

const FpGen = ({
  phases,
  voltage,
  current,
  power,
  frequency,
  starterVoltage,
  statusCode,
  coolantTemp,
  windingTemp,
  exhaustTemp,
  onModeSelected
}) => {
  const showAsList = phases > 1

  return (
    <HeaderView
      icon={require("../../../images/icons/fp_generator.svg")}
      title="Generator"
      subTitle={getState(statusCode)}
    >
      {showAsList ? (
        voltage.map((v, i) => (
          <MetricValues key={i}>
            <span className="text--small">L {i + 1}</span>
            <NumericValue value={voltage[i]} unit="V" />
            <NumericValue value={current[i]} unit="A" precision={1} />
            <NumericValue value={power[i]} unit="W" />
          </MetricValues>
        ))
      ) : (
        <MetricValues>
          <span className="text--small">AC</span>
          <NumericValue value={voltage[0]} unit="V" />
          <NumericValue value={current[0]} unit="A" precision={1} />
          <NumericValue value={power[0]} unit="W" />
        </MetricValues>
      )}
      <MetricValues>
        <span className="text--small">Frequency</span>
        <NumericValue value={frequency[0]} unit="Hz" />
        <span className="text--small">Starter battery</span>
        <NumericValue value={starterVoltage} unit="V" precision={1} />
      </MetricValues>
      <MetricValues>
        <span className="text--small">Coolant</span>
        <NumericValue value={coolantTemp} unit="°C" />
        <span className="text--small">Winding</span>
        <NumericValue value={windingTemp} unit="°C" />
        <span className="text--small">Exhaust</span>
        <NumericValue value={exhaustTemp} unit="°C" />
      </MetricValues>
      <div className="charger__mode-selector">
        <SelectorButton active={statusCode > 0} onClick={() => onModeSelected(1)}>
          On
        </SelectorButton>
        <SelectorButton active={statusCode === 0} onClick={() => onModeSelected(0)}>
          Off
        </SelectorButton>
      </div>
    </HeaderView>
  )
}

class FpGenWithData extends Component {
  render() {
    const { portalId, _, metricsRef } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics => {
          return (
            <MqttWriteValue topic={`W/${portalId}/genset/0/Start`}>
              {(_, updateMode) => {
                return (
                  <HidingContainer metricsRef={metricsRef}>
                    <FpGen {...topics} onModeSelected={newMode => updateMode(newMode)} />
                  </HidingContainer>
                )
              }}
            </MqttWriteValue>
          )
        }}
      </MqttSubscriptions>
    )
  }
}

export default FpGenWithData
