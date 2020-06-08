import React, { Component } from "react"

import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../mqtt/MqttWriteValue"
import SelectorButton from "../SelectorButton"

import { GENERATOR_START_STOP } from "../../utils/constants"

import "./Generator.scss"

const getTopics = portalId => {
  return {
    statusCode: `N/${portalId}/generator/0/Generator0/State`,
    manualStart: `N/${portalId}/generator/0/Generator0/ManualStart`,
    autoStart: `N/${portalId}/settings/0/Settings/Generator0/AutoStartEnabled`
  }
}

function getGeneratorState(statusCode) {
  switch (statusCode) {
    case 0:
      return "Stopped"
    case 1:
      return "Running"
    case 10:
      return "Error"
    default:
      return "Not available"
  }
}

const GeneratorRelay = ({ statusCode, manualStart, autoStart, onManualModeSelected, onAutoModeSelected }) => {
  const icon = require("../../../images/icons/generator.svg")
  const title = "Generator Relay"
  const subTitle = getGeneratorState(statusCode)

  return (
    <div className="metric generator">
      <HeaderView icon={icon} title={title} subTitle={subTitle} child />
      <div className="generator__mode-selector">
        <SelectorButton
          active={manualStart && !autoStart}
          onClick={() => {
            onAutoModeSelected(GENERATOR_START_STOP.AUTO_OFF)
            onManualModeSelected(GENERATOR_START_STOP.START)
          }}
        >
          On
        </SelectorButton>
        <SelectorButton
          active={!manualStart && !autoStart}
          onClick={() => {
            onAutoModeSelected(GENERATOR_START_STOP.AUTO_OFF)
            onManualModeSelected(GENERATOR_START_STOP.STOP)
          }}
        >
          Off
        </SelectorButton>
        <SelectorButton active={autoStart} onClick={() => onAutoModeSelected(GENERATOR_START_STOP.AUTO_ON)}>
          Auto start/stop
        </SelectorButton>
      </div>
    </div>
  )
}

class GeneratorRelayWithData extends Component {
  render() {
    const { portalId, manualStartStopTopic, autoStartStopTopic, metricsRef } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics => (
          <MqttWriteValue topic={autoStartStopTopic}>
            {(_, updateAutoMode) => {
              return (
                <MqttWriteValue topic={manualStartStopTopic}>
                  {(_, updateManualMode) => {
                    return (
                      <HidingContainer metricsRef={metricsRef} key="generator-relay">
                        <GeneratorRelay
                          portalId={portalId}
                          {...topics}
                          onManualModeSelected={updateManualMode}
                          onAutoModeSelected={updateAutoMode}
                        />
                      </HidingContainer>
                    )
                  }}
                </MqttWriteValue>
              )
            }}
          </MqttWriteValue>
        )}
      </MqttSubscriptions>
    )
  }
}

export default GeneratorRelayWithData
