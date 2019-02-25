import React, { Component } from "react"
import classnames from "classnames"

import GetShorePowerInputNumber from "../../mqtt/victron/GetShorePowerInputNumber"
import HeaderView from "../HeaderView"
import HidingContainer from "../HidingContainer"
import InputLimit from "./InputLimit"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../mqtt/MqttWriteValue"
import SelectorButton from "../SelectorButton"

import { systemStateFormatter } from "../../utils/util"
import { SYSTEM_MODE } from "../../utils/constants"

import "./InverterCharger.scss"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    state: `N/${portalId}/system/0/SystemState/State`,
    mode: `N/${portalId}/vebus/${vebusInstanceId}/Mode`,
    modeIsAdjustable: `N/${portalId}/vebus/${vebusInstanceId}/ModeIsAdjustable`
  }
}

const InverterCharger = ({
  mode,
  state,
  modeIsAdjustable,
  onModeSelected,
  onChangeInputLimitClicked,
  inverterChargerDeviceId,
  portalId
}) => {
  return (
    <div className="metric charger inverter-charger">
      <GetShorePowerInputNumber portalId={portalId}>
        {shoreInput => {
          return (
            <div
              className={classnames("inverter-charger__header", { "inverter-charger__header--column": !shoreInput })}
            >
              <HeaderView
                icon={require("../../../images/icons/multiplus.svg")}
                title="Inverter / Charger"
                subTitle={systemStateFormatter(state)}
                child
              />
              <InputLimit
                portalId={portalId}
                inverterChargerDeviceId={inverterChargerDeviceId}
                onChangeInputLimitClicked={onChangeInputLimitClicked}
                shorePowerInput={shoreInput}
              />
            </div>
          )
        }}
      </GetShorePowerInputNumber>
      <div className="charger__mode-selector">
        <SelectorButton disabled={!modeIsAdjustable} active={mode === 3} onClick={() => onModeSelected(SYSTEM_MODE.ON)}>
          On
        </SelectorButton>
        <SelectorButton
          disabled={!modeIsAdjustable}
          active={mode === 4}
          onClick={() => onModeSelected(SYSTEM_MODE.OFF)}
        >
          Off
        </SelectorButton>
        <SelectorButton
          disabled={!modeIsAdjustable}
          active={mode === 1}
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
    const { portalId, inverterChargerDeviceId, connected, metricsRef, onChangeInputLimitClicked } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId, inverterChargerDeviceId)}>
        {topics => {
          return (
            <MqttWriteValue topic={`W/${portalId}/vebus/${inverterChargerDeviceId}/Mode`}>
              {(_, updateMode) => {
                return (
                  <HidingContainer metricsRef={metricsRef}>
                    <InverterCharger
                      {...topics}
                      inverterChargerDeviceId={inverterChargerDeviceId}
                      portalId={portalId}
                      modeIsAdjustable={topics.modeIsAdjustable && connected}
                      onModeSelected={newMode => updateMode(newMode)}
                      onChangeInputLimitClicked={onChangeInputLimitClicked}
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
