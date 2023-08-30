import React from "react"

import { useCharger, ChargerInstanceId } from "@victronenergy/mfd-modules"

import CurrentLimitIncrementor from "./CurrentLimitIncrementor"
import HeaderView from "../HeaderView"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import NumericValue from "../../../components/NumericValue/NumericValue"
import SelectorButton from "../SelectorButton/SelectorButton"

import { systemStateFormatter } from "../../../utils/util"
import { CHARGER_MODE } from "../../../utils/constants"

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

const ChargerSubtitle = (current: [number?, number?, number?], state: number, nrOfOutputs: number) => (
  <MetricValues inflate>
    <div className="metrics__left">
      {current.slice(0, nrOfOutputs).map((_, i) => (
        <NumericValue key={i} value={current[i]} unit="A" precision={1} />
      ))}
    </div>
    <div className="metrics__right">
      <span>
        <Translate value={`common.${systemStateFormatter(state)}`} />
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
            children={ChargerSubtitle(current, state, nrOfOutputs)}
            child
          />
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
