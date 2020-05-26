import React, { Component } from "react"

import GeneratorValues from "./GeneratorValues"
import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import { ListView } from "../ListView"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../mqtt/MqttWriteValue"
import MetricValues from "../MetricValues"
import SelectorButton from "../SelectorButton"

import {
  FISCHER_PANDA_GENSET_PRODUCT_ID,
  FISCHER_PANDA_GENSET_AUTOSTART,
  GENERATOR_START_STOP,
  RELAY_FUNCTION
} from "../../utils/constants"

import "./Generator.scss"

const getTopics = portalId => {
  return {
    productId: `N/${portalId}/system/0/Ac/Genset/ProductId`,
    phases: `N/${portalId}/system/0/Ac/Genset/NumberOfPhases`,
    relayFunction: `N/${portalId}/settings/0/Settings/Relay/Function`,
    statusCode: `N/${portalId}/genset/0/StatusCode`,
    autoStart: `N/${portalId}/genset/0/AutoStart`
  }
}

const getStartStopTopic = (portalId, productId, relayFunction) => {
  switch (productId) {
    case FISCHER_PANDA_GENSET_PRODUCT_ID:
      return `W/${portalId}/genset/0/Start`
    default:
      return relayFunction === RELAY_FUNCTION.GENERATOR_START_STOP ? `W/${portalId}/generator/0/startstop0` : undefined
  }
}

const getTitle = productId => {
  switch (productId) {
    case FISCHER_PANDA_GENSET_PRODUCT_ID:
      return "Fischer Panda Generator"
    default:
      return "Generator"
  }
}

const getIcon = productId => {
  switch (productId) {
    case FISCHER_PANDA_GENSET_PRODUCT_ID:
      return require("../../../images/icons/fp_generator.svg")
    default:
      return require("../../../images/icons/generator.svg")
  }
}

const getSubtitle = (productId, phases, statusCode) => {
  switch (productId) {
    case FISCHER_PANDA_GENSET_PRODUCT_ID:
      return getGensetState(statusCode)
    default:
      return phases > 1 ? "3 phases" : null
  }
}

function getGensetState(statusCode) {
  switch (statusCode) {
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
      return "Not available"
  }
}

const Generator = ({ portalId, productId, phases, statusCode, autoStart, onModeSelected }) => {
  const icon = getIcon(productId)
  const title = getTitle(productId)
  const subTitle = getSubtitle(productId, phases, statusCode)
  const hasValues = productId === FISCHER_PANDA_GENSET_PRODUCT_ID
  const hasAutoStart = productId === FISCHER_PANDA_GENSET_PRODUCT_ID
  const isAutoStartDisabled = autoStart === FISCHER_PANDA_GENSET_AUTOSTART.DISABLED

  return (
    <div className="metric generator">
      {phases > 1 ? (
        <ListView icon={icon} title={title} subTitle={subTitle} child>
          {hasValues && <GeneratorValues portalId={portalId} threePhase={true} />}
        </ListView>
      ) : (
        <HeaderView icon={icon} title={title} subTitle={subTitle} child>
          {hasValues && (
            <MetricValues>
              <GeneratorValues portalId={portalId} />
            </MetricValues>
          )}
          )
        </HeaderView>
      )}
      <div className="generator__mode-selector">
        <SelectorButton
          disabled={hasAutoStart && isAutoStartDisabled}
          active={statusCode === 8}
          onClick={() => onModeSelected(GENERATOR_START_STOP.START)}
        >
          On
        </SelectorButton>
        <SelectorButton active={statusCode < 8} onClick={() => onModeSelected(GENERATOR_START_STOP.STOP)}>
          Off
        </SelectorButton>
      </div>
      {hasAutoStart && isAutoStartDisabled && (
        <div className="generator__autostart-msg">
          AutoStart functionality is currently disabled, enable it on the genset panel in order to control the genset
          from this panel.
        </div>
      )}
    </div>
  )
}

class GeneratorWithData extends Component {
  render() {
    const { portalId, metricsRef } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics =>
          topics.productId && (
            <MqttWriteValue topic={getStartStopTopic(portalId, topics.productId, topics.relayFunction)}>
              {(_, updateMode) => {
                return (
                  <HidingContainer metricsRef={metricsRef} key={topics.productId}>
                    <Generator portalId={portalId} {...topics} onModeSelected={updateMode} />
                  </HidingContainer>
                )
              }}
            </MqttWriteValue>
          )
        }
      </MqttSubscriptions>
    )
  }
}

export default GeneratorWithData
