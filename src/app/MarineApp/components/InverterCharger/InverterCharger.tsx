import React from "react"
import classnames from "classnames"

import HeaderView from "../HeaderView"
import InputLimit from "./InputLimit"
import SelectorButton from "../SelectorButton"

import { systemStateFormatter } from "../../../utils/util"
import { SYSTEM_MODE } from "../../../utils/constants"

import MultiplusIcon from "../../images/icons/multiplus.svg"
import { useInverterCharger } from "../../../modules/InverterCharger/InverterCharger.provider"
import { useShorePowerInput } from "../../../modules/ShorePowerInput/ShorePowerInput.provider"

type InverterChargerProps = {
  onChangeInputLimitClicked: Function
  connected: boolean
}

const InverterCharger = ({ connected, onChangeInputLimitClicked }: InverterChargerProps) => {
  const { shorePowerInput } = useShorePowerInput()

  const { state, mode, customName, productName, modeIsAdjustable, updateMode } = useInverterCharger()
  const adjustable = connected && modeIsAdjustable

  const productNameShort = productName && productName.split(" ")[0]

  function getModeTitle(modeNum: number) {
    if (modeNum === 3) return "On"
    else if (modeNum === 4) return "Off"
    else if (modeNum === 1) return "Charger only"
    else return ""
  }

  return (
    <div className="metric charger inverter-charger">
      <div className={classnames("inverter-charger__header", { "inverter-charger__header--column": !shorePowerInput })}>
        <HeaderView
          icon={MultiplusIcon}
          title={customName || `Inverter / Charger: ${productNameShort}`}
          subTitle={(!adjustable ? getModeTitle(mode) + " - " : "") + systemStateFormatter(state)}
          child
        />
        {!!shorePowerInput && (
          <InputLimit onChangeInputLimitClicked={onChangeInputLimitClicked} shorePowerInput={shorePowerInput} />
        )}
      </div>
      {adjustable && (
        <div className="charger__mode-selector">
          <SelectorButton active={mode === 3} onClick={() => updateMode(SYSTEM_MODE.ON)}>
            {getModeTitle(3)}
          </SelectorButton>
          <SelectorButton active={mode === 4} onClick={() => updateMode(SYSTEM_MODE.OFF)}>
            {getModeTitle(4)}
          </SelectorButton>
          <SelectorButton active={mode === 1} onClick={() => updateMode(SYSTEM_MODE.CHARGER_ONLY)}>
            {getModeTitle(1)}
          </SelectorButton>
        </div>
      )}
    </div>
  )
}

export default InverterCharger
