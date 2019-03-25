import React, { Component } from "react"
import SelectorButton from "../SelectorButton/SelectorButton"
import PropTypes from "prop-types"
import { formatNumber } from "../NumericValue"

class CurrentLimitIncrementor extends Component {
  render() {
    const { currentLimit, onInputLimitChanged } = this.props
    return (
      <>
        <SelectorButton
          narrow
          className="metric__current-input-limit__decrement selector-button--left"
          onClick={() => onInputLimitChanged(currentLimit > 0 && currentLimit - 1)}
          disabled={currentLimit <= 0}
        >
          {"−"}
        </SelectorButton>
        <div className="metric__current-input-limit__limit selector-button--middle">
          <span className="text--medium">{formatNumber({ value: currentLimit, unit: "A" })}</span>
        </div>
        <SelectorButton
          narrow
          className="metric__current-input-limit__increment selector-button--right"
          onClick={() => onInputLimitChanged(currentLimit + 1)}
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
