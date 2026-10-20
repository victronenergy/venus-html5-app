import React from "react"
import "./MetricValues.scss"

// eslint-disable-next-line react/prop-types
const MetricValues = ({ children, inflate = false }) => (
  <div className={"metric__values" + (inflate && " inflate")}>{children}</div>
)

export default MetricValues
