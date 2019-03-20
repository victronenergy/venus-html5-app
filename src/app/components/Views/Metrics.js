import React, { Component } from "react"
import classnames from "classnames"

import ActiveSource from "../ActiveSource"
import AcLoads from "../AcLoads"
import Battery from "../Battery"
import Chargers from "../Chargers"
import DcLoads from "../DcLoads"
import Inverters from "../Inverters"
import { InverterCharger } from "../InverterCharger"
import Solar from "../Solar"

const getRequiredCols = metrics => {
  if (metrics.length < 2) return 1
  else {
    const metricsTotalHeight = metrics.map(c => Math.ceil(c.clientHeight)).reduce((a, b) => a + b, 0)
    // metrics-container max-height = 80vh
    return metricsTotalHeight > Math.floor(window.innerHeight * 0.8) ? 2 : 1
  }
}

const getContainerHeight = metrics => {
  /**
   * The container must be just high enough to fit half of the total height of the metrics
   * elements. This means that either the left or the right column can be the taller one,
   * but prefer left over right for aesthetics.
   *
   * Unset height when some of the elements are hudden to center the whole content.
   */
  if (metrics.some(m => m.getBoundingClientRect().right > window.innerWidth)) return "unset"
  const metricsHeights = metrics.map(c => c.getBoundingClientRect().height)
  const reversed = [...metricsHeights].reverse()
  const minHeight = metricsHeights.reduce((a, b) => a + b, 0) / 2
  for (let i = 1; i <= metricsHeights.length; i++) {
    const leftColHeight = metricsHeights.slice(0, i).reduce((a, b) => a + b, 0)
    const rightColHeight = reversed.slice(0, i).reduce((a, b) => a + b, 0)
    if (leftColHeight >= minHeight && rightColHeight >= minHeight) {
      return Math.min(leftColHeight, rightColHeight)
    } else if (leftColHeight >= minHeight) {
      return leftColHeight
    } else if (rightColHeight >= minHeight) {
      return rightColHeight
    }
  }
}

export default class Metrics extends Component {
  metricsRef = React.createRef()
  state = { height: null, layoutCols: 1 } // height: null because int - null = int, int - undefined = NaN

  componentDidUpdate() {
    if (this.metricsRef.current) {
      const metrics = [...this.metricsRef.current.children]
      const cols = getRequiredCols(metrics)
      if (this.state.layoutCols !== cols) this.setState({ layoutCols: cols })
      else if (this.state.layoutCols === 2) {
        const height = getContainerHeight(metrics)
        if (
          (height === "unset" && this.state.height !== "unset") ||
          (height !== "unset" && this.state.height === "unset") ||
          Math.abs(height - this.state.height) > 1
        )
          this.setState({ height })
      }
    }
  }

  render() {
    const { portalId, inverterChargerDeviceId, isConnected, onChangeInverterChargerInputLimitClicked } = this.props
    const commonProps = { portalId, inverterChargerDeviceId, metricsRef: this.metricsRef }
    const style = this.state.layoutCols === 2 ? { height: this.state.height } : {}
    return (
      <div
        className={classnames("metrics-container", { "metrics-container--single-col": this.state.layoutCols === 1 })}
        ref={this.metricsRef}
        style={style}
      >
        <DcLoads {...commonProps} />
        {!!inverterChargerDeviceId && <AcLoads {...commonProps} />}
        <Battery {...commonProps} />
        {!!inverterChargerDeviceId && (
          <InverterCharger
            {...commonProps}
            onChangeInputLimitClicked={onChangeInverterChargerInputLimitClicked}
            connected={isConnected}
          />
        )}
        {!!inverterChargerDeviceId && <ActiveSource {...commonProps} />}
        <Solar {...commonProps} />
        <Chargers {...commonProps} />
        <Inverters {...commonProps} />
      </div>
    )
  }
}
