import React, { Component } from "react"
import GetShorePowerInputNumber from "../../mqtt/victron/GetShorePowerInputNumber"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import { formatNumber } from "./../NumericValue"
import "./ShoreInputLimit.scss"

const getTopics = (portalId, vebusInstanceId, shorePowerInput) => {
  return {
    currentLimit: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
    currentLimitIsAdjustable: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitIsAdjustable`
  }
}

const ReadOnlyShoreInputLimit = props => (
  <div className="metric metric--small">
    <div className="metric__shore-input-limit--not-adjustable">
      <span className="text--small">Shore input limit:&nbsp;</span>
      <span className="text--bold">{props.currentLimit}</span>
    </div>
  </div>
)

const EditableShoreInputLimit = props => (
  <div className="metric metric--small metric--shore-input-limit">
    <button className="selector-button text" onClick={props.onChangeShoreInputLimitClicked}>
      <span className="text--small">Select shore input limit:&nbsp;</span>
      <span className="text--bold">{props.currentLimit}</span>
    </button>
  </div>
)

const ShoreInputLimit = props => {
  if (props.isAdjustable) {
    return (
      <EditableShoreInputLimit
        currentLimit={props.currentLimit}
        onChangeShoreInputLimitClicked={props.onChangeShoreInputLimitClicked}
      />
    )
  }

  return <ReadOnlyShoreInputLimit currentLimit={props.currentLimit} />
}

const MetricSmallLoading = props => (
  <div className="metric metric--small">
    <div>
      <span className="text--small">{props.message || "Loading"}</span>
    </div>
  </div>
)

class ShoreInputLimitWithData extends Component {
  render() {
    const { portalId, vebusInstanceId } = this.props
    if (!portalId && !vebusInstanceId) {
      return <MetricSmallLoading />
    }
    return (
      <GetShorePowerInputNumber portalId={portalId}>
        {shorePowerInput => {
          if (shorePowerInput === undefined) {
            return <MetricSmallLoading />
          }

          if (shorePowerInput === null) {
            return (
              <MetricSmallLoading message="No shore power configured. Please check 'Remote Console > Settings > System setup > AC input'" />
            )
          }

          return (
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
