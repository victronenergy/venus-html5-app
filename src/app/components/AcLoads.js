import React, { Component } from "react"
import NumericValue from "./NumericValue"
import MqttListOfTopics from "../mqtt/MqttListOfTopics"

const AcLoads = props => {
  return (
    <div className="metric metric--small">
      <img src={require("../../images/icons/ac.svg")} className="metric__icon" />
      <div className="metric__value-container">
        <p className="text text--medium">AC Loads</p>
        {props.loading ? (
          <div className="metric__values">Loading...</div>
        ) : (
          <div className="metric__values">
            <NumericValue value={props.voltage.phase1} unit="V" />
            <NumericValue
              value={props.current.phase1 ? props.current.phase1 + props.current.phase2 + props.current.phase3 : null}
              unit="A"
              precision={1}
            />
            <NumericValue
              value={props.power.phase1 ? props.power.phase1 + props.power.phase2 + props.power.phase3 : null}
              unit={"W"}
            />
          </div>
        )}
      </div>
    </div>
  )
}

class AcLoadsWithData extends Component {
  render() {
    const { portalId, vebusInstanceId } = this.props
    if (!portalId || !vebusInstanceId) {
      return <AcLoads loading />
    }
    return (
      <MqttListOfTopics
        topicList={[
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L1/I`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L2/I`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L3/I`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L1/V`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L2/V`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L3/V`,
          `N/${portalId}/system/0/Ac/ConsumptionOnOutput/L1/Power`,
          `N/${portalId}/system/0/Ac/ConsumptionOnOutput/L2/Power`,
          `N/${portalId}/system/0/Ac/ConsumptionOnOutput/L3/Power`
        ]}
      >
        {topics => {
          return (
            <AcLoads
              current={{
                phase1: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L1/I`].value,
                phase2: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L2/I`].value,
                phase3: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L3/I`].value
              }}
              voltage={{
                phase1: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L1/V`].value,
                phase2: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L2/V`].value,
                phase3: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/Out/L3/V`].value
              }}
              power={{
                phase1: topics[`N/${portalId}/system/0/Ac/ConsumptionOnOutput/L1/Power`].value,
                phase2: topics[`N/${portalId}/system/0/Ac/ConsumptionOnOutput/L2/Power`].value,
                phase3: topics[`N/${portalId}/system/0/Ac/ConsumptionOnOutput/L3/Power`].value
              }}
            />
          )
        }}
      </MqttListOfTopics>
    )
  }
}

export default AcLoadsWithData
