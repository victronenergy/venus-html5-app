import React, { Component } from "react"
import NumericValue from "./../NumericValue"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"

const getTopics = portalId => {
  return {
    hasDcSystem: `N/${portalId}/settings/0/Settings/SystemSetup/HasDcSystem`,
    voltage: `N/${portalId}/system/0/Dc/Battery/Voltage`,
    power: `N/${portalId}/system/0/Dc/System/Power`
  }
}

export const DcLoads = props => {
  return (
    <div className="metric metric--small">
      <img src={require("../../../images/icons/dc.svg")} className="metric__icon" />
      <div className="metric__value-container">
        <p className="text text--medium">DC Loads</p>
        <div className="metric__values">
          {props.hasDcSystem !== 0 ? (
            <>
              <NumericValue
                value={props.voltage && props.power ? props.power / props.voltage : undefined}
                unit="A"
                precision={1}
              />
              <NumericValue value={props.power} unit="W" />
            </>
          ) : (
            <p className="text--smaller">
              Please check that "DC System" setting is enabled under "Remote Console" > "Settings" > "System setup" >
              "Has DC System".
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

class DcLoadsWithData extends Component {
  render() {
    return (
      <MqttSubscriptions topics={getTopics(this.props.portalId)}>
        {topics => {
          return (
            <DcLoads voltage={topics.voltage.value} power={topics.power.value} hasDcSystem={topics.hasDcSystem.value} />
          )
        }}
      </MqttSubscriptions>
    )
  }
}

export default DcLoadsWithData
