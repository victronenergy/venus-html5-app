import React from "react"

import { INVERTER_MODE } from "../../utils/constants"

import HeaderView from "../HeaderView"
import HidingContainer from "../../components/HidingContainer"
import MetricValues from "../MetricValues"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../mqtt/MqttWriteValue"
import NumericValue from "../NumericValue"
import SelectorButton from "../SelectorButton"

import "./Inverter.scss"

const getTopics = (portalId, deviceInstance, isVebusInverter) => {
  const source = isVebusInverter ? "vebus" : "inverter"
  return {
    state: `N/${portalId}/${source}/${deviceInstance}/State`,
    mode: `N/${portalId}/${source}/${deviceInstance}/Mode`,
    voltage: `N/${portalId}/${source}/${deviceInstance}/Ac/Out/L1/V`,
    productName: `N/${portalId}/${source}/${deviceInstance}/ProductName`,
    customName: `N/${portalId}/${source}/${deviceInstance}/CustomName`,
    // nAcInputs is obnly available for vebus inverters, for system ones will always be undefined
    nAcInputs: `N/${portalId}/${source}/${deviceInstance}/Ac/NumberOfAcInputs`
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

export const Inverter = ({ state, mode, voltage, productName, customName, nAcInputs, isVebusInverter }) => {
  // if nAcInputs === 0 it means it's an inverter, if not it's an inverter/charger => skip
  const show = !isVebusInverter || nAcInputs === 0
  return (
    show && (
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
  )
}

const InverterWithData = ({ portalId, deviceInstance, metricsRef, isVebusInverter }) => {
  return (
    <HidingContainer metricsRef={metricsRef}>
      <MqttWriteValue topic={`W/${portalId}/inverter/${deviceInstance}/Mode`}>
        {(_, updateMode) => (
          <MqttSubscriptions topics={getTopics(portalId, deviceInstance, isVebusInverter)}>
            {topics => <Inverter {...topics} isVebusInverter={isVebusInverter} />}
          </MqttSubscriptions>
        )}
      </MqttWriteValue>
    </HidingContainer>
  )
}

export default InverterWithData
