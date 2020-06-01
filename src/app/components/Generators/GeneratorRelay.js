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
    polarity: `N/${portalId}/settings/0/Settings/Relay/Polarity`
  }
}

const GeneratorRelay = ({ polarity, onModeSelected }) => {
  const icon = require("../../../images/icons/generator.svg")
  const title = "Generator Relay"
  const subTitle = null

  return (
    <div className="metric generator">
      <HeaderView icon={icon} title={title} subTitle={subTitle} child />
      <div className="generator__mode-selector">
        <SelectorButton active={!!polarity} onClick={() => onModeSelected(GENERATOR_START_STOP.START)}>
          On
        </SelectorButton>
        <SelectorButton active={!polarity} onClick={() => onModeSelected(GENERATOR_START_STOP.STOP)}>
          Off
        </SelectorButton>
      </div>
    </div>
  )
}

class GeneratorRelayWithData extends Component {
  render() {
    const { portalId, startStopTopic, metricsRef } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics => (
          <MqttWriteValue topic={startStopTopic}>
            {(_, updateMode) => {
              return (
                <HidingContainer metricsRef={metricsRef} key="generator-relay">
                  <GeneratorRelay portalId={portalId} {...topics} onModeSelected={updateMode} />
                </HidingContainer>
              )
            }}
          </MqttWriteValue>
        )}
      </MqttSubscriptions>
    )
  }
}

export default GeneratorRelayWithData
