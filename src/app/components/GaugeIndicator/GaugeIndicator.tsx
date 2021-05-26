import React, { PureComponent } from "react"
import { Chart } from "chart.js"
import "./GaugeIndicator.scss"
import { formatNumber } from "../NumericValue"
import { useTheme } from "../../modules"
import { sum } from "../../KVNRV/utils/helpers"
import { MessagesObj, STATUS_LEVELS, STATUS_LEVELS_MSG } from "../../KVNRV/utils/constants"

const INDICATOR_WIDTH = 0.0075

const defaultOptions = {
  maintainAspectRatio: false,
  responsive: true,
  rotation: Math.PI,
  circumference: Math.PI,
  legend: {
    display: false,
  },
  aspectRatio: 1,
  tooltips: {
    enabled: false,
  },
}

type GaugeIndicatorProps = {
  value: number
  unit: string
  percent: number
  parts: Array<number>
  darkMode: boolean
  size?: string
  gauge?: boolean
  zeroOffset?: number
}

type Colors = {
  colorGray: string
  colorRed: string
  colorYellow: string
  colorGreen: string
  colorTransparent: string
  textColor: string
}

export class GaugeIndicator extends PureComponent<GaugeIndicatorProps> {
  constructor(props: GaugeIndicatorProps) {
    super(props)
    this.thresholdsChartRef = React.createRef()
    this.indicatorChartRef = React.createRef()
    this.indicatorChart = null
    this.thresholdsChart = null
  }
  indicatorChart: Chart | null
  thresholdsChart: Chart | null
  thresholdsChartRef: React.RefObject<HTMLCanvasElement>
  indicatorChartRef: React.RefObject<HTMLCanvasElement>

  componentDidMount() {
    if (this.thresholdsChartRef.current && this.indicatorChartRef.current) {
      const thresholdsChartCanvas = this.thresholdsChartRef.current.getContext("2d")
      const indicatorChartCanvas = this.indicatorChartRef.current.getContext("2d")

      if (thresholdsChartCanvas && indicatorChartCanvas) {
        let { dataThresholds, dataIndicator } = this.getData()
        dataThresholds.datasets[0]!.data = this.props.parts

        this.thresholdsChart = new Chart(thresholdsChartCanvas, {
          type: "doughnut",
          data: dataThresholds,
          options: {
            ...defaultOptions,
            cutoutPercentage: this.props.gauge ? 70 : 90,
          },
        })

        this.indicatorChart = new Chart(indicatorChartCanvas, {
          type: "doughnut",
          plugins: [
            {
              beforeDraw: (chart: Chart) => {
                let width = chart.width,
                  height = chart.height,
                  ctx = chart.ctx
                if (!ctx || !height || !width) {
                  return
                }

                ctx.restore()
                let fontSize = (height / 70).toFixed(2)
                ctx.font = fontSize + "em sans-serif"
                ctx.textBaseline = "middle"
                ctx.fillStyle = this.getColors().textColor

                let text = formatNumber({ value: this.props.value, unit: this.props.unit }),
                  textX = Math.round((width - ctx.measureText(text).width) / 2),
                  textY = height / 2 + height * 0.25

                ctx.fillText(text, textX, textY)
                ctx.save()
              },
            },
          ],
          data: dataIndicator,
          options: {
            ...defaultOptions,
            cutoutPercentage: this.props.gauge ? 50 : 60,
          },
        })

        this.updateInner()
      }
    }
  }

  getData() {
    let { colorGray, colorRed, colorYellow, colorGreen } = this.getColors()

    let dataThresholds = {
      labels: ["Red"],
      datasets: [
        {
          label: "",
          data: [] as Array<number>,
          backgroundColor: [colorGreen, colorYellow, colorRed],
          hoverBackgroundColor: [colorGreen, colorYellow, colorRed],
          borderColor: "transparent",
        },
      ],
    }

    let dataIndicator = {
      labels: ["Red"],
      datasets: [
        {
          label: "",
          data: [] as Array<number>,
          backgroundColor: [colorGray, colorGray],
          hoverBackgroundColor: [colorGray, colorGray],
          borderColor: "transparent",
        },
      ],
    }

    if (this.props.gauge) {
      dataThresholds.datasets[0].backgroundColor = [
        colorRed,
        colorYellow,
        ...dataThresholds.datasets[0].backgroundColor,
      ]
      dataThresholds.datasets[0].hoverBackgroundColor = [
        colorRed,
        colorYellow,
        ...dataThresholds.datasets[0].hoverBackgroundColor,
      ]
      dataIndicator.datasets[0].hoverBackgroundColor.push(colorGray)
      dataIndicator.datasets[0].backgroundColor.push(colorGray)
    }

    return { dataThresholds, dataIndicator }
  }

