import React from "react"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../mqtt/MqttWriteValue"
import HeaderView from "../../components/HeaderView"
import NumericValue, { formatNumber } from "../NumericValue/NumericValue"
import HidingContainer from "../../components/HidingContainer"
import MetricValues from "../MetricValues/MetricValues"
import SelectorButton from "../SelectorButton/SelectorButton"
import { CHARGER_MODE } from "../../utils/constants"
import { ShoreInputLimit } from "../ShoreInputLimit/ShoreInputLimit"
import SystemState from "../SystemState"

const getTopics = (portalId, deviceInstanceId) => {
  return {
    currentLimit: `N/${portalId}/charger/${deviceInstanceId}/Ac/In/CurrentLimit`,
    state: `N/${portalId}/charger/${deviceInstanceId}/State`,
    mode: `N/${portalId}/charger/${deviceInstanceId}/Mode`,
    nrOfOutputs: `N/${portalId}/charger/${deviceInstanceId}/NrOfOutputs`,
    current: [
      `N/${portalId}/charger/${deviceInstanceId}/Dc/0/Current`,
      `N/${portalId}/charger/${deviceInstanceId}/Dc/1/Current`,
      `N/${portalId}/charger/${deviceInstanceId}/Dc/2/Current`
    ]
  }
}

// TODO Check values for mode and state
const chargerModeFormatter = value => {
  if (value == 0) return "OFF"
  if (value == 1) return "ON"
  return "--"
}

const Charger = ({ nrOfOutputs, current, state, mode, currentLimit, onModeSelected, onChangeInputLimitClicked }) => {
  const output = (
    <div>
      <span className="text text--smaller">Output</span>
      {current.map((v, i) => (
        <NumericValue key={i} value={current[i]} unit="A" precision={1} />
      ))}
    </div>
  )
  const changeLimit = (
    <ShoreInputLimit
      currentLimit={formatNumber({ value: currentLimit, unit: "A" })}
      isAdjustable={true}
      onChangeShoreInputLimitClicked={onChangeInputLimitClicked}
    />
  )

  const systemMode = chargerModeFormatter(mode)
  const modeIsAdjustable = true // For chargers, mode is always adjustable
  return (
    <div className="metric charger">
      <div className="charger__header-wrapper">
        <HeaderView icon={require("../../../images/icons/multiplus.svg")} title="Charger" child>
          <MetricValues>
            <p className="text text--smaller text--opaque">
              <SystemState value={state} />
            </p>
          </MetricValues>
        </HeaderView>
        <div className="charger__input-limit-selector">{changeLimit}</div>
      </div>
      <div className="charger__output">{output}</div>
      <div className="charger__mode-selector">
        <SelectorButton
          disabled={!modeIsAdjustable}
          active={systemMode === "ON"}
          onClick={() => onModeSelected(CHARGER_MODE.ON)}
        >
          On
        </SelectorButton>
        <SelectorButton
          disabled={!modeIsAdjustable}
          active={systemMode === "OFF"}
          onClick={() => onModeSelected(CHARGER_MODE.OFF)}
        >
          Off
        </SelectorButton>
      </div>
    </div>
  )
}

const ChargerWithData = ({ portalId, deviceInstanceId, metricsRef }) => (
  <MqttSubscriptions topics={getTopics(portalId, deviceInstanceId)}>
    {topics => {
      return (
        <MqttWriteValue topic={`W/${portalId}/charger/${deviceInstanceId}/Mode`}>
          {(_, updateMode) => {
            return (
              <HidingContainer metricsRef={metricsRef}>
                <Charger {...topics} onModeSelected={updateMode} />
              </HidingContainer>
            )
          }}
        </MqttWriteValue>
      )
    }}
  </MqttSubscriptions>
)

export default ChargerWithData
