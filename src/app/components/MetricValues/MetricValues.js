import "./MetricValues.scss"
import React from "react"

const MetricValues = ({ children, inflate = "" }) => (
  <div className={"metric__values" + (inflate && " inflate")}>{children}</div>
)

export default MetricValues
