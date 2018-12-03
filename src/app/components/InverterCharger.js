import React, { Component } from "react"
import { SYSTEM_MODE } from "../../service/topics"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    state: `N/${portalId}/system/0/SystemState/State`,
    mode: `N/${portalId}/vebus/${vebusInstanceId}/Mode`,
    modeIsAdjustable: `N/${portalId}/vebus/${vebusInstanceId}/ModeIsAdjustable`
  }
}

function systemModeFormatter(value) {
  if (value == 1) return "Charger only"
  if (value == 2) return "Inverter only"
  if (value == 3) return "ON"
  if (value == 4) return "OFF"
  return "--"
}

function systemStateFormatter(value) {
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

const InverterCharger = props => {
  const activeMode = systemModeFormatter(props.activeMode)
  return (
    <div className="metric metric__container inverter-charger">
      <div className="metric__container--left">
        <img src={require("../../images/icons/multiplus.svg")} className="metric__icon" />
        <div className="metric__value-container">
          <p className="text text--medium">Inverter/charger</p>
          <div className="metric__values">
            <p className="text text--smaller">{systemStateFormatter(props.state)}</p>
          </div>
        </div>
      </div>
      <div className="inverter-charger__mode-selector">
        <button
          disabled={!props.modeIsAdjustable}
          className={"selector-button text" + (activeMode == "ON" ? " selector-button--active" : "")}
          onClick={() => props.onModeSelected(SYSTEM_MODE.ON)}
        >
          <span>On</span>
        </button>
        <button
          disabled={!props.modeIsAdjustable}
          className={"selector-button text" + (activeMode == "OFF" ? " selector-button--active" : "")}
          onClick={() => props.onModeSelected(SYSTEM_MODE.OFF)}
        >
          <span>Off</span>
        </button>
        <button
          disabled={!props.modeIsAdjustable}
          className={"selector-button text" + (activeMode == "Charger only" ? " selector-button--active" : "")}
          onClick={() => props.onModeSelected(SYSTEM_MODE.CHARGER_ONLY)}
        >
          <span>Charger only</span>
        </button>
        {/*// TODO Should we add a button for inverter only as well?*/}
      </div>
    </div>
  )
}

class InverterChargerWithData extends Component {
  render() {
    const { portalId, vebusInstanceId } = this.props
    if (!portalId && !vebusInstanceId) {
      return <div>Loading..</div>
    }
    return (
      <MqttSubscriptions topics={getTopics(portalId, vebusInstanceId)}>
        {topics => {
          return (
            <InverterCharger
              state={topics.state.value}
              activeMode={topics.mode.value}
              modeIsAdjustable={topics.modeIsAdjustable && this.props.connected}
              onModeSelected={this.props.onModeSelected}
            />
          )
        }}
      </MqttSubscriptions>
    )
  }
}

export default InverterChargerWithData
