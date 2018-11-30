import React, { Component } from "react"
import { AC_SOURCE_TYPE, ACTIVE_INPUT } from "../../service/topics"
import NumericValue from "./NumericValue"
import MqttTopicList from "../mqtt/MqttTopicList"

const getActiveSource = ({ activeInput, settings }) => {
  let activeSource
  switch (activeInput) {
    case ACTIVE_INPUT.INPUT_0:
      activeSource = settings.input0
      break
    case ACTIVE_INPUT.INPUT_1:
      activeSource = settings.input1
      break
    case ACTIVE_INPUT.NONE:
      activeSource = null
    default:
      break
  }
  return activeSource
}

class ActiveSource extends Component {
  activeSourceLabel = {
    [AC_SOURCE_TYPE.SHORE]: "Shore Power",
    [AC_SOURCE_TYPE.GRID]: "Grid Input",
    [AC_SOURCE_TYPE.GENERATOR]: "Generator",
    [AC_SOURCE_TYPE.NOT_IN_USE]: "Invalid Configuration" // You cannot have a source that isn't configured as active!
  }

  activeSourceIcon = {
    [AC_SOURCE_TYPE.SHORE]: require("../../images/icons/shore-power.svg"),
    [AC_SOURCE_TYPE.GRID]: require("../../images/icons/shore-power.svg"),
    [AC_SOURCE_TYPE.GENERATOR]: require("../../images/icons/generator.svg"),
    [AC_SOURCE_TYPE.NOT_IN_USE]: require("../../images/icons/shore-power.svg")
  }

  render() {
    const activeSource = getActiveSource(this.props)

    if (activeSource === undefined) {
      return <ActiveSourceMetric title={"..."} icon={require("../../images/icons/shore-power.svg")} />
    }

    if (activeSource === null) {
      return <NoActiveSource />
    }

    return (
      <ActiveSourceMetric
        title={this.activeSourceLabel[activeSource]}
        icon={this.activeSourceIcon[activeSource]}
        voltage={this.props.voltage.phase1}
        current={this.props.current.phase1 + this.props.current.phase2 + this.props.current.phase3}
        power={this.props.power.phase1 + this.props.power.phase2 + this.props.power.phase3}
      />
    )
  }
}

const NoActiveSource = () => {
  return (
    <div className="metric metric--small">
      <img src={require("../../images/icons/shore-power.svg")} className="metric__icon" />
      <div className="metric__value-container">
        <p className="text text--medium">Shore power</p>
        <div className="text text--smaller">Unplugged</div>
      </div>
    </div>
  )
}

const ActiveSourceMetric = props => {
  const hasValues = props.voltage || props.current || props.power
  return (
    <div className="metric metric--small">
      <img src={props.icon} className="metric__icon" />
      <div className={"metric__value-container" + (hasValues ? "" : " metric__value-container--centered")}>
        <p className="text text--medium">{props.title}</p>
        {hasValues && (
          <div className="metric__values">
            <NumericValue value={props.voltage} unit={"V"} />
            <NumericValue value={props.current} unit="A" precision={1} />
            <NumericValue value={props.power} unit="W" />
          </div>
        )}
      </div>
    </div>
  )
}

class ActiveSourceWithData extends Component {
  render() {
    const { portalId, vebusInstanceId } = this.props
    if (!portalId || !vebusInstanceId) {
      return <div>Loading...</div>
    }

    return (
      <MqttTopicList
        topicList={[
          `N/${portalId}/settings/0/Settings/SystemSetup/AcInput0`,
          `N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/ActiveInput`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/I`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/I`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/I`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/V`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/V`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/V`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/P`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/P`,
          `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/P`
        ]}
      >
        {topics => {
          return (
            <ActiveSource
              activeInput={topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/ActiveInput`].value}
              settings={{
                input0: topics[`N/${portalId}/settings/0/Settings/SystemSetup/AcInput0`].value,
                input1: topics[`N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`].value
              }}
              current={{
                phase1: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/I`].value,
                phase2: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/I`].value,
                phase3: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/I`].value
              }}
              voltage={{
                phase1: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/V`].value,
                phase2: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/V`].value,
                phase3: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/V`].value
              }}
              power={{
                phase1: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/P`].value,
                phase2: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/P`].value,
                phase3: topics[`N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/P`].value
              }}
            />
          )
        }}
      </MqttTopicList>
    )
  }
}

export default ActiveSourceWithData
