import React, { Component } from "react"
import classnames from "classnames"

import BatteryLevel from "./BatteryLevel"
import HidingContainer from "../HidingContainer"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import NumericValue from "../NumericValue/index"
import SelectorButton from "../SelectorButton"

import "./Battery.scss"

const PAGE_SIZE = 3

const getTopics = portalId => {
  return {
    batteries: `N/${portalId}/system/0/Batteries`
  }
}

const BatteryHeader = ({ amount, paginate, setPage, currentPage }) => {
  return (
    <div className="battery-header">
      <img src={require("../../../images/icons/battery.svg")} className="metric__icon" />
      <div className="battery-header__text">
        <span>Batteries {paginate ? `(${amount})` : ""}</span>
      </div>
      {paginate && <Paginator setPage={setPage} currentPage={currentPage} pages={Math.ceil(amount / PAGE_SIZE)} />}
    </div>
  )
}

const Paginator = ({ setPage, currentPage, pages }) => {
  return (
    <div className="battery__paginator">
      <SelectorButton disabled={currentPage < 1} onClick={() => setPage(currentPage - 1)}>
        <img src={require("../../../images/icons/L.svg")} className="battery__paginator-button" />
      </SelectorButton>
      <span className="battery__paginator-page">{currentPage + 1}</span>
      <SelectorButton disabled={currentPage + 1 >= pages} onClick={() => setPage(currentPage + 1)}>
        <img src={require("../../../images/icons/R.svg")} className="battery__paginator-button" />
      </SelectorButton>
    </div>
  )
}

export class BatteryList extends Component {
  ref = React.createRef()

  render() {
    const { batteries, currentPage } = this.props

    return (
      <div
        className="batteries"
        ref={this.ref}
        style={this.ref.current && batteries.some(b => b.dummy) ? { height: this.ref.current.offsetHeight } : {}}
      >
        {batteries.map(({ voltage, current, power, name, soc, state, id, timetogo, dummy }, i) => (
          <div className={classnames("battery", { "battery--dummy": dummy })} key={id || i}>
            {batteries.length > 1 && <div className="battery__index">{!dummy && i + 1 + currentPage * PAGE_SIZE}</div>}
            {!dummy && (
              <div className="battery__data">
                <div className="battery__title-row">
                  {name} {soc !== undefined && <BatteryLevel state={state} soc={soc} timeToGo={timetogo} />}
                </div>
                <div>
                  <NumericValue value={voltage} unit="V" precision={1} />
                  <NumericValue value={current} unit="A" precision={1} />
                  <NumericValue value={power} unit="W" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
}

export class Batteries extends Component {
  state = { currentPage: 0 }
  ref = React.createRef()

  setPage = currentPage => {
    this.setState({ currentPage })
  }

  render() {
    const { batteries } = this.props
    const paginate = batteries.length > PAGE_SIZE
    const batteriesToShow = paginate
      ? batteries.slice(this.state.currentPage * PAGE_SIZE, this.state.currentPage * PAGE_SIZE + PAGE_SIZE)
      : batteries
    // These fill the last page with empty elements if necessary
    const fillerBatteries = paginate ? [...Array(PAGE_SIZE - batteriesToShow.length)].map(() => ({ dummy: true })) : []
    return (
      <div className="metric metric__battery">
        <BatteryHeader
          amount={batteries.length}
          setPage={this.setPage}
          currentPage={this.state.currentPage}
          paginate={paginate}
        />
        <BatteryList batteries={batteriesToShow.concat(fillerBatteries)} currentPage={this.state.currentPage} />
      </div>
    )
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
