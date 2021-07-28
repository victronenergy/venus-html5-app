import React from "react"
import classnames from "classnames"
import { useShorePowerInput, useInverterCharger } from "@elninotech/mfd-modules"

import HeaderView from "../HeaderView"
import InputLimit from "./InputLimit"
import SelectorButton from "../SelectorButton"
import ColumnContainer from "../ColumnContainer"

import { systemStateFormatter } from "../../../utils/util"
import { SYSTEM_MODE } from "../../../utils/constants"

import "./InverterCharger.scss"

import MultiplusIcon from "../../images/icons/multiplus.svg"
import { translate } from "react-i18nify"
import { observer } from "mobx-react"

type InverterChargerProps = {
  onChangeInputLimitClicked: Function
  connected: boolean
}

const InverterCharger = observer(({ connected, onChangeInputLimitClicked }: InverterChargerProps) => {
  const { inputId } = useShorePowerInput()

  const { state, mode, customName, productName, modeIsAdjustable, updateMode } = useInverterCharger()
  const adjustable = connected && modeIsAdjustable === 1

  const productNameShort = productName && productName.split(" ")[0]

  function getModeTitle(modeNum: number) {
    if (modeNum === 3) return translate("common.on")
    else if (modeNum === 4) return translate("common.off")
    else if (modeNum === 1) return translate("common.chargerOnly")
    else return ""
  }

  const currentMode = parseInt(mode)

  return (
    <>
      {inputId && (
        <ColumnContainer>
          <div className="metric charger inverter-charger">
            <div className={classnames("inverter-charger__header", { "inverter-charger__header--column": !inputId })}>
              <HeaderView
                icon={MultiplusIcon}
                title={customName || `Inverter / Charger: ${productNameShort}`}
                subTitle={
                  (!adjustable ? getModeTitle(currentMode) + " - " : "") +
                  translate("common." + systemStateFormatter(state))
                }
                child
              />
              {!!inputId && (
                <InputLimit onChangeInputLimitClicked={onChangeInputLimitClicked} shorePowerInput={inputId} />
              )}
            </div>
            {adjustable && (
              <div className="charger__mode-selector">
                <SelectorButton active={currentMode === 3} onClick={() => updateMode(SYSTEM_MODE.ON)}>
                  {getModeTitle(3)}
                </SelectorButton>
                <SelectorButton active={currentMode === 4} onClick={() => updateMode(SYSTEM_MODE.OFF)}>
                  {getModeTitle(4)}
                </SelectorButton>
                <SelectorButton active={currentMode === 1} onClick={() => updateMode(SYSTEM_MODE.CHARGER_ONLY)}>
                  {getModeTitle(1)}
                </SelectorButton>
              </div>
            )}
          </div>
        </ColumnContainer>
      )}
    </>
  )
})

export default InverterCharger
