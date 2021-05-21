import React from "react"

import { useActiveSource } from "../../../modules"

import ActiveInValues from "./ActiveInValues"
import HeaderView from "../HeaderView/HeaderView"
import ColumnContainer from "../ColumnContainer"
import { ListView } from "../ListView"
import MetricValues from "../MetricValues"

import { AC_SOURCE_TYPE } from "../../../utils/constants"

import "./ActiveSource.scss"

import ShorePowerIcon from "../../images/icons/shore-power.svg"
import GeneratorIcon from "../../images/icons/generator.svg"

const activeSourceTitle = {
  [AC_SOURCE_TYPE.SHORE]: "Shore Power",
  [AC_SOURCE_TYPE.GRID]: "Grid Input",
  [AC_SOURCE_TYPE.GENERATOR]: "Generator Input",
  [AC_SOURCE_TYPE.NOT_IN_USE]: "Invalid Configuration", // You cannot have a source that isn't configured as active!
}

const activeSourceIcon = {
  [AC_SOURCE_TYPE.SHORE]: ShorePowerIcon,
  [AC_SOURCE_TYPE.GRID]: ShorePowerIcon,
  [AC_SOURCE_TYPE.GENERATOR]: GeneratorIcon,
  [AC_SOURCE_TYPE.NOT_IN_USE]: ShorePowerIcon,
}

const getSourceSubtitle = (active: boolean, phases: number) => {
  if (active) {
    return phases > 1 ? `${phases} phases` : ""
  } else {
    return "Unplugged"
  }
}

type ActiveSourceProps = {
  phases: number
  source: number
  active: boolean
}

const ActiveSource = ({ source, active, phases }: ActiveSourceProps) => {
  const icon = activeSourceIcon[source]
  const title = activeSourceTitle[source] || "Unknown"
  const subTitle = getSourceSubtitle(active, phases)
  return (
    <div className="metric metric__active-source">
      {phases > 1 ? (
        <ListView icon={icon} title={title} subTitle={subTitle} child={true}>
          {active && <ActiveInValues phases={phases} />}
        </ListView>
      ) : (
        <>
          <HeaderView icon={icon} title={title} subTitle={subTitle} child={true}>
            {active && (
              <MetricValues>
                <ActiveInValues phases={phases} />
              </MetricValues>
            )}
          </HeaderView>
        </>
      )}
    </div>
  )
}

const ActiveSourceList = () => {
  const { activeInput, phases, settings } = useActiveSource()

  return (
    <>
      {settings?.map(
        (source, i) =>
          [AC_SOURCE_TYPE.GRID, AC_SOURCE_TYPE.SHORE].includes(source) && (
            <ColumnContainer key={i}>
              <ActiveSource source={source} phases={phases} active={activeInput === i} />
            </ColumnContainer>
          )
      )}
    </>
  )
}

export default ActiveSourceList
