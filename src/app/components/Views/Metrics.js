import React, { Component } from "react"
import ActiveSource from "../ActiveSource"
import AcLoads from "../AcLoads"
import Battery from "../Battery"
import Chargers from "../Chargers"
import DcLoads from "../DcLoads"
import Inverters from "../Inverters"
import { InverterCharger } from "../InverterCharger"
import Solar from "../Solar"
import Generators from "../Generators"

const HEADER_SIZE = 110

const getMetricsTotalHeight = metrics => metrics.map(c => Math.ceil(c.clientHeight)).reduce((a, b) => a + b, 0)

const getRequiredCols = metrics => {
  if (metrics.length < 2) return 1
  return getMetricsTotalHeight(metrics) > Math.floor(window.innerHeight - HEADER_SIZE) ? 2 : 1
}

const getRequiredPages = (metrics, containerHeight, cols) => {
  if (metrics.length < 2) return 1
  if (!containerHeight) return 1
  console.log(
    getMetricsTotalHeight(metrics),
    containerHeight,
    getMetricsTotalHeight(metrics) / (containerHeight * cols)
  )
  return Math.ceil(getMetricsTotalHeight(metrics) / (containerHeight * cols))
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
    this.state = { height: null, layoutCols: 1 }
    this.metricsRef = React.createRef()
  }

  componentDidUpdate() {
    if (this.metricsRef.current) {
      const metrics = [...this.metricsRef.current.children]
      const cols = getRequiredCols(metrics)
      const pages = getRequiredPages(metrics, this.state.height, cols)
      if (this.props.pages !== pages) this.props.setPages(pages)
      if (this.state.layoutCols !== cols) this.setState({ layoutCols: cols })
      else if (this.state.layoutCols === 2) {
        const height = Math.min(window.innerHeight - HEADER_SIZE, getContainerHeight(metrics))
        if (Math.abs(height - this.state.height) > 1) this.setState({ height })
      }
    }
  }

  render() {
    const {
      portalId,
      inverterChargerDeviceId,
      isConnected,
      onChangeInverterChargerInputLimitClicked,
      pages,
      currentPage
    } = this.props
    const commonProps = { portalId, inverterChargerDeviceId, metricsRef: this.metricsRef }

    let style =
      this.state.layoutCols === 2 ? { height: this.state.height, transform: `translate(-${currentPage * 100}%)` } : {}

    return (
      <div className="metrics-container" ref={this.metricsRef} style={style}>
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
