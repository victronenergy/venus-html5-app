import React from "react"
import { useInputLimit } from "@elninotech/mfd-modules"

import SelectorButton from "../SelectorButton"

import { formatNumber } from "../../../components/NumericValue"
import "./InputLimit.scss"

type InputLimitProps = {
  onChangeInputLimitClicked: Function
  shorePowerInput: number
}
export const InputLimit = ({ onChangeInputLimitClicked, shorePowerInput }: InputLimitProps) => {
  const { currentLimit, currentLimitIsAdjustable } = useInputLimit(shorePowerInput)

  let isAdjustable = currentLimitIsAdjustable || 0

  let formattedLimit = formatNumber({ value: Number(currentLimit), unit: "A", defaultValue: null })

  return (
    <div className="metric__current-input-limit">
      <div className="input-limit-header__wrapper">
        {formattedLimit != null && (
          <div className="text--large metric__current-input-limit__limit">{formattedLimit}</div>
        )}
        {!isAdjustable && formattedLimit != null && <div className="text--subtitle">Input Limit</div>}
      </div>

      {isAdjustable !== 0 && (
        <SelectorButton onClick={onChangeInputLimitClicked}>
          <span className="text--small">Input Limit</span>
        </SelectorButton>
      )}
    </div>
  )
}

export default InputLimit
