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
          className="metric__current-input-limit__decrement"
          onClick={() => onInputLimitChanged(currentLimit > 0 && currentLimit - 1)}
          disabled={currentLimit <= 0}
        >
          -
        </SelectorButton>
        <div className="metric__current-input-limit__limit">
          <div>{formatNumber({ value: currentLimit, unit: "A" })}</div>
          <div className="text--subtitle">Input Limit</div>
        </div>
        <SelectorButton
          narrow
          className="metric__current-input-limit__increment"
          onClick={() => onInputLimitChanged(currentLimit + 1)}
        >
          +
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
