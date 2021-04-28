import React from "react"
import './MetricValues.scss'

const MetricValues = ({ children, inflate = "" }) => (
  <div className={"metric__values" + (inflate && " inflate")}>{children}</div>
)

export default MetricValues
