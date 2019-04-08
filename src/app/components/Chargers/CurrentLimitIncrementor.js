import React, { Component } from "react"
import SelectorButton from "../SelectorButton/SelectorButton"
import PropTypes from "prop-types"
import { formatNumber } from "../NumericValue"

class CurrentLimitIncrementor extends Component {
  render() {
    const { currentLimit, onInputLimitChanged } = this.props

    // show the first decimal only if it's necessary
    // since the buttons always adjust in whole integers
    const precision = currentLimit % 1 ? 1 : 0

    // Magically rounds to the nearest multiple integer of 'amount' when incremented / decremented
    // e.g. adjust(5.3, 1) -> 6.0, adjust(5.7, -1) -> 5.0
    const adjust = (value, amount) =>
      value % 1 && amount < 0 ? value - (value % amount) : value + amount - (value % amount)

    return (
      <>
        <SelectorButton
          narrow
          className="metric__current-input-limit__decrement selector-button--left"
          onClick={() => onInputLimitChanged(currentLimit > 0 && adjust(currentLimit, -1))}
          disabled={currentLimit <= 0}
        >
          {"−"}
        </SelectorButton>
        <div className="metric__current-input-limit__limit selector-button--middle">
          <span className="text--medium">{formatNumber({ value: currentLimit, unit: "A", precision: precision })}</span>
        </div>
        <SelectorButton
          narrow
          className="metric__current-input-limit__increment selector-button--right"
          onClick={() => onInputLimitChanged(adjust(currentLimit, 1))}
        >
          {"+"}
        </SelectorButton>
      </>
    )
  }
}

CurrentLimitIncrementor.propTypes = {
  onInputLimitChanged: PropTypes.func,
  currentLimit: PropTypes.number
}

export default CurrentLimitIncrementor
