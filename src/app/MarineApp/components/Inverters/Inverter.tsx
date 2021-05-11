import React from "react"

import { INVERTER_MODE } from "../../../utils/constants"

import HeaderView from "../HeaderView"
import ColumnContainer from "../../components/ColumnContainer"
import MetricValues from "../MetricValues"
import NumericValue from "../../../components/NumericValue"
import SelectorButton from "../SelectorButton"

import "./Inverter.scss"

import MultiplusIcon from "../../images/icons/multiplus.svg"
import { useInverter } from "../../../modules/Inverters/Inverter.provider"

const stateFormatter = (state: number) => {
  switch (state) {
    case 0:
      return "Off"
    case 1:
      return "Low Power"
    case 2:
      return "Fault"
    case 9:
      return "Inverting"
    default:
      return null
  }
}

const InverterSubtitle = (voltage: number, current: number, power: number, state: number) => (
  <MetricValues inflate={""}>
    <div className="metrics__left">
      <NumericValue value={voltage} unit="V" />
      <NumericValue value={current} unit="A" precision={1} />
      <NumericValue value={power || voltage * current} unit="W" />
    </div>
    <div className="metrics__right">
      <span>{stateFormatter(state)}</span>
    </div>
  </MetricValues>
)

type InverterProps = {
  isVebusInverter: boolean
}

export const Inverter = ({ isVebusInverter }: InverterProps) => {
  const source = isVebusInverter ? "vebus" : "inverter"
  const { state, mode, voltage, current, power, customName, productName, nAcInputs, updateMode } = useInverter(source)

  // if nAcInputs === 0 it means it's an inverter, if not it's an inverter/charger => skip
  const show = !isVebusInverter || nAcInputs === 0
  // Vebus inverters use mode 3 in stead of 2 for ON.
  const onMode = isVebusInverter ? INVERTER_MODE.VEBUS_ON : INVERTER_MODE.ON

  const productNameShort = productName && productName.split(" ")[0]

  return (
    <>
      {show && (
        <ColumnContainer>
          <div className="metric inverter">
            <HeaderView icon={MultiplusIcon} title={customName || `Inverter: ${productNameShort}`} child>
              {InverterSubtitle(voltage, current, power, state)}
            </HeaderView>
            <div className="inverter__mode-selector">
              <SelectorButton active={mode === onMode} onClick={() => updateMode(onMode)}>
                On
              </SelectorButton>
              <SelectorButton active={mode === INVERTER_MODE.OFF} onClick={() => updateMode(INVERTER_MODE.OFF)}>
                Off
              </SelectorButton>
              {!isVebusInverter && (
                <SelectorButton active={mode === INVERTER_MODE.ECO} onClick={() => updateMode(INVERTER_MODE.ECO)}>
                  Eco
                </SelectorButton>
              )}
            </div>
          </div>
        </ColumnContainer>
      )}
    </>
  )
}

export default Inverter
