import React from "react"

import { useCharger, ChargerInstanceId } from "@victronenergy/mfd-modules"

import CurrentLimitIncrementor from "./CurrentLimitIncrementor"
import HeaderView from "../HeaderView"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import NumericValue from "../../../components/NumericValue/NumericValue"
import SelectorButton from "../SelectorButton/SelectorButton"

import { CHARGER_MODE, CHARGER_STATE } from "@victronenergy/mfd-modules"

import "./Charger.scss"

import MultiplusIcon from "../../images/icons/multiplus.svg"
import { translate, Translate } from "react-i18nify"
import { observer } from "mobx-react"

const chargerModeFormatter = (value: number) => {
  switch (value) {
    case CHARGER_MODE.OFF:
      return "off"
    case CHARGER_MODE.ON:
      return "on"
    default:
      return "emptyBar"
  }
}

const chargerStateFormatter = (value: number | string) => {
  switch (Number(value)) {
    case CHARGER_STATE.OFF:
      return "off"
    case CHARGER_STATE.FAULT_CONDITION:
      return "fault"
    case CHARGER_STATE.BULK_CHARGING:
      return "bulkCharging"
    case CHARGER_STATE.ABSORPTION_CHARGING:
      return "absorptionCharging"
    case CHARGER_STATE.FLOAT_CHARGING:
      return "floatCharging"
    case CHARGER_STATE.STORAGE_MODE:
      return "storageMode"
    case CHARGER_STATE.EQUALISATION_CHARGING:
      return "equalisationCharging"
    case CHARGER_STATE.POWER_SUPPLY_MODE:
      return "powerSupplyMode"
    case CHARGER_STATE.REPEATED_ABSORPTION:
      return "repeatedAbsorption"
    case CHARGER_STATE.AUTO_EQUALIZE:
      return "autoEqualize"
    case CHARGER_STATE.BATTERY_SAFE:
      return "batterySafe"
    default:
      return "emptyBar"
  }
}

const ChargerSubtitle = (current: [number?, number?, number?], state: number, nrOfOutputs: number) => (
  <MetricValues inflate>
    <div className="metrics__left">
      {current.slice(0, nrOfOutputs).map((_, i) => (
        <NumericValue key={i} value={current[i]} unit="A" precision={1} />
      ))}
    </div>
    <div className="metrics__right">
      <span>
        <Translate value={`common.${chargerStateFormatter(state)}`} />
      </span>
    </div>
  </MetricValues>
)

type ChargerProps = {
  chargerId: ChargerInstanceId
}

const Charger = observer(({ chargerId }: ChargerProps) => {
  let {
    customName,
    nrOfOutputs = 3,
    productName,
    current,
    state,
    mode,
    currentLimit,
    updateMode,
    updateCurrentLimit,
  } = useCharger(chargerId)
  // When a topic is invalid, it returns undefined -> no value means topic is not supported
  const chargerSupportsMode = mode !== undefined
  const chargerSupportsInputLimit = currentLimit !== undefined
  const chargerMode = chargerModeFormatter(Number(mode))

  const productNameShort = productName && productName.split(" ")[0]

  if (!current) {
    return <ColumnContainer />
  }
  return (
    <ColumnContainer>
      <div className="metric charger">
        <div className="charger__header-wrapper">
          <HeaderView
            icon={MultiplusIcon}
            title={customName || translate("widgets.chargerWithName", { productNameShort })}
            child
          >
            {ChargerSubtitle(current, state, nrOfOutputs)}
          </HeaderView>
        </div>
        {chargerSupportsMode && (
          <div className="charger__mode-selector">
            <SelectorButton active={chargerMode === "on"} onClick={() => updateMode(CHARGER_MODE.ON)}>
              <Translate value={"common.on"} />
            </SelectorButton>
            <SelectorButton active={chargerMode === "off"} onClick={() => updateMode(CHARGER_MODE.OFF)}>
              <Translate value={"common.off"} />
            </SelectorButton>
            {chargerSupportsInputLimit && (
              <>
                <div className="charger__input-limit-selector">
                  <div className="charger__input-limit-selector__label text--subtitle">{"Limit"}</div>
                  {currentLimit !== null && currentLimit !== undefined && (
                    <CurrentLimitIncrementor currentLimit={currentLimit} onInputLimitChanged={updateCurrentLimit} />
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </ColumnContainer>
  )
})

export default Charger
