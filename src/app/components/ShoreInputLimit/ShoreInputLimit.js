import React, { Component } from "react"

import HidingContainer from "../HidingContainer"
import GetShorePowerInputNumber from "../../mqtt/victron/GetShorePowerInputNumber"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import SelectorButton from "../SelectorButton"

import { formatNumber } from "./../NumericValue"

import "./ShoreInputLimit.scss"

const getTopics = (portalId, vebusInstanceId, shorePowerInput) => {
  return {
    currentLimit: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
    currentLimitIsAdjustable: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitIsAdjustable`
  }
}

const ShoreInputLimit = props => {
  return (
    <div>
      <span className="text--bold metric__shore-input-limit__limit">{props.currentLimit}</span>
      {props.isAdjustable && (
        <SelectorButton onClick={props.onChangeShoreInputLimitClicked}>
          <span className="text--small">Select</span>
        </SelectorButton>
      )}
    </div>
  )
}

const MetricSmallLoading = props => (
  <div className="metric">
    <div>
      <span className="text--small">{props.message || "Loading"}</span>
    </div>
  </div>
)

class ShoreInputLimitWithData extends Component {
  render() {
    const { portalId, vebusInstanceId } = this.props
    return (
      <HidingContainer>
        {!vebusInstanceId ? (
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
                          currentLimit={formatNumber({ value: topics.currentLimit.value, unit: "A" })}
                          isAdjustable={topics.currentLimitIsAdjustable.value}
                          onChangeShoreInputLimitClicked={this.props.onChangeShoreInputLimitClicked}
                        />
                      )
                    }}
                  </MqttSubscriptions>
                )
              }
            }}
          </GetShorePowerInputNumber>
        )}
      </HidingContainer>
    )
  }
}
export default ShoreInputLimitWithData
