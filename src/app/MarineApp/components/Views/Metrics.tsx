import { useLayoutEffect, useRef, useState } from "react"
import ActiveSource from "../ActiveSource"
import AcLoads from "../AcLoads"
import Battery from "../Battery"
import Chargers from "../Chargers"
import DcLoads from "../DcLoads"
import Inverters from "../Inverters"
import { InverterCharger } from "../InverterCharger"
import Solar from "../Solar"
import Generators from "../Generators"
import { InstanceId } from "../../../modules"

const HEADER_HEIGHT = 110

const getMetricsTotalHeight = (metrics: HTMLDivElement[]) =>
  metrics.map((c) => Math.ceil(c.clientHeight)).reduce((a, b) => a + b, 0)

const getRequiredCols = (metrics: HTMLDivElement[]) => {
  if (metrics.length < 2) return 1
  if (window.innerWidth / window.innerHeight < 9 / 10) return 1
  if (window.innerWidth < 1000) return 1
  // Always show two columns on wide displays
  if (window.innerWidth > 1500) return 2
  // .metrics-container { max-height: calc(100vh - 110px); }
  return getMetricsTotalHeight(metrics) > Math.floor(window.innerHeight - HEADER_HEIGHT) ? 2 : 1
}

const getRequiredPages = (metrics: HTMLDivElement[], cols: number, containerHeight?: number) => {
  if (metrics.length < 2) return 1
  if (!containerHeight) return 1

  const metricsHeights = metrics.map((c) => c.getBoundingClientRect().height)
  let columns = 1
  let columnHeight = 0

  for (let i = 0; i < metricsHeights.length; i++) {
    if (columnHeight + metricsHeights[i] > containerHeight) {
      columns += 1
      columnHeight = 0
    }
    columnHeight += metricsHeights[i]
  }

  return Math.ceil(columns / cols)
}

const getContainerHeight = (metrics: HTMLDivElement[]) => {
  /**
   * The container must be just high enough to fit half of the total height of the metrics
   * elements. This means that either the left or the right column can be the taller one,
   * but prefer left over right for aesthetics.
   */
  const metricsHeights = metrics.map((c: HTMLDivElement) => c.getBoundingClientRect().height)

  const reversed = [...metricsHeights].reverse()
  const minHeight = metricsHeights.reduce((a: number, b: number) => a + b, 0) / 2
  for (let i = 1; i <= metricsHeights.length; i++) {
    const leftColHeight = metricsHeights.slice(0, i).reduce((a: number, b: number) => a + b, 0)
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

type MetricsProps = {
  inverterChargerDeviceId: InstanceId
  isConnected: boolean
  onChangeInverterChargerInputLimitClicked: Function
  currentPage: number
  setPages: Function
  pages: number
}

export const Metrics = ({
  isConnected,
  inverterChargerDeviceId,
  onChangeInverterChargerInputLimitClicked,
  currentPage,
  pages,
  setPages,
}: MetricsProps) => {
  const metricsRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    computeResponsiveness()
    window.addEventListener("resize", computeResponsiveness)
    return () => {
      window.removeEventListener("resize", computeResponsiveness)
    }
  })

  const computeResponsiveness = () => {
    if (metricsRef.current) {
      const metrics = Array.from(metricsRef.current.children) as HTMLDivElement[]

      const columns = getRequiredCols(metrics)

      const maxHeight = Math.floor(window.innerHeight - HEADER_HEIGHT)
      const newHeight = columns === 2 ? Math.min(getContainerHeight(metrics)!, maxHeight) : maxHeight
      setHeight(newHeight)

      const newPages = getRequiredPages(metrics, columns, newHeight)
      if (newPages !== pages) setPages(newPages)
    }
  }

  const style = { height: height, transform: `translate(-${currentPage * 100}%)` }

  return (
    <div className="metrics-container" ref={metricsRef} style={style}>
      <DcLoads />
      {!!inverterChargerDeviceId && <AcLoads />}
      <Battery />
      {!!inverterChargerDeviceId && (
        <InverterCharger onChangeInputLimitClicked={onChangeInverterChargerInputLimitClicked} connected={isConnected} />
      )}
      {!!inverterChargerDeviceId && <ActiveSource />}
      <Solar />
      <Chargers />
      <Inverters />
      <Generators />
    </div>
  )
}

export default Metrics
