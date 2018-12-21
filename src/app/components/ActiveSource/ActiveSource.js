import React, { Component } from "react"

import ActiveInValues from "./ActiveInValues"
import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MetricValues from "../MetricValues/MetricValues"
import ShoreInputLimit from "../ShoreInputLimit"

import { AC_SOURCE_TYPE, ACTIVE_INPUT } from "../../utils/constants"

import "./ActiveSource.scss"

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

const NoActiveSource = () => {
  return (
    <HeaderView icon={require("../../../images/icons/shore-power.svg")} title="Shore power">
      <div className="text text--smaller">Unplugged</div>
    </HeaderView>
  )
}

const ActiveSourceLoading = () => {
  return (
    <HeaderView icon={require("../../../images/icons/shore-power.svg")} title="Active source">
      <div className="text text--smaller">--</div>
    </HeaderView>
  )
}

const ActiveSourceMetric = props => {
  const { portalId, vebusInstanceId, onChangeShoreInputLimitClicked } = props
  return (
    <div className="metric metric__active-source">
      <HeaderView icon={props.icon} title={props.title} child>
        {props.hasValues && (
          <MetricValues>
            <ActiveInValues portalId={portalId} vebusInstanceId={vebusInstanceId} />
          </MetricValues>
        )}
      </HeaderView>
      <ShoreInputLimit
        portalId={portalId}
        vebusInstanceId={vebusInstanceId}
        onChangeShoreInputLimitClicked={onChangeShoreInputLimitClicked}
      />
    </div>
  )
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
    const { portalId, vebusInstanceId, onChangeShoreInputLimitClicked } = this.props

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
          onChangeShoreInputLimitClicked={onChangeShoreInputLimitClicked}
        />
      )
    }
  }
}

class ActiveSourceWithData extends Component {
  render() {
    const { portalId, vebusInstanceId, onChangeShoreInputLimitClicked } = this.props
    return (
      <HidingContainer>
        {!vebusInstanceId ? (
          <ActiveSourceLoading />
        ) : (
          <MqttSubscriptions topics={getTopics(portalId, vebusInstanceId)}>
            {topics => {
              return (
                <ActiveSource
                  activeInput={topics.activeInput}
                  settings={topics.settings}
                  portalId={portalId}
                  vebusInstanceId={vebusInstanceId}
                  onChangeShoreInputLimitClicked={onChangeShoreInputLimitClicked}
                />
              )
            }}
          </MqttSubscriptions>
        )}
      </HidingContainer>
    )
  }
}

export default ActiveSourceWithData
