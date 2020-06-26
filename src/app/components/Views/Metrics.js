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
import Generators from "../Generators"

const getRequiredCols = metrics => {
  if (metrics.length < 2) return 1
  else {
    const metricsTotalHeight = metrics.map(c => Math.ceil(c.clientHeight)).reduce((a, b) => a + b, 0)
    // metrics-container max-height = 75vh
    return metricsTotalHeight > Math.floor(window.innerHeight * 0.75) ? 2 : 1
  }
}

const getContainerHeight = metrics => {
  /**
   * The container must be just high enough to fit half of the total height of the metrics
   * elements. This means that either the left or the right column can be the taller one,
   * but prefer left over right for aesthetics.
   */
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
  constructor(props) {
    super(props)

    this.state = { height: props.savedState.metricsHeight || null, layoutCols: props.savedState.metricsCols || 1 } // height: null because int - null = int, int - undefined = NaN
    this.metricsRef = React.createRef()
  }

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

  componentWillUnmount() {
    // this is a bit of a hacky way to save the height in the
    // parent component. It should probably be calculated there, anyways
    this.props.saveState(this.state.height, this.state.layoutCols)
  }

  render() {
    const { portalId, inverterChargerDeviceId, isConnected, onChangeInverterChargerInputLimitClicked } = this.props
    const commonProps = { portalId, inverterChargerDeviceId, metricsRef: this.metricsRef }

    let style = this.state.layoutCols === 2 ? { height: this.state.height } : {}

    return (
      <div
        className={classnames("metrics-container", {
          "metrics-container--single-col": this.state.layoutCols === 1
        })}
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
        <Generators {...commonProps} />
      </div>
    )
  }
}
