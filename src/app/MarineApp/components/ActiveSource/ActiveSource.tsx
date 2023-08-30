import React from "react"

import { useActiveSource } from "@victronenergy/mfd-modules"

import ActiveInValues from "./ActiveInValues"
import HeaderView from "../HeaderView/HeaderView"
import ColumnContainer from "../ColumnContainer"
import { ListView } from "../ListView"
import MetricValues from "../MetricValues"

import { AC_SOURCE_TYPE } from "../../../utils/constants"

import "./ActiveSource.scss"

import ShorePowerIcon from "../../images/icons/shore-power.svg"
import GeneratorIcon from "../../images/icons/generator.svg"
import { Translate, translate } from "react-i18nify"
import { observer } from "mobx-react"
import { useVisibilityNotifier } from "app/MarineApp/modules"
import { WIDGET_TYPES } from "app/MarineApp/utils/constants"

const activeSourceTitle = {
  [AC_SOURCE_TYPE.SHORE]: "shorePower",
  [AC_SOURCE_TYPE.GRID]: "gridInput",
  [AC_SOURCE_TYPE.GENERATOR]: "generatorInput",
  [AC_SOURCE_TYPE.NOT_IN_USE]: "invalidConfig", // You cannot have a source that isn't configured as active!
}

const activeSourceIcon = {
  [AC_SOURCE_TYPE.SHORE]: ShorePowerIcon,
  [AC_SOURCE_TYPE.GRID]: ShorePowerIcon,
  [AC_SOURCE_TYPE.GENERATOR]: GeneratorIcon,
  [AC_SOURCE_TYPE.NOT_IN_USE]: ShorePowerIcon,
}

const getSourceSubtitle = (active: boolean, phases: number) => {
  if (active) {
    return phases > 1 ? translate("common.nrOfPhases", { phases }) : ""
  } else {
    return translate("common.unplugged")
  }
}

type ActiveSourceProps = {
  phases: number
  source: number
  active: boolean
}

const ActiveSource = ({ source, active, phases }: ActiveSourceProps) => {
  const icon = activeSourceIcon[source]
  const title = activeSourceTitle[source] || "unknown"
  const subTitle = getSourceSubtitle(active, phases)
  return (
    <div className="metric metric__active-source">
      {phases > 1 ? (
        <ListView icon={icon} title={<Translate value={`widgets.${title}`} />} subTitle={subTitle} child={true}>
          {active && <ActiveInValues phases={phases} />}
        </ListView>
      ) : (
        <>
          <HeaderView icon={icon} title={translate(`widgets.${title}`)} subTitle={subTitle} child={true}>
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

const ActiveSourceList = observer(() => {
  const { activeInput, phases, settings } = useActiveSource()

  const visible = !!settings.some((item) => [AC_SOURCE_TYPE.GRID, AC_SOURCE_TYPE.SHORE].includes(item))

  useVisibilityNotifier({ widgetName: WIDGET_TYPES.ACTIVE_SOURCE, visible })

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
})

export default ActiveSourceList
