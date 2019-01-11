import React, { Component } from "react"

import HeaderView from "./HeaderView"
import HidingContainer from "./HidingContainer"
import MetricValues from "./MetricValues"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"
import MqttWriteValue from "../mqtt/MqttWriteValue"
import SelectorButton from "./SelectorButton"

import { SYSTEM_MODE } from "../utils/constants"

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

const systemStateFormatter = value => {
  if (value == 0) return "Off"
  if (value == 1) return "Low power"
  if (value == 2) return "VE.Bus Fault condition"
  if (value == 3) return "Bulk charging"
  if (value == 4) return "Absorption charging"
  if (value == 5) return "Float charging"
  if (value == 6) return "Storage mode"
  if (value == 7) return "Equalisation charging"
  if (value == 8) return "Passthru"
  if (value == 9) return "Inverting"
  if (value == 10) return "Assisting"
  if (value == 256) return "Discharging"
  if (value == 257) return "Sustain"
  return "--"
}

const InverterCharger = ({ activeMode, state, modeIsAdjustable, onModeSelected }) => {
  const systemMode = systemModeFormatter(activeMode)
  return (
    <div className="metric inverter-charger">
      <HeaderView icon={require("../../images/icons/multiplus.svg")} title="Inverter / Charger" child>
        <MetricValues>
          <p className="text text--smaller">{systemStateFormatter(state)}</p>
        </MetricValues>
      </HeaderView>
      <div className="inverter-charger__mode-selector">
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
        {/*// TODO Should we add a button for inverter only as well?*/}
      </div>
    </div>
  )
}

class InverterChargerWithData extends Component {
  render() {
    const { portalId, vebusInstanceId, connected } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId, vebusInstanceId)}>
        {topics => {
          return (
            <MqttWriteValue topic={`W/${portalId}/vebus/${vebusInstanceId}/Mode`}>
              {(_, updateMode) => {
                return (
                  <HidingContainer>
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
