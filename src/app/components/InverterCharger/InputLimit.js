import React, { Component } from "react"

import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import SelectorButton from "../SelectorButton"

import { formatNumber } from "../NumericValue/index"

import "./InputLimit.scss"

const getTopics = (portalId, vebusInstanceId, shorePowerInput) => {
  return {
    currentLimit: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
    currentLimitIsAdjustable: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitIsAdjustable`
  }
}

export const InputLimit = ({ isAdjustable, currentLimit, onChangeInputLimitClicked }) => {
  return (
    <div className="metric__current-input-limit">
      <span className="text--bold metric__current-input-limit__limit">{currentLimit}</span>
      {isAdjustable !== 0 && (
        <SelectorButton onClick={onChangeInputLimitClicked}>
          <span className="text--small">Select</span>
        </SelectorButton>
      )}
    </div>
  )
}

const MetricSmallLoading = ({ message }) => <span className="text--small">{message || "Loading"}</span>

class InputLimitWithData extends Component {
  render() {
    const { portalId, inverterChargerDeviceId, onChangeInputLimitClicked, shorePowerInput } = this.props
    if (!inverterChargerDeviceId) return <InputLimit currentLimit={"--"} />
    else if (shorePowerInput === undefined) {
      return <MetricSmallLoading />
    } else if (shorePowerInput === null) {
      return (
        <MetricSmallLoading message="No shore power configured. Please check 'Remote Console > Settings > System setup > AC input'" />
      )
    } else {
      return (
        <MqttSubscriptions topics={getTopics(portalId, inverterChargerDeviceId, shorePowerInput)}>
          {topics => {
            return (
              <InputLimit
                currentLimit={formatNumber({ value: topics.currentLimit, unit: "A" })}
                isAdjustable={topics.currentLimitIsAdjustable}
                onChangeInputLimitClicked={onChangeInputLimitClicked}
              />
            )
          }}
        </MqttSubscriptions>
      )
    }
  }
}
export default InputLimitWithData
