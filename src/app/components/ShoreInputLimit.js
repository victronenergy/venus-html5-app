import React, { Component } from "react"
import { VIEWS } from "../utils/constants"
import GetShorePowerInputNumber from "../mqtt/victron/GetShorePowerInputNumber"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"
import { formatNumber } from "./NumericValue"

const getTopics = (portalId, vebusInstanceId, shorePowerInput) => {
  return {
    currentLimit: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
    currentLimitIsAdjustable: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitIsAdjustable`
  }
}

const ShoreInputLimit = props => {
  if (!props.isAdjustable) {
    return (
      <div className="metric metric--small">
        <div className="metric__shore-input-limit--not-adjustable">
          <span className="text text--small">Shore input limit:&nbsp;</span>
          <span className="text text--bold">{props.currentLimit}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="metric metric--small metric--shore-input-limit">
      <button className="selector-button text" onClick={props.onChangeShoreInputLimitClicked}>
        <span className="text--small">Select shore input limit:&nbsp;</span>
        <span className="text--bold">{props.currentLimit}</span>
      </button>
    </div>
  )
}

class ShoreInputLimitWithData extends Component {
  render() {
    const { portalId, vebusInstanceId } = this.props
    if (!portalId && !vebusInstanceId) {
      return <ShoreInputLimit loading />
    }
    return (
      <GetShorePowerInputNumber portalId={portalId}>
        {shorePowerInput => {
          if (!shorePowerInput) {
            // TODO Show - no shore power configured message
            return <ShoreInputLimit loading />
          }
          return (
            // Only available for VE.Bus versions > 415
            <MqttSubscriptions topics={getTopics(portalId, vebusInstanceId, shorePowerInput)}>
              {topics => {
                return (
                  <ShoreInputLimit
                    currentLimit={formatNumber({ value: topics.currentLimit.value, unit: "A" })}
                    isAdjustable={topics.currentLimitIsAdjustable.value && this.props.connected}
                    onChangeShoreInputLimitClicked={this.props.onChangeShoreInputLimitClicked}
                  />
                )
              }}
            </MqttSubscriptions>
          )
        }}
      </GetShorePowerInputNumber>
    )
  }
}
export default ShoreInputLimitWithData
