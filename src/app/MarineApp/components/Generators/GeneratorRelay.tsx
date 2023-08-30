import React from "react"

import { useGeneratorRelay } from "@victronenergy/mfd-modules"

import ActiveInValues from "../ActiveSource/ActiveInValues"
import HeaderView from "../HeaderView/HeaderView"
import { ListView } from "../ListView"
import SelectorButton from "../SelectorButton"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"

import { GENERATOR_START_STOP, AC_SOURCE_TYPE, RELAY_FUNCTION } from "../../../utils/constants"

import "./Generator.scss"

import GeneratorIcon from "../../images/icons/generator.svg"
import { Translate, translate } from "react-i18nify"
import { observer } from "mobx-react"
import { useVisibilityNotifier } from "app/MarineApp/modules"
import { WIDGET_TYPES } from "app/MarineApp/utils/constants"

function getGeneratorState(statusCode: number, active: boolean, phases: number) {
  if (active) {
    return phases > 1 ? translate("common.nrOfPhases", { phases }) : translate("common.running")
  }

  switch (statusCode) {
    case 1:
      return translate("common.running")
    case 10:
      return translate("common.error")
    default:
      return translate("common.stopped")
  }
}

type GeneratorRelayProps = {
  statusCode: number
  phases?: number
  manualStart: number
  autoStart: number
  relayFunction: number
  updateManualMode: Function
  updateAutoMode: Function
  active?: boolean
}

const GeneratorRelay = ({
  statusCode,
  active,
  phases = 1,
  manualStart,
  autoStart,
  relayFunction,
  updateManualMode,
  updateAutoMode,
}: GeneratorRelayProps) => {
  const title = translate("widgets.generator")
  const subTitle = getGeneratorState(statusCode, active ?? false, phases)

  return (
    <div className="metric generator">
      {phases > 1 ? (
        <ListView icon={GeneratorIcon} title={title} subTitle={subTitle} child={true}>
          {active && <ActiveInValues phases={phases} />}
        </ListView>
      ) : (
        <HeaderView icon={GeneratorIcon} title={title} subTitle={subTitle} child>
          {active && (
            <MetricValues>
              <ActiveInValues phases={1} />
            </MetricValues>
          )}
        </HeaderView>
      )}
      {relayFunction === RELAY_FUNCTION.GENERATOR_START_STOP && statusCode !== undefined && (
        <div className="generator__mode-selector">
          <SelectorButton
            active={manualStart === 1 && autoStart !== 1}
            onClick={() => {
              updateAutoMode(GENERATOR_START_STOP.AUTO_OFF)
              updateManualMode(GENERATOR_START_STOP.START)
            }}
          >
            <Translate value="common.on" />
          </SelectorButton>
          <SelectorButton
            active={!manualStart && !autoStart}
            onClick={() => {
              updateAutoMode(GENERATOR_START_STOP.AUTO_OFF)
              updateManualMode(GENERATOR_START_STOP.STOP)
            }}
          >
            <Translate value="common.off" />
          </SelectorButton>
          <SelectorButton active={autoStart === 1} onClick={() => updateAutoMode(GENERATOR_START_STOP.AUTO_ON)}>
            <Translate value="common.autoStartStop" />
          </SelectorButton>
        </div>
      )}
    </div>
  )
}

export const GeneratorRelays = observer(() => {
  const values = useGeneratorRelay()

  useVisibilityNotifier({
    widgetName: WIDGET_TYPES.GENERATOR_RELAY,
    visible: !!(values.settings && values.settings.length),
  })

  if (values.settings) {
    return (
      <>
        {values.settings.includes(AC_SOURCE_TYPE.GENERATOR)
          ? values.settings.map(
              (source: number, i: number) =>
                source === AC_SOURCE_TYPE.GENERATOR && (
                  <ColumnContainer key={"generator-relay-" + i}>
                    <GeneratorRelay {...values} active={values.activeInput === i} />
                  </ColumnContainer>
                )
            )
          : values.relayFunction === RELAY_FUNCTION.GENERATOR_START_STOP &&
            values.statusCode !== undefined && (
              <ColumnContainer key="generator-relay">
                <GeneratorRelay {...values} />
              </ColumnContainer>
            )}
      </>
    )
  } else {
    return null
  }
})

export default GeneratorRelays
