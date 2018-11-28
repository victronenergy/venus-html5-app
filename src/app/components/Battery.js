import React, { Component } from "react"
import NumericValue from "./NumericValue"

export default props => {
  const showTimetoGo = props.state === "Discharging"
  return (
    <div className="metric metric__container metric__battery">
      <div className="metric__container--left">
        <img src="./images/icons/battery.svg" className="metric__icon" />
        <div className="metric__value-container">
          <p className="text text--medium">Battery</p>
          <div className="metric__values">
            <NumericValue value={props.voltage} unit="V" precision={1} />
            <NumericValue value={props.current} unit="A" precision={1} />
            <NumericValue value={props.power} unit="W" />
          </div>
        </div>
      </div>
      <div
        className={"metric__battery-level-container" + (showTimetoGo ? " metric__battery-level-container--col" : "")}
      >
        <div className="text--bottom-align">
          <span className="text text--bold text--large">{props.soc ? props.soc : ""}</span>
          <span className="text text--small metric__battery-state">
            {props.soc ? "%" : ""}
            &nbsp;
            {props.state || ""}
          </span>
        </div>
        {showTimetoGo && props.timeToGo ? <p className="text text--small">{props.timeToGo}</p> : ""}
      </div>
    </div>
  )
}
