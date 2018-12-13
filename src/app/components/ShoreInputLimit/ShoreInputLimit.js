import React, { Component } from "react"
import GetShorePowerInputNumber from "../../mqtt/victron/GetShorePowerInputNumber"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import { formatNumber } from "./../NumericValue"
import SelectorButton from "../SelectorButton"
import HidingContainer from "../HidingContainer"
import "./ShoreInputLimit.scss"

const getTopics = (portalId, vebusInstanceId, shorePowerInput) => {
  return {
    currentLimit: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
    currentLimitIsAdjustable: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitIsAdjustable`
  }
}

const ReadOnlyShoreInputLimit = props => (
  <div className="metric metric--small metric__shore-input-limit--not-adjustable">
    <div>
      <span className="text--small">Shore input limit:&nbsp;</span>
      <span className="text--bold">{props.currentLimit}</span>
    </div>
  </div>
)

const EditableShoreInputLimit = props => (
  <div className="metric metric--small metric--shore-input-limit">
    <SelectorButton onClick={props.onChangeShoreInputLimitClicked}>
      <span className="text--small">Select shore input limit:&nbsp;</span>
      <span className="text--bold">{props.currentLimit}</span>
    </SelectorButton>
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
  } else {
    return <ReadOnlyShoreInputLimit currentLimit={props.currentLimit} />
  }
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
    return (
      <HidingContainer>
        {!vebusInstanceId ? (
          <ReadOnlyShoreInputLimit currentLimit={"--"} />
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
                          isAdjustable={topics.currentLimitIsAdjustable.value && this.props.connected}
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
