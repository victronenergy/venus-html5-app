import React, { Component } from "react"
import Battery from "./Battery"
import ActiveSource from "./ActiveSource"

import InverterCharger from "./InverterCharger"
import AcLoads from "./AcLoads"
import DcLoads from "./DcLoads"
import Solar from "./Solar"

const solarFeatureEnabled = false

export default class Metrics extends Component {
  ref = React.createRef()
  state = { height: 50 } // height as CSS vh-attribute

  render() {
    const { portalId, vebusInstanceId, isConnected, onChangeShoreInputLimitClicked, onModeSelected } = this.props

    if (
      this.state.height < 100 &&
      this.ref.current &&
      this.ref.current.children[this.ref.current.childElementCount - 1].style.visibility === "hidden"
    ) {
      this.setState({ height: this.state.height + 5 })
    }

    return (
      <div id="metrics-container" ref={this.ref} style={{ height: `${this.state.height}vh` }}>
        <Battery portalId={portalId} />
        <ActiveSource
          portalId={portalId}
          vebusInstanceId={vebusInstanceId}
          onChangeShoreInputLimitClicked={onChangeShoreInputLimitClicked}
        />
        <InverterCharger
          portalId={portalId}
          vebusInstanceId={vebusInstanceId}
          connected={isConnected}
          onModeSelected={onModeSelected}
        />
        <AcLoads portalId={portalId} vebusInstanceId={vebusInstanceId} />
        <DcLoads portalId={portalId} />
        {solarFeatureEnabled && <Solar portalId={portalId} />}
      </div>
    )
  }
}
