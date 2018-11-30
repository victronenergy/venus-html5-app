import React, { Component } from "react"
import { VIEWS } from "../../config/enums"
import GetShorePowerInputNumber from "../mqtt/victron/GetShorePowerInputNumber"
import MqttTopicList from "../mqtt/MqttTopicList"
import { formatNumber } from "./NumericValue"

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
      <button className="selector-button text" onClick={() => props.setView(VIEWS.AMPERAGE_SELECTOR)}>
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
            <MqttTopicList
              topicList={[
                // Only available for VE.Bus versions > 415
                `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
                `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitIsAdjustable`
              ]}
            >
              {topics => {
                const currentLimit =
                  topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`].value
                const isAdjustable =
                  topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitIsAdjustable`]
                    .value
                return (
                  <ShoreInputLimit
                    currentLimit={formatNumber({ value: currentLimit, unit: "A" })}
                    isAdjustable={isAdjustable && this.props.connected}
                    setView={this.props.setView}
                  />
                )
              }}
            </MqttTopicList>
          )
        }}
      </GetShorePowerInputNumber>
    )
  }
}
export default ShoreInputLimitWithData
