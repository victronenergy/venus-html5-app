import React, { Component } from "react"

import GetShorePowerInputNumber from "../../mqtt/victron/GetShorePowerInputNumber"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import SelectorButton from "../SelectorButton"

import { formatNumber } from "../NumericValue/index"

import "./ShoreInputLimit.scss"

const getTopics = (portalId, vebusInstanceId, shorePowerInput) => {
  return {
    currentLimit: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
    currentLimitIsAdjustable: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitIsAdjustable`
  }
}

const ShoreInputLimit = ({ isAdjustable, currentLimit, onChangeShoreInputLimitClicked }) => {
  return (
    isAdjustable && (
      <div>
        <span className="text--bold metric__shore-input-limit__limit">{currentLimit}</span>
        <SelectorButton onClick={onChangeShoreInputLimitClicked}>
          <span className="text--small">Select</span>
        </SelectorButton>
      </div>
    )
  )
}

const MetricSmallLoading = ({ message }) => (
  <div className="metric">
    <div>
      <span className="text--small">{message || "Loading"}</span>
    </div>
  </div>
)

class ShoreInputLimitWithData extends Component {
  render() {
    const { portalId, vebusInstanceId, onChangeShoreInputLimitClicked } = this.props
    return !vebusInstanceId ? (
      <ShoreInputLimit currentLimit={"--"} />
    ) : (
      <GetShorePowerInputNumber portalId={portalId}>
        {shorePowerInput => {
          if (shorePowerInput === undefined) {
            return <MetricSmallLoading />
          } else if (shorePowerInput === null) {
            return (
              <MetricSmallLoading message="No shore power configured. Please check 'Remote Console > Settings > System setup > AC input'" />
            )
          } else {
            return (
              <MqttSubscriptions topics={getTopics(portalId, vebusInstanceId, shorePowerInput)}>
                {topics => {
                  return (
                    <ShoreInputLimit
                      currentLimit={formatNumber({ value: topics.currentLimit, unit: "A" })}
                      isAdjustable={topics.currentLimitIsAdjustable}
                      onChangeShoreInputLimitClicked={onChangeShoreInputLimitClicked}
                    />
                  )
                }}
              </MqttSubscriptions>
            )
          }
        }}
      </GetShorePowerInputNumber>
    )
  }
}
export default ShoreInputLimitWithData
