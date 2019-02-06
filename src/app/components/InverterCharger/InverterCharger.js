import React, { Component } from "react"

import HeaderView from "../HeaderView"
import HidingContainer from "../HidingContainer"
import MetricValues from "../MetricValues"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../mqtt/MqttWriteValue"
import SelectorButton from "../SelectorButton"

import { SYSTEM_MODE } from "../../utils/constants"
import SystemState from "../SystemState"

import "../Chargers/Charger.scss"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    state: `N/${portalId}/system/0/SystemState/State`,
    mode: `N/${portalId}/vebus/${vebusInstanceId}/Mode`,
    modeIsAdjustable: `N/${portalId}/vebus/${vebusInstanceId}/ModeIsAdjustable`
  }
}

const systemModeFormatter = value => {
  if (value == 1) return "Charger only"
  if (value == 2) return "Inverter only"
  if (value == 3) return "ON"
  if (value == 4) return "OFF"
  return "--"
}

const InverterCharger = ({ activeMode, state, modeIsAdjustable, onModeSelected }) => {
  const systemMode = systemModeFormatter(activeMode)
  return (
    <div className="metric charger inverter-charger">
      <HeaderView icon={require("../../../images/icons/multiplus.svg")} title="Inverter / Charger" child>
        <MetricValues>
          <p className="text text--smaller">
            <SystemState value={state} />
          </p>
        </MetricValues>
      </HeaderView>
      <div className="charger__mode-selector">
        <SelectorButton
          disabled={!modeIsAdjustable}
          active={systemMode === "ON"}
          onClick={() => onModeSelected(SYSTEM_MODE.ON)}
        >
          On
        </SelectorButton>
        <SelectorButton
          disabled={!modeIsAdjustable}
          active={systemMode === "OFF"}
          onClick={() => onModeSelected(SYSTEM_MODE.OFF)}
        >
          Off
        </SelectorButton>
        <SelectorButton
          disabled={!modeIsAdjustable}
          active={systemMode === "Charger only"}
          onClick={() => onModeSelected(SYSTEM_MODE.CHARGER_ONLY)}
        >
          Charger only
        </SelectorButton>
      </div>
    </div>
  )
}

class InverterChargerWithData extends Component {
  render() {
    const { portalId, inverterChargerDeviceId, connected, metricsRef } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId, inverterChargerDeviceId)}>
        {topics => {
          return (
            <MqttWriteValue topic={`W/${portalId}/vebus/${inverterChargerDeviceId}/Mode`}>
              {(_, updateMode) => {
                return (
                  <HidingContainer metricsRef={metricsRef}>
                    <InverterCharger
                      state={topics.state}
                      activeMode={topics.mode}
                      modeIsAdjustable={topics.modeIsAdjustable && connected}
                      onModeSelected={newMode => updateMode(newMode)}
                    />
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

export default InverterChargerWithData
