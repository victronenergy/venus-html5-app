import React, { Component } from "react"

import { INVERTER_MODE } from "../../utils/constants"

import HeaderView from "../HeaderView"
import HidingContainer from "../../components/HidingContainer"
import MetricValues from "../MetricValues"
import MqttTopicWildcard from "../../mqtt/MqttTopicWildcard"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../mqtt/MqttWriteValue"
import NumericValue from "../NumericValue"
import SelectorButton from "../SelectorButton"

import "./Inverters.scss"

const getTopics = (portalId, deviceInstance) => {
  return {
    state: `N/${portalId}/inverter/${deviceInstance}/State`,
    mode: `N/${portalId}/inverter/${deviceInstance}/Mode`,
    voltage: `N/${portalId}/inverter/${deviceInstance}/Ac/Out/L1/V`,
    productName: `N/${portalId}/inverter/${deviceInstance}/ProductName`,
    customName: `N/${portalId}/inverter/${deviceInstance}/CustomName`
  }
}

const stateFormatter = state => {
  switch (state) {
    case 0:
      return "Off"
    case 1:
      return "Low Power"
    case 2:
      return "Fault"
    case 9:
      return "Inverting"
  }
}

class Inverter extends Component {
  render() {
    const { portalId, deviceInstance, metricsRef } = this.props
    return (
      <HidingContainer metricsRef={metricsRef}>
        <MqttWriteValue topic={`W/${portalId}/inverter/${deviceInstance}/Mode`}>
          {(_, updateMode) => (
            <MqttSubscriptions topics={getTopics(portalId, deviceInstance)}>
              {({ state, mode, voltage, productName, customName }) => {
                return (
                  <div className="metric inverter">
                    <HeaderView
                      icon={require("../../../images/icons/multiplus.svg")}
                      title={customName || productName || "Inverter"}
                      child
                    >
                      <MetricValues>
                        <p className="text text--smaller">{stateFormatter(state)}</p>
                        {!!voltage && <NumericValue value={voltage} unit="V" />}
                      </MetricValues>
                    </HeaderView>
                    <div className="inverter__mode-selector">
                      <SelectorButton active={mode === INVERTER_MODE.ON} onClick={() => updateMode(INVERTER_MODE.ON)}>
                        On
                      </SelectorButton>
                      <SelectorButton active={mode === INVERTER_MODE.OFF} onClick={() => updateMode(INVERTER_MODE.OFF)}>
                        Off
                      </SelectorButton>
                      <SelectorButton active={mode === INVERTER_MODE.ECO} onClick={() => updateMode(INVERTER_MODE.ECO)}>
                        Eco
                      </SelectorButton>
                    </div>
                  </div>
                )
              }}
            </MqttSubscriptions>
          )}
        </MqttWriteValue>
      </HidingContainer>
    )
  }
}

const Inverters = ({ portalId, metricsRef }) => (
  <MqttTopicWildcard wildcard={`N/${portalId}/inverter/+/DeviceInstance`}>
    {messages => {
      const ids = Object.values(messages)
      return ids.map(id => <Inverter key={id} portalId={portalId} deviceInstance={id} metricsRef={metricsRef} />)
    }}
  </MqttTopicWildcard>
)

export default Inverters
