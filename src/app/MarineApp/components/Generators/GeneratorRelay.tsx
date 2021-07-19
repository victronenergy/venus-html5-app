import React from "react"

import { useGeneratorRelay } from "@elninotech/mfd-modules"

import ActiveInValues from "../ActiveSource/ActiveInValues"
import HeaderView from "../HeaderView/HeaderView"
import { ListView } from "../ListView"
import SelectorButton from "../SelectorButton"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"

import { GENERATOR_START_STOP, AC_SOURCE_TYPE, RELAY_FUNCTION } from "../../../utils/constants"

import "./Generator.scss"

import GeneratorIcon from "../../images/icons/generator.svg"
import { observer } from "mobx-react"

function getGeneratorState(statusCode: number, active: boolean, phases: number) {
  if (active) {
    return phases > 1 ? "3 phases" : "Running"
  }

  switch (statusCode) {
    case 1:
      return "Running"
    case 10:
      return "Error"
    default:
      return "Stopped"
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
  const title = "Generator"
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
            On
          </SelectorButton>
          <SelectorButton
            active={!manualStart && !autoStart}
            onClick={() => {
              updateAutoMode(GENERATOR_START_STOP.AUTO_OFF)
              updateManualMode(GENERATOR_START_STOP.STOP)
            }}
          >
            Off
          </SelectorButton>
          <SelectorButton active={autoStart === 1} onClick={() => updateAutoMode(GENERATOR_START_STOP.AUTO_ON)}>
            Auto start/stop
          </SelectorButton>
        </div>
      )}
    </div>
  )
}

export const GeneratorRelays = observer(() => {
  const values = useGeneratorRelay()

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
    return <ColumnContainer />
  }
})

export default GeneratorRelays
