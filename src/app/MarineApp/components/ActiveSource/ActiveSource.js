import React, { Component } from "react"

import ActiveInValues from "./ActiveInValues"
import HeaderView from "../HeaderView/HeaderView"
import ColumnContainer from "../ColumnContainer"
import { ListView } from "../ListView"
import MqttSubscriptions from "../../../mqtt/MqttSubscriptions"
import MetricValues from "../MetricValues"

import { AC_SOURCE_TYPE } from "../../../utils/constants"

import "./ActiveSource.scss"

import ShorePowerIcon from "../../images/icons/shore-power.svg"
import GeneratorIcon from "../../images/icons/generator.svg"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    activeInput: `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/ActiveInput`,
    phases: `N/${portalId}/vebus/${vebusInstanceId}/Ac/NumberOfPhases`,
    settings: [
      `N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`,
      `N/${portalId}/settings/0/Settings/SystemSetup/AcInput2`,
    ],
  }
}

const activeSourceTitle = {
  [AC_SOURCE_TYPE.SHORE]: "Shore Power",
  [AC_SOURCE_TYPE.GRID]: "Grid Input",
  [AC_SOURCE_TYPE.GENERATOR]: "Generator Input",
  [AC_SOURCE_TYPE.NOT_IN_USE]: "Invalid Configuration" // You cannot have a source that isn't configured as active!
}

const activeSourceIcon = {
  [AC_SOURCE_TYPE.SHORE]: ShorePowerIcon,
  [AC_SOURCE_TYPE.GRID]: ShorePowerIcon,
  [AC_SOURCE_TYPE.GENERATOR]: GeneratorIcon,
  [AC_SOURCE_TYPE.NOT_IN_USE]: ShorePowerIcon,
}

const getSourceSubtitle = (active, phases) => {
  if (active) {
    return phases > 1 ? `${phases} phases` : null
  } else {
    return "Unplugged"
  }
}

const ActiveSource = ({ portalId, inverterChargerDeviceId, source, active, phases }) => {
  const icon = activeSourceIcon[source]
  const title = activeSourceTitle[source] || "Unknown"
  const subTitle = getSourceSubtitle(active, phases)
  return (
    <div className="metric metric__active-source">
      {phases > 1 ? (
        <ListView icon={icon} title={title} subTitle={subTitle} child>
          {active && (
            <ActiveInValues portalId={portalId} inverterChargerDeviceId={inverterChargerDeviceId} phases={phases} />
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
    const { portalId, inverterChargerDeviceId } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId, inverterChargerDeviceId)}>
        {(topics) => {
          return topics.settings?.map(
            (source, i) =>
              [AC_SOURCE_TYPE.GRID, AC_SOURCE_TYPE.SHORE].includes(source) && (
                <ColumnContainer key={i}>
                  <ActiveSource
                    source={source}
                    phases={topics.phases}
                    active={topics.activeInput === i}
                    portalId={portalId}
                    inverterChargerDeviceId={inverterChargerDeviceId}
                  />
                </ColumnContainer>
              )
          )
        }}
      </MqttSubscriptions>
    )
  }
}

export default ActiveSourceWithData
