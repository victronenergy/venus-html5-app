import React from "react"

import CurrentLimitIncrementor from "./CurrentLimitIncrementor"
import HeaderView from "../../components/HeaderView"
import HidingContainer from "../../components/HidingContainer"
import MetricValues from "../MetricValues"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../mqtt/MqttWriteValue"
import NumericValue from "../NumericValue/NumericValue"
import SelectorButton from "../SelectorButton/SelectorButton"

import { systemStateFormatter } from "../../utils/util"
import { CHARGER_MODE } from "../../utils/constants"

import "./Charger.scss"

const getTopics = (portalId, deviceInstanceId) => {
  return {
    customName: `N/${portalId}/charger/${deviceInstanceId}/CustomName`,
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

const ChargerSubtitle = (current, state) => (
  <MetricValues inflate>
    <div className="metrics__left">
      {current.map((_, i) => (
        <NumericValue key={i} value={current[i]} unit="A" precision={1} />
      ))}
    </div>
    <div className="metrics__right">
      <span>{systemStateFormatter(state)}</span>
    </div>
  </MetricValues>
)

const Charger = ({ customName, current, state, mode, currentLimit, onModeSelected, onChangeInputLimitClicked }) => {
  // When a topic is invalid, it returns undefined -> no value means topic is not supported
  const chargerSupportsMode = mode !== undefined
  const chargerSupportsInputLimit = currentLimit !== undefined
  const chargerMode = chargerModeFormatter(mode)

  return (
    <div className="metric charger">
      <div className="charger__header-wrapper">
        <HeaderView
          icon={require("../../../images/icons/multiplus.svg")}
          title={customName || "Charger"}
          children={ChargerSubtitle(current, state)}
          child
        />
      </div>
      {chargerSupportsMode && (
        <div className="charger__mode-selector">
          <SelectorButton active={chargerMode === "ON"} onClick={() => onModeSelected(CHARGER_MODE.ON)}>
            On
          </SelectorButton>
          <SelectorButton active={chargerMode === "OFF"} onClick={() => onModeSelected(CHARGER_MODE.OFF)}>
            Off
          </SelectorButton>
          {chargerSupportsInputLimit && (
            <div className="charger__input-limit-selector">
              {currentLimit !== null &&
                currentLimit !== undefined && (
                  <CurrentLimitIncrementor
                    currentLimit={currentLimit}
                    onInputLimitChanged={onChangeInputLimitClicked}
                  />
                )}
            </div>
          )}
        </div>
      )}
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
