import React, { Component } from "react"

import ActiveInValues from "./ActiveInValues"
import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import { ListView } from "../ListView/ListView"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MetricValues from "../MetricValues"
import ShoreInputLimit from "../ShoreInputLimit"

import { AC_SOURCE_TYPE, ACTIVE_INPUT } from "../../utils/constants"

import "./ActiveSource.scss"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    activeInput: `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/ActiveInput`,
    phases: `N/${portalId}/vebus/${vebusInstanceId}/Ac/NumberOfPhases`,
    settings: [
      `N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`,
      `N/${portalId}/settings/0/Settings/SystemSetup/AcInput2`
    ]
  }
}

const getActiveSource = ({ activeInput, settings: [input0, input1] }) => {
  switch (activeInput) {
    case ACTIVE_INPUT.INPUT_0:
      return input0
    case ACTIVE_INPUT.INPUT_1:
      return input1
    case ACTIVE_INPUT.NONE:
      return null
    default:
      return undefined
  }
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
  const { portalId, vebusInstanceId, onChangeShoreInputLimitClicked, phases, icon, title, hasValues } = props
  return (
    <div className="metric metric__active-source">
      {phases > 1 ? (
        <ListView icon={icon} title={title} subTitle={`${phases} phases`} child>
          <ActiveInValues portalId={portalId} vebusInstanceId={vebusInstanceId} threePhase={true} />
        </ListView>
      ) : (
        <HeaderView icon={icon} title={title} child>
          {hasValues && (
            <MetricValues>
              <ActiveInValues portalId={portalId} vebusInstanceId={vebusInstanceId} />
            </MetricValues>
          )}
        </HeaderView>
      )}
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
    const { portalId, vebusInstanceId, onChangeShoreInputLimitClicked, phases } = this.props

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
          phases={phases}
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
                  {...topics}
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
