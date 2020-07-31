import React, { Component } from "react"

import ActiveInValues from "../ActiveSource/ActiveInValues"

import HeaderView from "../HeaderView/HeaderView"
import { ListView } from "../ListView"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../mqtt/MqttWriteValue"
import SelectorButton from "../SelectorButton"
import HidingContainer from "../HidingContainer"
import MetricValues from "../MetricValues"

import { GENERATOR_START_STOP, AC_SOURCE_TYPE, RELAY_FUNCTION } from "../../utils/constants"

import "./Generator.scss"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    relayFunction: `N/${portalId}/settings/0/Settings/Relay/Function`,
    statusCode: `N/${portalId}/generator/0/Generator0/State`,
    manualStart: `N/${portalId}/generator/0/Generator0/ManualStart`,
    autoStart: `N/${portalId}/settings/0/Settings/Generator0/AutoStartEnabled`,
    activeInput: `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/ActiveInput`,
    phases: `N/${portalId}/vebus/${vebusInstanceId}/Ac/NumberOfPhases`,
    settings: [
      `N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`,
      `N/${portalId}/settings/0/Settings/SystemSetup/AcInput2`
    ]
  }
}

function getGeneratorState(statusCode, active, phases) {
  if (active) {
    return phases > 1 ? "3 phases" : "Running"
  }

  switch (statusCode) {
    case 1:
      return "Running"
    case 10:
      return "Error"
    default:
      return "Stopped"
  }
}

const GeneratorRelay = ({
  statusCode,
  active,
  phases,
  portalId,
  inverterChargerDeviceId,
  manualStart,
  autoStart,
  relayFunction,
  onManualModeSelected,
  onAutoModeSelected
}) => {
  const icon = require("../../../images/icons/generator.svg")
  const title = "Generator"
  const subTitle = getGeneratorState(statusCode, active, phases)

  return (
    <div className="metric generator">
      {phases > 1 ? (
        <ListView icon={icon} title={title} subTitle={subTitle} child>
          {active && (
            <ActiveInValues portalId={portalId} inverterChargerDeviceId={inverterChargerDeviceId} threePhase={true} />
          )}
        </ListView>
      ) : (
        <HeaderView icon={icon} title={title} subTitle={subTitle} child>
          {active && (
            <MetricValues>
              <ActiveInValues portalId={portalId} inverterChargerDeviceId={inverterChargerDeviceId} />
            </MetricValues>
          )}
        </HeaderView>
      )}
      {
        (relayFunction = RELAY_FUNCTION.GENERATOR_START_STOP && statusCode !== undefined && (
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
        ))
      }
    </div>
  )
}

class GeneratorRelayWithData extends Component {
  render() {
    const { portalId, manualStartStopTopic, autoStartStopTopic, inverterChargerDeviceId, metricsRef } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId, inverterChargerDeviceId)}>
        {topics => (
          <MqttWriteValue topic={autoStartStopTopic}>
            {(_, updateAutoMode) => (
              <MqttWriteValue topic={manualStartStopTopic}>
                {(_, updateManualMode) =>
                  topics.settings.includes(AC_SOURCE_TYPE.GENERATOR)
                    ? topics.settings.map(
                        (source, i) =>
                          source === AC_SOURCE_TYPE.GENERATOR && (
                            <HidingContainer metricsRef={metricsRef} key={"generator-relay-" + i}>
                              <GeneratorRelay
                                portalId={portalId}
                                {...topics}
                                source={source}
                                phases={topics.phases}
                                active={topics.activeInput === i}
                                inverterChargerDeviceId={inverterChargerDeviceId}
                                onManualModeSelected={updateManualMode}
                                onAutoModeSelected={updateAutoMode}
                              />
                            </HidingContainer>
                          )
                      )
                    : topics.relayFunction === RELAY_FUNCTION.GENERATOR_START_STOP &&
                      topics.statusCode !== undefined && (
                        <HidingContainer metricsRef={metricsRef} key="generator-relay">
                          <GeneratorRelay
                            portalId={portalId}
                            {...topics}
                            inverterChargerDeviceId={inverterChargerDeviceId}
                            onManualModeSelected={updateManualMode}
                            onAutoModeSelected={updateAutoMode}
                          />
                        </HidingContainer>
                      )
                }
              </MqttWriteValue>
            )}
          </MqttWriteValue>
        )}
      </MqttSubscriptions>
    )
  }
}

export default GeneratorRelayWithData
