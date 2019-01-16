import React, { Component } from "react"
import Battery from "./Battery"
import ActiveSource from "./ActiveSource"

import InverterCharger from "./InverterCharger"
import AcLoads from "./AcLoads"
import DcLoads from "./DcLoads"
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
    const { portalId, vebusInstanceId, isConnected, onChangeShoreInputLimitClicked } = this.props
    const commonProps = { portalId, vebusInstanceId, metricsRef: this.metricsRef }
    return (
      <div id="metrics-container" ref={this.metricsRef} style={{ height: `${this.state.height}vh` }}>
        <Battery {...commonProps} />
        {vebusInstanceId && (
          <ActiveSource {...commonProps} onChangeShoreInputLimitClicked={onChangeShoreInputLimitClicked} />
        )}
        {vebusInstanceId && <InverterCharger {...commonProps} connected={isConnected} />}
        {vebusInstanceId && <AcLoads {...commonProps} />}
        <DcLoads {...commonProps} />
        <Solar {...commonProps} />
        <Chargers {...commonProps} />
      </div>
    )
  }
}
