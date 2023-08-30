import React from "react"
import { useInputLimit } from "@victronenergy/mfd-modules"

import SelectorButton from "../SelectorButton"

import { formatNumber } from "../../../components/NumericValue"
import "./InputLimit.scss"
import { Translate } from "react-i18nify"
import { observer } from "mobx-react"

type InputLimitProps = {
  onChangeInputLimitClicked: Function
  shorePowerInput: number
}
export const InputLimit = observer(({ onChangeInputLimitClicked, shorePowerInput }: InputLimitProps) => {
  const { currentLimit, currentLimitIsAdjustable } = useInputLimit(shorePowerInput)

  let isAdjustable = currentLimitIsAdjustable || 0

  let formattedLimit = formatNumber({ value: Number(currentLimit), unit: "A", defaultValue: null })

  return (
    <div className="metric__current-input-limit">
      <div className="input-limit-header__wrapper">
        {formattedLimit != null && (
          <div className="text--large metric__current-input-limit__limit">{formattedLimit}</div>
        )}
        {!isAdjustable && formattedLimit != null && (
          <div className="text--subtitle">
            <Translate value="common.inputLimit" />
          </div>
        )}
      </div>

      {isAdjustable !== 0 && (
        <SelectorButton onClick={onChangeInputLimitClicked}>
          <span className="text--small">
            <Translate value="common.inputLimit" />
          </span>
        </SelectorButton>
      )}
    </div>
  )
})

export default InputLimit
