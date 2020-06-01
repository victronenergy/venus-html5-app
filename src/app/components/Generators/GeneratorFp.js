import React, { Component } from "react"

import GensetValues from "./GensetValues"
import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import { ListView } from "../ListView"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../mqtt/MqttWriteValue"
import MetricValues from "../MetricValues"
import SelectorButton from "../SelectorButton"

import { FISCHER_PANDA_GENSET_PRODUCT_ID, FISCHER_PANDA_GENSET_AUTOSTART } from "../../utils/constants"

import "./Generator.scss"

const getTopics = portalId => {
  return {
    statusCode: `N/${portalId}/genset/0/StatusCode`,
    productId: `N/${portalId}/genset/0/ProductId`,
    productName: `N/${portalId}/genset/0/ProductName`,
    phases: `N/${portalId}/genset/0/NrOfPhases`,
    autoStart: `N/${portalId}/genset/0/AutoStart`,
    coolantTemp: `N/${portalId}/genset/0/Engine/CoolantTemperature`,
    windingTemp: `N/${portalId}/genset/0/Engine/WindingTemperature`,
    exhaustTemp: `N/${portalId}/genset/0/Engine/ExaustTemperature`
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

const GeneratorFp = ({ portalId, productId, productName, phases, statusCode, autoStart, onModeSelected }) => {
  const icon = getIcon(productId)
  const title = productName || "Genset"
  const subTitle = getGensetState(statusCode)
  const isAutoStartDisabled = autoStart === FISCHER_PANDA_GENSET_AUTOSTART.DISABLED

  return (
    <div className="metric generator">
      {phases > 1 ? (
        <ListView icon={icon} title={title} subTitle={subTitle} child>
          <GensetValues portalId={portalId} threePhase={true} />
        </ListView>
      ) : (
        <HeaderView icon={icon} title={title} subTitle={subTitle} child>
          <MetricValues>
            <GensetValues portalId={portalId} />
          </MetricValues>
        </HeaderView>
      )}
      <div className="generator__mode-selector">
        <SelectorButton
          disabled={isAutoStartDisabled}
          active={statusCode === 8}
          onClick={() => onModeSelected(GENERATOR_START_STOP.START)}
        >
          On
        </SelectorButton>
        <SelectorButton active={statusCode < 8} onClick={() => onModeSelected(GENERATOR_START_STOP.STOP)}>
          Off
        </SelectorButton>
      </div>
      {isAutoStartDisabled && (
        <div className="generator__autostart-msg text--smaller text--opaque">
          AutoStart functionality is currently disabled, enable it on the genset panel in order to control the genset
          from this panel.
        </div>
      )}
    </div>
  )
}

class GeneratorFpWithData extends Component {
  render() {
    const { portalId, startStopTopic, metricsRef } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics => (
          <MqttWriteValue topic={startStopTopic}>
            {(_, updateMode) => {
              return (
                <HidingContainer metricsRef={metricsRef} key={topics.productId}>
                  <GeneratorFp portalId={portalId} {...topics} onModeSelected={updateMode} />
                </HidingContainer>
              )
            }}
          </MqttWriteValue>
        )}
      </MqttSubscriptions>
    )
  }
}

export default GeneratorFpWithData