  getColors() {
    const selected = document.querySelector("#root > .container")
    if (selected) {
      const container = getComputedStyle(selected as Element)

      const colorGray = container.getPropertyValue("--color-lightgray")
      const colorRed = container.getPropertyValue("--color-red")
      const colorYellow = container.getPropertyValue("--color-yellow")
      const colorGreen = container.getPropertyValue("--color-green")
      const textColor = container.getPropertyValue("--text-color-main")

      return { colorGray, colorRed, colorYellow, colorGreen, textColor, colorTransparent: "rgba(0,0,0,0)" }
    }

    return {
      colorGray: "#000",
      colorRed: "#000",
      colorYellow: "#000",
      colorGreen: "#000",
      textColor: "#000",
      colorTransparent: "#000",
    }
  }

  calculateColor(percent: number, colors: Colors) {
    if (this.props.gauge) {
      return this.props.darkMode ? "#fff" : "#000"
    }

    if (percent <= this.props.parts[0]) {
      return colors.colorGreen
    } else if (percent <= sum(this.props.parts.slice(0, 2))) {
      return colors.colorYellow
    } else {
      return colors.colorRed
    }
  }

  updateInner() {
    if (this.indicatorChart) {
      const colors = this.getColors()

      if (this.indicatorChart.data.datasets) {
        let percent = this.props.percent
        if (this.props.gauge) {
          percent = percent + ((this.props?.zeroOffset ?? 0.5) - INDICATOR_WIDTH / 2)
          this.indicatorChart.data.datasets[0].data = [
            percent - INDICATOR_WIDTH,
            INDICATOR_WIDTH * 2,
            1 - percent - INDICATOR_WIDTH,
          ]
        } else {
          this.indicatorChart.data.datasets[0].data = [percent, 1 - percent]
        }
        const currentColor = this.calculateColor(percent, colors)
        let colorRest = this.props.gauge ? colors.colorTransparent : colors.colorGray
        this.indicatorChart.data.datasets[0].backgroundColor = [currentColor, colorRest]
        this.indicatorChart.data.datasets[0].hoverBackgroundColor = [currentColor, colorRest]

        if (this.props.gauge) {
          this.indicatorChart.data.datasets[0].backgroundColor.unshift(colors.colorTransparent)
          this.indicatorChart.data.datasets[0].hoverBackgroundColor.unshift(colors.colorTransparent)
        }
      }
      this.indicatorChart.update()
    }
  }

  updateOuter() {
    if (this.thresholdsChart) {
      if (this.thresholdsChart.data.datasets) {
        this.thresholdsChart.data.datasets[0].data = this.props.parts
      }
      this.thresholdsChart.update()
      this.updateInner()
    }
  }

  componentDidUpdate(prevProps: Readonly<GaugeIndicatorProps>) {
    if (prevProps.value !== this.props.value || prevProps.darkMode !== this.props.darkMode) {
      this.updateInner()
    }
    if (prevProps.parts !== this.props.parts) {
      this.updateOuter()
    }
  }

  render() {
    return (
      <div className={"gauge-indicator " + this.props.size}>
        <canvas className={this.props.gauge ? "bottom-chart" : "top-chart"} ref={this.thresholdsChartRef} />
        <canvas className={this.props.gauge ? "top-chart" : "bottom-chart"} ref={this.indicatorChartRef} />
      </div>
    )
  }
}

const withTheme = (Component: any) => {
  return (props: any) => {
    const { darkMode } = useTheme()

    return <Component darkMode={darkMode} {...props} />
  }
}

export default withTheme(GaugeIndicator)
