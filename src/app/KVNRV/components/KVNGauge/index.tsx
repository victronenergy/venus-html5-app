import { sum } from "app/KVNRV/utils/helpers"
import { useContainerColors } from "app/KVNRV/utils/hooks"
import { Chart } from "chart.js"
import { useCallback, useEffect, useMemo, useRef, memo, ReactNode } from "react"
import "./GaugeIndicator.scss"
import { TextPlugin } from "./plugins/TextPlugin"
import { debounce } from "lodash-es"

const defaultOptions = {
  maintainAspectRatio: false,
  responsive: true,
  rotation: 0,
  circumference: 180,
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
  cutoutPercentage: 60,
}

type GaugeIndicatorProps = {
  value?: number
  unit?: string
  percent: number
  parts: Array<number>
  gauge?: boolean
  from?: number
  to?: number
  children?: ReactNode
  inverse?: boolean
  showText?: boolean
  className?: string
  showNeedle?: boolean
}

const INDICATOR_WIDTH = 0.015

export const KVNGauge = memo(
  ({
    value,
    percent,
    parts,
    className = "",
    unit,
    children,
    inverse = false,
    showText = true,
    from = -Math.PI,
    to = Math.PI,
    showNeedle = true,
  }: GaugeIndicatorProps) => {
    const canvasEl = useRef() as React.MutableRefObject<HTMLCanvasElement>

    const chartRef = useRef<Chart | null>()
    const colors = useContainerColors()

    const orderedColors = useMemo(() => {
      const { colorGreen, colorYellow, colorRed } = colors
      const clrs = [colorGreen, colorYellow, colorRed]
      return !inverse ? clrs : clrs.reverse()
    }, [colors, inverse])

    const indicatorColor = useMemo(() => {
      const indexOfPart = parts.findIndex((_, idx, arr) => sum(arr.slice(0, idx + 1)) >= percent)
      const usedColor = orderedColors[indexOfPart] || colors.colorGray
      return usedColor
    }, [colors.colorGray, orderedColors, parts, percent])

    const indicatorColors = useMemo(() => {
      const clrs = [indicatorColor, colors.textColor, colors.colorGray]
      return !inverse ? clrs : clrs.reverse()
    }, [indicatorColor, colors.textColor, colors.colorGray, inverse])

    const indicatorPoints = useMemo(() => {
      const indicatorWidth = showNeedle ? INDICATOR_WIDTH : 0
      return [percent - indicatorWidth / 2, indicatorWidth, 1 - percent - indicatorWidth / 2]
    }, [percent, showNeedle])

    // function used to get first data on first render
    const getIndicatorData = useCallback(() => {
      return {
        data: indicatorPoints,
        weight: 4,
        spacing: 10,
        borderColor: ["transparent", colors.textColor, "transparent"],
        hoverBorderColor: ["transparent", colors.textColor, "transparent"],
        borderWidth: [0, showNeedle ? 1 : 0, 0],
        backgroundColor: indicatorColors,
        hoverBackgroundColor: indicatorColors,
      }
    }, [indicatorPoints, colors.textColor, showNeedle, indicatorColors])

    const createChart = useCallback(() => {
      if (!canvasEl.current) {
        return
      }

      const chartCanvas = canvasEl.current.getContext("2d")

      if (!chartCanvas) {
        return
      }
      chartRef.current = new Chart(chartCanvas, {
        type: "doughnut",
        plugins: [showText ? TextPlugin() : {}],
        options: {
          ...defaultOptions,
          rotation: from,
          circumference: to,
        },
        data: {
          datasets: [
            {
              data: [...parts],
              weight: 1,
              backgroundColor: orderedColors,
              hoverBackgroundColor: orderedColors,
              borderColor: "transparent",
            },
            {
              data: [1],
              weight: 1,
              borderColor: "transparent",
              backgroundColor: "transparent",
              hoverBackgroundColor: "transparent",
            },
            getIndicatorData(),
          ],
        },
      })
      // inject options for text plugin
      //@ts-ignore
      chartRef.current.options.textPlugin = { textColor: colors.textColor, value, unit }
    }, [colors.textColor, from, getIndicatorData, orderedColors, parts, showText, to, unit, value])

    // create chart entity on first mount
    useEffect(() => {
      if (!canvasEl.current) {
        return
      }

      // create chart only if it does not exist
      if (!chartRef.current) {
        createChart()
      }
    }, [createChart])

    // update threshold dataset
    useEffect(() => {
      if (!chartRef.current || !chartRef.current.data.datasets) {
        return
      }

      chartRef.current.data.datasets[0].data = parts
      chartRef.current.update()
    }, [parts])

    // update indicator dataset
    useEffect(() => {
      if (!chartRef.current || !chartRef.current.data.datasets) {
        return
      }

      chartRef.current.data.datasets[2].data = indicatorPoints
      chartRef.current.data.datasets[2].backgroundColor = indicatorColors
      chartRef.current.data.datasets[2].hoverBackgroundColor = indicatorColors

      // inject options for text plugin
      //@ts-ignore
      chartRef.current.options.textPlugin = { textColor: colors.textColor, value, unit }

      chartRef.current.update()
    }, [colors.textColor, indicatorColors, indicatorPoints, unit, value])

    // Chart js was not updating it's height and width on resize
    // below we destroy and create it again in order for it to resize accordingly
    const onResize = function () {
      if (chartRef.current) {
        chartRef.current.destroy()
        createChart()
      }
    }

    useEffect(() => {
      const debouncedResize = debounce(onResize, 500)
      window.addEventListener("resize", debouncedResize)
      return () => window.removeEventListener("resize", debouncedResize)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div className={`gauge-indicator ${className}`}>
        {children}
        <div className="canvas">
          <canvas className="top-chart" ref={canvasEl} />
        </div>
      </div>
    )
  }
)
