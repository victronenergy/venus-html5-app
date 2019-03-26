import React, { Component } from "react"

import ActiveInValues from "./ActiveInValues"
import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import { ListView } from "../ListView"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MetricValues from "../MetricValues"

import { AC_SOURCE_TYPE } from "../../utils/constants"

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

const activeSourceLabel = {
  [AC_SOURCE_TYPE.SHORE]: "Shore Power",
  [AC_SOURCE_TYPE.GRID]: "Grid Input",
  [AC_SOURCE_TYPE.GENERATOR]: "Generator",
  [AC_SOURCE_TYPE.NOT_IN_USE]: "Invalid Configuration" // You cannot have a source that isn't configured as active!
}

const activeSourceIcon = {
  [AC_SOURCE_TYPE.SHORE]: require("../../../images/icons/shore-power.svg"),
  [AC_SOURCE_TYPE.GRID]: require("../../../images/icons/shore-power.svg"),
  [AC_SOURCE_TYPE.GENERATOR]: require("../../../images/icons/generator.svg"),
  [AC_SOURCE_TYPE.NOT_IN_USE]: require("../../../images/icons/shore-power.svg")
}

const getSourceSubtitle = (active, phases, source) => {
  if (active) {
    return phases > 1 ? "3 phases" : null
  } else {
    return source === AC_SOURCE_TYPE.GENERATOR ? "Stopped" : "Unplugged"
  }
}

const ActiveSource = ({ portalId, inverterChargerDeviceId, source, active, phases }) => {
  const icon = activeSourceIcon[source]
  const title = activeSourceLabel[source]
  const subTitle = getSourceSubtitle(active, phases, source)
  return (
    <div className="metric metric__active-source">
      {phases > 1 ? (
        <ListView icon={icon} title={title} subTitle={subTitle} child>
          {active && (
            <ActiveInValues portalId={portalId} inverterChargerDeviceId={inverterChargerDeviceId} threePhase={true} />
          )}
        </ListView>
      ) : (
        <>
          <HeaderView icon={icon} title={title} subTitle={subTitle} child>
            {active && (
              <MetricValues>
                <ActiveInValues portalId={portalId} inverterChargerDeviceId={inverterChargerDeviceId} />
              </MetricValues>
            )}
          </HeaderView>
        </>
      )}
    </div>
  )
}

class ActiveSourceWithData extends Component {
  render() {
    const { portalId, inverterChargerDeviceId, metricsRef } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId, inverterChargerDeviceId)}>
        {topics => {
          return topics.settings.map(
            (source, i) =>
              source !== AC_SOURCE_TYPE.NOT_IN_USE && ( // do not render if the source is not in use
                <HidingContainer metricsRef={metricsRef} key={i}>
                  <ActiveSource
                    source={source}
                    phases={topics.phases}
                    active={topics.activeInput === i}
                    portalId={portalId}
                    inverterChargerDeviceId={inverterChargerDeviceId}
                  />
                </HidingContainer>
              )
          )
        }}
      </MqttSubscriptions>
    )
  }
}

export default ActiveSourceWithData
