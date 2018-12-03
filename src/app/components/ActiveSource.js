import React, { Component } from "react"
import { AC_SOURCE_TYPE, ACTIVE_INPUT } from "../../service/topics"
import NumericValue from "./NumericValue"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"
import { phaseSum } from "../../service/util"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    activeInput: `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/ActiveInput`,
    settings: [
      `N/${portalId}/settings/0/Settings/SystemSetup/AcInput0`,
      `N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`
    ],
    current: [
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/I`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/I`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/I`
    ],
    voltage: [
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/V`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/V`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/V`
    ],
    power: [
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/P`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/P`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/P`
    ]
  }
}

const getActiveSource = ({ activeInput, settings }) => {
  let activeSource
  const [input0, input1] = settings
  switch (activeInput.value) {
    case ACTIVE_INPUT.INPUT_0:
      activeSource = input0.value
      break
    case ACTIVE_INPUT.INPUT_1:
      activeSource = input1.value
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
    const [voltagePhase1] = this.props.voltage

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
        voltage={voltagePhase1.value}
        current={phaseSum(this.props.current)}
        power={phaseSum(this.props.power)}
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
      <MqttSubscriptions topics={getTopics(portalId, vebusInstanceId)}>
        {topics => {
          return (
            <ActiveSource
              activeInput={topics.activeInput}
              settings={topics.settings}
              current={topics.current}
              voltage={topics.voltage}
              power={topics.power}
            />
          )
        }}
      </MqttSubscriptions>
    )
  }
}

export default ActiveSourceWithData
