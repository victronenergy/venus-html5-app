import React, { Component } from "react"
import { Chart } from 'chart.js';
import "./DonutIndicator.scss"


const colorGray = '#c8c9c9'
const colorRed = '#ea5b57'
const colorYellow = '#eda63e'
const colorGreen = '#02be62'

let dataOuter = {
  labels: [
    'Red',
  ],
  datasets: [{
    label: '',
    data: [] as Array<number>,
    backgroundColor: [
      colorGreen,
      colorYellow,
      colorRed,
    ],
    borderColor: [
      'rgba(255, 255, 255 ,1)',
    ]
  }]
};

let dataInner = {
  labels: [
    'Red',
  ],
  datasets: [{
    label: '',
    data: [] as Array<number>,
    backgroundColor: [
      colorGray,
      colorGray,
    ],
    borderColor: [
      'rgba(255, 255, 255 ,1)',
    ]
  }]
};

const defaultOptions = {
  maintainAspectRatio: false,
  responsive: true,
  rotation: Math.PI,
  circumference: Math.PI,
  legend: {
    display: false
  },
  aspectRatio: 1,
  tooltips: {
    enabled: false
  }
}


type DonutIndicatorProps = {
  value: number,
  unit: string,
  percent: number,
  parts: Array<number>
}

class DonutIndicator extends Component<DonutIndicatorProps> {
  constructor(props: DonutIndicatorProps) {
    super(props);
    this.outerChartRef = React.createRef();
    this.innerChartRef = React.createRef();
    this.innerChart = null;
  }
  innerChart: Chart | null;
  outerChartRef: React.RefObject<HTMLCanvasElement>;
  innerChartRef: React.RefObject<HTMLCanvasElement>;


  componentDidMount() {
    if (this.outerChartRef.current && this.innerChartRef.current) {
      const outerChartCanvas = this.outerChartRef.current.getContext("2d");
      const innerChartCanvas = this.innerChartRef.current.getContext("2d");

      if (outerChartCanvas && innerChartCanvas) {
        dataOuter.datasets[0]!.data = this.props.parts;
        new Chart(outerChartCanvas, {
          type: "doughnut",
          data: dataOuter,
          options: {
            ...defaultOptions,
            cutoutPercentage: 90
          }
        });

        this.innerChart = new Chart(innerChartCanvas, {
          type: "doughnut",
          plugins: [{
            beforeDraw: (chart: Chart) => {
              let width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
              if (!ctx || !height || !width) {return;}

              ctx.restore();
              let fontSize = (height / 60).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.textBaseline = "middle";

              let text = this.props.value + " " + this.props.unit,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2 + (height * 0.3);

              ctx.fillText(text, textX, textY);
              ctx.save();
            }
          }],
          data: dataInner,
          options: {
            ...defaultOptions,
            cutoutPercentage: 60,
          }
        });

        this.updateInner()
      }
    }
  }

  updateInner() {
    if (this.innerChart) {
      let currentColor = this.props.percent < this.props.parts[0] ? colorGreen : (
        this.props.percent < this.props.parts[0] + this.props.parts[1] ? colorYellow : colorRed
      );
      if (this.innerChart.data.datasets) {
        let percent = Math.max(0, this.props.percent);
        this.innerChart.data.datasets[0].data = [percent, 1 - percent]
        this.innerChart.data.datasets[0].backgroundColor = [currentColor, colorGray];
      }
      this.innerChart.update();
    }
  }

  componentDidUpdate(prevProps: Readonly<DonutIndicatorProps>) {
    if (prevProps.value !== this.props.value) {
      this.updateInner()
    }
  }

  render() {
    return (
      <div className={'donut-indicator'}>
        <canvas
          className="outer-chart"
          ref={this.outerChartRef}
        />
        <canvas
          className="inner-chart"
          ref={this.innerChartRef}
        />
      </div>
    )
  }
}


export default DonutIndicator
