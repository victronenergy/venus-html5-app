import React, { Component } from "react"

import ActiveSource from "./ActiveSource"
import AcLoads from "./AcLoads"
import Battery from "./Battery"
import DcLoads from "./DcLoads"
import Inverters from "./Inverters"
import InverterCharger from "./InverterCharger"
import Solar from "./Solar"
import Chargers from "./Chargers"

export default class Metrics extends Component {
  metricsRef = React.createRef()
  state = { height: 10 } // height as CSS vh-attribute

  componentDidUpdate() {
    if (
      this.state.height < 80 &&
      this.metricsRef.current &&
      this.metricsRef.current.children[this.metricsRef.current.childElementCount - 1].style.visibility === "hidden"
    ) {
      this.setState({ height: this.state.height + 5 })
    }
  }

  render() {
    const { portalId, inverterChargerDeviceId, isConnected, onChangeShoreInputLimitClicked } = this.props
    const commonProps = { portalId, inverterChargerDeviceId, metricsRef: this.metricsRef }
    return (
      <div id="metrics-container" ref={this.metricsRef} style={{ height: `${this.state.height}vh` }}>
        <Battery {...commonProps} />
        {inverterChargerDeviceId && (
          <ActiveSource {...commonProps} onChangeShoreInputLimitClicked={onChangeShoreInputLimitClicked} />
        )}
        {inverterChargerDeviceId && <InverterCharger {...commonProps} connected={isConnected} />}
        {inverterChargerDeviceId && <AcLoads {...commonProps} />}
        <DcLoads {...commonProps} />
        <Solar {...commonProps} />
        <Chargers {...commonProps} />
        <Inverters {...commonProps} />
      </div>
    )
  }
}
