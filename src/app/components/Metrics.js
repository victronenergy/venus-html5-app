import React, { Component } from "react"

import ActiveSource from "./ActiveSource"
import AcLoads from "./AcLoads"
import Battery from "./Battery"
import DcLoads from "./DcLoads"
import Inverters from "./Inverters"
import InverterCharger from "./InverterCharger"
import Solar from "./Solar"
import Chargers from "./Chargers"

const hasTwoColumns = metricsContainer => {
  if (!metricsContainer || metricsContainer.childElementCount < 2) return false
  const [first] = metricsContainer.children
  return [...metricsContainer.children].some(c => c.offsetTop === first.offsetTop)
}

const lastMetricIsHidden = metricsContainer => {
  return metricsContainer.children[metricsContainer.childElementCount - 1].style.visibility === "hidden"
}

export default class Metrics extends Component {
  metricsRef = React.createRef()
  state = { height: 10, layoutCols: 1 } // height as CSS vh-attribute

  componentDidMount() {
    if (this.state.layoutCols === 1 && hasTwoColumns(this.metricsRef.current)) {
      this.setState({ layoutCols: 2 })
    }
  }

  componentDidUpdate() {
    if (
      this.state.layoutCols === 2 &&
      this.state.height < 80 &&
      this.metricsRef.current &&
      lastMetricIsHidden(this.metricsRef.current)
    ) {
      this.setState({ height: this.state.height + 5 })
    }
  }

  render() {
    const { portalId, inverterChargerDeviceId, isConnected, onChangeShoreInputLimitClicked } = this.props
    const commonProps = { portalId, inverterChargerDeviceId, metricsRef: this.metricsRef }
    const style = this.state.layoutCols === 2 ? { height: `${this.state.height}vh` } : {}
    return (
      <div id="metrics-container" ref={this.metricsRef} style={style}>
        <Battery {...commonProps} />
        {!!inverterChargerDeviceId && (
          <ActiveSource {...commonProps} onChangeShoreInputLimitClicked={onChangeShoreInputLimitClicked} />
        )}
        {!!inverterChargerDeviceId && <InverterCharger {...commonProps} connected={isConnected} />}
        {!!inverterChargerDeviceId && <AcLoads {...commonProps} />}
        <DcLoads {...commonProps} />
        <Solar {...commonProps} />
        <Chargers {...commonProps} />
        <Inverters {...commonProps} />
      </div>
    )
  }
}
