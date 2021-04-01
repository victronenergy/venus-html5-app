import React, { Component } from "react"
import classnames from "classnames"

import HeaderView from "../HeaderView"
import BatteryLevel from "./BatteryLevel"
import HidingContainer from "../HidingContainer"
import MetricValues from "../MetricValues"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import NumericValue from "../NumericValue/index"
import SelectorButton from "../SelectorButton"

import "./Battery.scss"

import BatteryIcon from "../../../images/icons/battery.svg"
import LIcon from "../../../images/icons/L.svg"
import RIcon from "../../../images/icons/R.svg"

const getTopics = portalId => {
  return {
    batteries: `N/${portalId}/system/0/Batteries`
  }
}

const BatteryHeader = ({ amount, paginate, setPage, currentPage, pageSize }) => {
  return (
    <div className="battery-header">
      <img src={BatteryIcon} className="metric__icon" />
      <div className="battery-header__text">
        <p className="text--title">{amount > 1 ? "Batteries" : "Battery"}</p>
        <p className="text--subtitle">{amount > 1 && `${amount} Batteries`}</p>
      </div>
      {paginate && <Paginator setPage={setPage} currentPage={currentPage} pages={Math.ceil(amount / pageSize)} />}
    </div>
  )
}

const Paginator = ({ setPage, currentPage, pages }) => {
  return (
    <div className="battery__paginator">
      <SelectorButton disabled={currentPage < 1} onClick={() => setPage(currentPage - 1)}>
        <img src={LIcon} className="battery__paginator-button" />
      </SelectorButton>
      <span className="battery__paginator-page">{currentPage + 1}</span>
      <SelectorButton disabled={currentPage + 1 >= pages} onClick={() => setPage(currentPage + 1)}>
        <img src={RIcon} className="battery__paginator-button" />
      </SelectorButton>
    </div>
  )
}

export class BatteryList extends Component {
  ref = React.createRef()
  render() {
    const { batteries, currentPage, pageSize } = this.props
    return (
      <div
        className="batteries"
        ref={this.ref}
        style={this.ref.current && batteries.some(b => b.dummy) ? { height: this.ref.current.offsetHeight } : {}}
      >
        {batteries.map((battery, i) => {
          return (
            <div className={classnames("battery", { "battery--dummy": battery.dummy })} key={i}>
              {!battery.dummy && (
                <div className="battery__data">
                  <div className="battery__title-row text--subtitle-upper">{battery.name}</div>
                  <BatteryRow {...battery} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
}

const SingleBattery = battery => (
  <HeaderView icon={BatteryIcon} title={`Battery: ${battery.name}`}>
    <BatteryRow {...battery} />
  </HeaderView>
)

const BatteryRow = battery => {
  return (
    <MetricValues inflate>
      <div className="metrics__left">
        <NumericValue value={battery.voltage} unit="V" defaultValue={null} precision={1} />
        <NumericValue value={battery.current} unit="A" defaultValue={null} precision={1} />
        <NumericValue value={battery.power} unit="W" defaultValue={null} />
      </div>
      {battery.soc !== undefined && (
        <BatteryLevel state={battery.state} soc={battery.soc} timeToGo={battery.timetogo} />
      )}
    </MetricValues>
  )
}

export class Batteries extends Component {
  state = { pageSize: 1, currentPage: 0 }
  ref = React.createRef()

  setPage = currentPage => {
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

    const batteriesToShow = paginate
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

const mainBatteryToFirst = batteries => {
  // Move main battery to first in the array
  return batteries.sort((a, b) => (a.active_battery_service ? -1 : b.active_battery_service ? 1 : 0))
}

class BatteryWithData extends Component {
  render() {
    return (
      <MqttSubscriptions topics={getTopics(this.props.portalId)}>
        {({ batteries }) => {
          if (!batteries) {
            return null
          } else {
            const sortedBatteries = mainBatteryToFirst(batteries)
            return (
              <HidingContainer metricsRef={this.props.metricsRef}>
                <Batteries batteries={sortedBatteries} />
              </HidingContainer>
            )
          }
        }}
      </MqttSubscriptions>
    )
  }
}
export default BatteryWithData
