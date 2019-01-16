import React from "react"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../mqtt/MqttWriteValue"
import HeaderView from "../../components/HeaderView"
import NumericValue from "../NumericValue/NumericValue"
import HidingContainer from "../../components/HidingContainer"
import MetricValues from "../MetricValues/MetricValues"
import SelectorButton from "../SelectorButton/SelectorButton"
import { CHARGER_MODE } from "../../utils/constants"
import SystemState from "../SystemState"
import InputLimitSpinner from "./InputLimitSpinner"

const getTopics = (portalId, deviceInstanceId) => {
  return {
    currentLimit: `N/${portalId}/charger/${deviceInstanceId}/Ac/In/CurrentLimit`,
    state: `N/${portalId}/charger/${deviceInstanceId}/State`,
    mode: `N/${portalId}/charger/${deviceInstanceId}/Mode`,
    nrOfOutputs: `N/${portalId}/charger/${deviceInstanceId}/NrOfOutputs`,
    current: [
      `N/${portalId}/charger/${deviceInstanceId}/Dc/0/Current`,
      `N/${portalId}/charger/${deviceInstanceId}/Dc/1/Current`,
      `N/${portalId}/charger/${deviceInstanceId}/Dc/2/Current`
    ]
  }
}

const chargerModeFormatter = value => {
  switch (value) {
    case CHARGER_MODE.OFF:
      return "OFF"
    case CHARGER_MODE.ON:
      return "ON"
    default:
      return "--"
  }
}

const Charger = ({ nrOfOutputs, current, state, mode, currentLimit, onModeSelected, onChangeInputLimitClicked }) => {
  const output = (
    <div>
      <span className="text text--smaller">Output</span>
      {current.map((v, i) => (
        <NumericValue key={i} value={current[i]} unit="A" precision={1} />
      ))}
    </div>
  )
  const changeLimit = <InputLimitSpinner currentLimit={currentLimit} onInputLimitChanged={onChangeInputLimitClicked} />

  const chargerMode = chargerModeFormatter(mode)
  return (
    <div className="metric charger">
      <div className="charger__header-wrapper">
        <HeaderView icon={require("../../../images/icons/multiplus.svg")} title="Charger" child>
          <MetricValues>
            <p className="text text--smaller text--opaque">
              <SystemState value={state} />
            </p>
          </MetricValues>
        </HeaderView>
        <div className="charger__input-limit-selector">{changeLimit}</div>
      </div>
      <div className="charger__output">{output}</div>
      <div className="charger__mode-selector">
        <SelectorButton active={chargerMode === "ON"} onClick={() => onModeSelected(CHARGER_MODE.ON)}>
          On
        </SelectorButton>
        <SelectorButton active={chargerMode === "OFF"} onClick={() => onModeSelected(CHARGER_MODE.OFF)}>
          Off
        </SelectorButton>
      </div>
    </div>
  )
}

const ChargerWithData = ({ portalId, deviceInstanceId, metricsRef }) => (
  <MqttSubscriptions topics={getTopics(portalId, deviceInstanceId)}>
    {topics => {
      return (
        <MqttWriteValue topic={`W/${portalId}/charger/${deviceInstanceId}/Mode`}>
          {(_, updateMode) => {
            return (
              <MqttWriteValue topic={`W/${portalId}/charger/${deviceInstanceId}/Ac/In/CurrentLimit`}>
                {(_, updateInputLimit) => {
                  return (
                    <HidingContainer metricsRef={metricsRef}>
                      <Charger {...topics} onModeSelected={updateMode} onChangeInputLimitClicked={updateInputLimit} />
                    </HidingContainer>
                  )
                }}
              </MqttWriteValue>
            )
          }}
        </MqttWriteValue>
      )
    }}
  </MqttSubscriptions>
)

export default ChargerWithData
