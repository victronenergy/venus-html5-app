import React, { Component } from "react"
import SelectorButton from "../SelectorButton/SelectorButton"
import PropTypes from "prop-types"
import { formatNumber } from "../NumericValue"

class CurrentLimitIncrementor extends Component {
  render() {
    const { currentLimit, onInputLimitChanged } = this.props
    return (
      <div>
        <SelectorButton
          narrow
          className="metric__current-input-limit__decrement"
          onClick={() => onInputLimitChanged(currentLimit - 1)}
        >
          <span className="text--small">-</span>
        </SelectorButton>
        <span className="text--bold metric__current-input-limit__limit">
          {formatNumber({ value: currentLimit, unit: "A" })}
        </span>
        <SelectorButton
          narrow
          className="metric__current-input-limit__increment"
          onClick={() => onInputLimitChanged(currentLimit + 1)}
        >
          <span className="text--small">+</span>
        </SelectorButton>
      </div>
    )
  }
}

CurrentLimitIncrementor.propTypes = {
  onInputLimitChanged: PropTypes.func,
  currentLimit: PropTypes.number
}

export default CurrentLimitIncrementor
