import React, { Component } from "react"
import HidingContainer from "../HidingContainer"
import { Battery, useBattery } from "../../../modules/Battery/Battery.provider"


import BatteryIcon from "../../images/icons/battery.svg"
import classnames from "classnames"
import HeaderView from "../HeaderView"
import NumericValue from "../../../components/NumericValue"
import MetricValues from "../MetricValues"
import LIcon from "../../images/icons/L.svg"
import RIcon from "../../images/icons/R.svg"
import SelectorButton from "../SelectorButton"
import { BatteryLevel } from "./BatteryLevel"

import './Battery.scss'

type PaginatorProps = {
  setPage: Function,
  currentPage: number,
  pages: number,
}

const Paginator = ({ setPage, currentPage, pages }: PaginatorProps) => {
  return (
    <div className="battery__paginator">
      <SelectorButton disabled={currentPage < 1} onClick={() => setPage(currentPage - 1)}>
        <img src={LIcon} className="battery__paginator-button" alt={"Battery Paginator Button"} />
      </SelectorButton>
      <span className="battery__paginator-page">{currentPage + 1}</span>
      <SelectorButton disabled={currentPage + 1 >= pages} onClick={() => setPage(currentPage + 1)}>
        <img src={RIcon} className="battery__paginator-button" alt={"Battery Paginator Button"} />
      </SelectorButton>
    </div>
  )
}

type BatteryHeaderProps = {
  amount: number,
  paginate: boolean,
  setPage: Function,
  currentPage: number,
  pageSize: number,
}

const BatteryHeader = ({ amount, paginate, setPage, currentPage, pageSize }: BatteryHeaderProps) => {
  return (
    <div className="battery-header">
      <img src={BatteryIcon} className="metric__icon" alt={"Battery Icon"} />
      <div className="battery-header__text">
        <p className="text--title">{amount > 1 ? "Batteries" : "Battery"}</p>
        <p className="text--subtitle">{amount > 1 && `${amount} Batteries`}</p>
      </div>
      {paginate && <Paginator setPage={setPage} currentPage={currentPage} pages={Math.ceil(amount / pageSize)} />}
    </div>
  )
}


const BatteryRow = (battery: Battery) => {
  return (
    <MetricValues inflate={""}>
      <div className="metrics__left">
        <NumericValue value={battery.voltage} unit="V" defaultValue={null} precision={1} />
        <NumericValue value={battery.current} unit="A" defaultValue={null} precision={1} />
        <NumericValue value={battery.power} unit="W" defaultValue={null} />
      </div>
      {battery.soc !== undefined && (
        <BatteryLevel battery={battery} />
      )}
    </MetricValues>
  )
}

const SingleBattery = (battery: Battery) => (
  <HeaderView icon={BatteryIcon} title={`Battery: ${battery.name}`}>
    <BatteryRow {...battery} />
  </HeaderView>
)

type BatteryListProps = {
  batteries: Array<Battery | any>
  currentPage: number
  pageSize: number
}

class BatteryList extends Component<BatteryListProps> {
  ref = React.createRef<HTMLDivElement>()

  render() {
    const { batteries } = this.props
    return (
      <div
        className="batteries"
        ref={this.ref}
        style={this.ref.current && batteries.some(b => b.dummy) ? { height: this.ref.current!.offsetHeight } : {}}
      >
        {batteries.map((battery, i) => {
          return (
            <div className={classnames("battery", { "battery--dummy": battery.dummy })} key={i}>
              {!battery.dummy && (
                <div className="battery__data">
                  <div className="battery__title-row text--subtitle-upper">{battery.name}</div>
                  <BatteryRow {...battery as Battery} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
}


type BatteriesProps = {
  batteries: Array<Battery>;
};
type BatteriesState = {
  pageSize: number
  currentPage: number
};

export class Batteries extends Component<BatteriesProps, BatteriesState> {
  state = { pageSize: 1, currentPage: 0 }
  ref = React.createRef()

  setPage = (currentPage: number) => {
    this.setState({ currentPage })
  }

  updatePageSize() {
    const pageSize = window.innerHeight < 500 ? 1 : window.innerHeight < 700 ? 2 : 3

    if (pageSize !== this.state.pageSize) {
      this.setState({ pageSize })
      this.setPage(0)
    }
  }

  componentDidMount() {
    this.updatePageSize()
    window.addEventListener("resize", this.updatePageSize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePageSize.bind(this))
  }

  render() {
    const { batteries } = this.props
    const pageSize = this.state.pageSize
    const paginate = batteries.length > pageSize
    const currentPage = this.state.currentPage

    const batteriesToShow: Array<any> = paginate
      ? batteries.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
      : batteries
    // These fill the last page with empty elements if necessary
    const fillerBatteries = paginate ? [...Array(pageSize - batteriesToShow.length)].map(() => ({ dummy: true })) : []

    const MultipleBatteries = (
      <div className="metric metric__battery">
        <BatteryHeader
          amount={batteries.length}
          setPage={this.setPage}
          currentPage={currentPage}
          paginate={paginate}
          pageSize={pageSize}
        />
        <BatteryList
          batteries={batteriesToShow.concat(fillerBatteries)}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
    )

    return batteries.length === 1 ? SingleBattery(batteries[0]) : MultipleBatteries
  }
}

export const BatteriesWithData = () => {
  const { batteries } = useBattery()

  if (batteries) {
    return (
      <HidingContainer>
        <Batteries batteries={batteries} />
      </HidingContainer>
    )
  } else {
    return <div/>
  }
}

export default BatteriesWithData
