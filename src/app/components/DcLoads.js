import React, { Component } from "react"
import NumericValue from "./NumericValue"
import MqttListOfTopics from "../mqtt/MqttListOfTopics"

const DcLoads = props => {
  return (
    <div className="metric metric--small">
      <img src={require("../../images/icons/dc.svg")} className="metric__icon" />
      <div className="metric__value-container">
        <p className="text text--medium">DC Loads</p>
        <div className="metric__values">
          <NumericValue
            value={props.batteryVoltage ? props.power / props.batteryVoltage : null}
            unit="A"
            precision={1}
          />
          <NumericValue value={props.power} unit="W" />
        </div>
      </div>
    </div>
  )
}

class DcLoadsWithData extends Component {
  render() {
    const { portalId } = this.props
    if (!portalId) {
      return <DcLoads loading />
    }
    return (
      <MqttListOfTopics
        topicList={[`N/${portalId}/system/0/Dc/Battery/Voltage`, `N/${portalId}/system/0/Dc/System/Power`]}
      >
        {topics => {
          return (
            <DcLoads
              batteryVoltage={topics[`N/${portalId}/system/0/Dc/Battery/Voltage`].value}
              power={topics[`N/${portalId}/system/0/Dc/System/Power`].value}
            />
          )
        }}
      </MqttListOfTopics>
    )
  }
}

export default DcLoadsWithData
