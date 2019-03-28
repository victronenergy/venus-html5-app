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

const getTopics = portalId => {
  return {
    batteries: `N/${portalId}/system/0/Batteries`
  }
}

const BatteryHeader = ({ amount, paginate, setPage, currentPage, pageSize }) => {
  return (
    <div className="battery-header">
      <img src={require("../../../images/icons/battery.svg")} className="metric__icon" />
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
    const { batteries, currentPage, pageSize } = this.props
    return (
      <div
        className="batteries"
        ref={this.ref}
        style={this.ref.current && batteries.some(b => b.dummy) ? { height: this.ref.current.offsetHeight } : {}}
      >
        {batteries.map(({ voltage, current, power, name, soc, state, id, timetogo, dummy }, i) => {
          const isStarter = id && id.endsWith(":1")
          const batteryNameShort = name && name.split(" ")[0]
          return (
            <div className={classnames("battery", { "battery--dummy": dummy })} key={id || i}>
              {!dummy && (
                <div className="battery__data">
                  <div className="battery__title-row text--subtitle-upper">{batteryNameShort}</div>
                  <MetricValues inflate>
                    <div className="metrics__left">
                      <NumericValue value={voltage} unit="V" precision={1} />
                      {!isStarter && <NumericValue value={current} unit="A" precision={1} />}
                      {!isStarter && <NumericValue value={power} unit="W" />}
                    </div>
                    {soc !== undefined && <BatteryLevel state={state} soc={soc} timeToGo={timetogo} />}
                  </MetricValues>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
}

const SingleBattery = ({ voltage, current, power, name, soc, state, id, timetogo }) => {
  const isStarter = id && id.endsWith(":1")
  const batteryNameShort = name && name.split(" ")[0]
  return (
    <HeaderView icon={require("../../../images/icons/battery.svg")} title={`Battery: ${batteryNameShort}`}>
      <MetricValues inflate>
        <div className="metrics__left">
          <NumericValue value={voltage} unit="V" precision={1} />
          {!isStarter && <NumericValue value={current} unit="A" precision={1} />}
          {!isStarter && <NumericValue value={power} unit="W" />}
        </div>
        {soc !== undefined && <BatteryLevel state={state} soc={soc} timeToGo={timetogo} />}
      </MetricValues>
    </HeaderView>
  )
}

export class Batteries extends Component {
  state = { currentPage: 0 }
  ref = React.createRef()

  setPage = currentPage => {
    this.setState({ currentPage })
  }

  render() {
    const { batteries } = this.props

    const pageSize = window.innerHeight < 250 ? 1 : window.innerHeight < 400 ? 2 : 3

    const paginate = batteries.length > pageSize
    const batteriesToShow = paginate
      ? batteries.slice(this.state.currentPage * pageSize, this.state.currentPage * pageSize + pageSize)
      : batteries
    // These fill the last page with empty elements if necessary
    const fillerBatteries = paginate ? [...Array(pageSize - batteriesToShow.length)].map(() => ({ dummy: true })) : []

    const showSingleBattery = <SingleBattery {...batteries[0]} />

    const showMultipleBatteries = (
      <div className="metric metric__battery">
        <BatteryHeader
          amount={batteries.length}
          setPage={this.setPage}
          currentPage={this.state.currentPage}
          paginate={paginate}
          pageSize={pageSize}
        />
        <BatteryList
          batteries={batteriesToShow.concat(fillerBatteries)}
          currentPage={this.state.currentPage}
          pageSize={pageSize}
        />
      </div>
    )

    return batteries.length === 1 ? showSingleBattery : showMultipleBatteries
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
