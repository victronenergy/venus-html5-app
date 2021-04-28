import React, { Component } from "react"

import MqttSubscriptions from "../../../mqtt/MqttSubscriptions"
import SelectorButton from "../SelectorButton"

import { formatNumber } from "../NumericValue"



const getTopics = (portalId, vebusInstanceId, shorePowerInput) => {
  return {
    currentLimit: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
    currentLimitIsAdjustable: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitIsAdjustable`
  }
}

export const InputLimit = ({ isAdjustable, currentLimit, onChangeInputLimitClicked }) => {
  return (
    <div className="metric__current-input-limit">
      <div className="input-limit-header__wrapper">
        {currentLimit !== "--" && <div className="text--large metric__current-input-limit__limit">{currentLimit}</div>}
        {!isAdjustable && currentLimit !== "--" && <div className="text--subtitle">Input Limit</div>}
      </div>

      {isAdjustable !== 0 && (
        <SelectorButton onClick={onChangeInputLimitClicked}>
          <span className="text--small">Input Limit</span>
        </SelectorButton>
      )}
    </div>
  )
}

class InputLimitWithData extends Component {
  render() {
    const { portalId, inverterChargerDeviceId, onChangeInputLimitClicked, shorePowerInput } = this.props
    return (
      inverterChargerDeviceId &&
      shorePowerInput && (
        <MqttSubscriptions topics={getTopics(portalId, inverterChargerDeviceId, shorePowerInput)}>
          {topics => {
            return (
              <InputLimit
                currentLimit={formatNumber({ value: topics.currentLimit, unit: "A" })}
                isAdjustable={topics.currentLimitIsAdjustable || 0}
                onChangeInputLimitClicked={onChangeInputLimitClicked}
              />
            )
          }}
        </MqttSubscriptions>
      )
    )
  }
}
export default InputLimitWithData
