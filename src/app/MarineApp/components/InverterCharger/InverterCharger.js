import React, { Component } from "react"
import classnames from "classnames"

import GetShorePowerInputNumber from "../../../mqtt/victron/GetShorePowerInputNumber"
import HeaderView from "../HeaderView"
import ColumnContainer from "../ColumnContainer"
import InputLimit from "./InputLimit"
import MqttSubscriptions from "../../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../../mqtt/MqttWriteValue"
import SelectorButton from "../SelectorButton"

import { systemStateFormatter } from "../../../utils/util"
import { SYSTEM_MODE } from "../../../utils/constants"

import MultiplusIcon from "../../images/icons/multiplus.svg"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    state: `N/${portalId}/system/0/SystemState/State`,
    mode: `N/${portalId}/vebus/${vebusInstanceId}/Mode`,
    customName: `N/${portalId}/vebus/${vebusInstanceId}/CustomName`,
    productName: `N/${portalId}/vebus/${vebusInstanceId}/ProductName`,
    modeIsAdjustable: `N/${portalId}/vebus/${vebusInstanceId}/ModeIsAdjustable`,
  }
}

const InverterCharger = ({
  mode,
  state,
  productName,
  customName,
  modeIsAdjustable,
  onModeSelected,
  onChangeInputLimitClicked,
  inverterChargerDeviceId,
  portalId,
}) => {
  const productNameShort = productName && productName.split(" ")[0]

  function getModeTitle(modeNum) {
    if (modeNum === 3) return "On"
    else if (modeNum === 4) return "Off"
    else if (modeNum === 1) return "Charger only"
    else return ""
  }

  return (
    <div className="metric charger inverter-charger">
      <GetShorePowerInputNumber portalId={portalId}>
        {(shoreInput) => {
          return (
            <div
              className={classnames("inverter-charger__header", { "inverter-charger__header--column": !shoreInput })}
            >
              <HeaderView
                icon={MultiplusIcon}
                title={customName || `Inverter / Charger: ${productNameShort}`}
                subTitle={(!modeIsAdjustable ? getModeTitle(mode) + " - " : "") + systemStateFormatter(state)}
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
      {!!modeIsAdjustable && (
        <div className="charger__mode-selector">
          <SelectorButton active={mode === 3} onClick={() => onModeSelected(SYSTEM_MODE.ON)}>
            {getModeTitle(3)}
          </SelectorButton>
          <SelectorButton active={mode === 4} onClick={() => onModeSelected(SYSTEM_MODE.OFF)}>
            {getModeTitle(4)}
          </SelectorButton>
          <SelectorButton active={mode === 1} onClick={() => onModeSelected(SYSTEM_MODE.CHARGER_ONLY)}>
            {getModeTitle(1)}
          </SelectorButton>
        </div>
      )}
    </div>
  )
}

class InverterChargerWithData extends Component {
  render() {
    const { portalId, inverterChargerDeviceId, connected, onChangeInputLimitClicked, screenLocked } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId, inverterChargerDeviceId)}>
        {(topics) => {
          return (
            <MqttWriteValue topic={`W/${portalId}/vebus/${inverterChargerDeviceId}/Mode`}>
              {(_, updateMode) => {
                return (
                  <ColumnContainer>
                    <InverterCharger
                      {...topics}
                      inverterChargerDeviceId={inverterChargerDeviceId}
                      portalId={portalId}
                      modeIsAdjustable={topics.modeIsAdjustable && connected}
                      screenLocked={screenLocked}
                      onModeSelected={(newMode) => updateMode(newMode)}
                      onChangeInputLimitClicked={onChangeInputLimitClicked}
                    />
                  </ColumnContainer>
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
