import React, { Component } from "react"
import { AC_SOURCE_TYPE, ACTIVE_INPUT } from "../../utils/constants"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import ActiveInValues from "./ActiveInValues"
import HeaderView, { HeaderTitle } from "../HeaderView/HeaderView"
import MetricValues from "../MetricValues/MetricValues"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    activeInput: `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/ActiveInput`,
    settings: [
      `N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`,
      `N/${portalId}/settings/0/Settings/SystemSetup/AcInput2`
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
    [AC_SOURCE_TYPE.SHORE]: require("../../../images/icons/shore-power.svg"),
    [AC_SOURCE_TYPE.GRID]: require("../../../images/icons/shore-power.svg"),
    [AC_SOURCE_TYPE.GENERATOR]: require("../../../images/icons/generator.svg"),
    [AC_SOURCE_TYPE.NOT_IN_USE]: require("../../../images/icons/shore-power.svg")
  }

  render() {
    const activeSource = getActiveSource(this.props)
    const { portalId, vebusInstanceId } = this.props

    if (activeSource === undefined) {
      return <ActiveSourceLoading />
    } else if (activeSource === null) {
      return <NoActiveSource />
    } else {
      return (
        <ActiveSourceMetric
          title={this.activeSourceLabel[activeSource]}
          icon={this.activeSourceIcon[activeSource]}
          portalId={portalId}
          vebusInstanceId={vebusInstanceId}
          hasValues={true}
        />
      )
    }
  }
}

const NoActiveSource = () => {
  return (
    <HeaderView small icon={require("../../../images/icons/shore-power.svg")}>
      <HeaderTitle>Shore power</HeaderTitle>
      <div className="text text--smaller">Unplugged</div>
    </HeaderView>
  )
}

const ActiveSourceLoading = () => {
  return (
    <HeaderView small icon={require("../../../images/icons/shore-power.svg")}>
      <HeaderTitle>Active source</HeaderTitle>
      <div className="text text--smaller">--</div>
    </HeaderView>
  )
}

const ActiveSourceMetric = props => {
  const { portalId, vebusInstanceId } = props
  return (
    <HeaderView small icon={props.icon}>
      <HeaderTitle>{props.title}</HeaderTitle>
      {props.hasValues && (
        <MetricValues>
          <ActiveInValues portalId={portalId} vebusInstanceId={vebusInstanceId} />
        </MetricValues>
      )}
    </HeaderView>
  )
}

class ActiveSourceWithData extends Component {
  render() {
    const { portalId, vebusInstanceId } = this.props
    if (!vebusInstanceId) {
      return <ActiveSourceLoading />
    } else {
      return (
        <MqttSubscriptions topics={getTopics(portalId, vebusInstanceId)}>
          {topics => {
            return (
              <ActiveSource
                activeInput={topics.activeInput}
                settings={topics.settings}
                portalId={portalId}
                vebusInstanceId={vebusInstanceId}
              />
            )
          }}
        </MqttSubscriptions>
      )
    }
  }
}

export default ActiveSourceWithData
