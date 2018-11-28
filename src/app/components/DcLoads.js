import React, { Component } from "react"
import NumericValue from "./NumericValue"

export default props => {
  return (
    <div className="metric metric--small">
      <img src="./images/icons/dc.svg" className="metric__icon" />
      <div className="metric__value-container">
        <p className="text text--medium">DC Loads</p>
        <div className="metric__values">
          <NumericValue
            value={props.batteryVoltage ? props.power / props.batteryVoltage : null}
            unit="A"
            precision={1}
          />
          <NumericValue value={props.power} unit="W" />
        </div>
      </div>
    </div>
  )
}
