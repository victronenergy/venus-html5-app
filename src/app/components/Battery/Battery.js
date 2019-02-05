import React, { Component } from "react"
import classnames from "classnames"

import BatteryLevel from "./BatteryLevel"
import HidingContainer from "../HidingContainer"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import NumericValue from "../NumericValue/index"
import SelectorButton from "../SelectorButton"

import "./Battery.scss"

const pageSize = 3

const getTopics = portalId => {
  return {
    batteries: `N/${portalId}/system/0/Batteries`
  }
}

const BatteryHeader = ({ amount }) => {
  return (
    <div className="battery-header">
      <img src={require("../../../images/icons/battery.svg")} className="metric__icon" />
      <div className="battery-header__text">
        <span>Batteries</span>
        <span className="text text--smaller text--opaque">{`${amount} instance${amount > 1 ? "s" : ""}`}</span>
      </div>
    </div>
  )
}

const Paginator = ({ setPage, currentPage, pages }) => {
  return (
    <div className="button__paginator">
      <span className="text--opaque button__paginator-label">Page:</span>
      {[...new Array(pages)].map((_, i) => {
        return (
          <SelectorButton active={i === currentPage} onClick={() => setPage(i)} key={i}>
            {i + 1}
          </SelectorButton>
        )
      })}
    </div>
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
    const paginate = batteries.length > pageSize
    const batteriesToShow = paginate
      ? batteries.slice(this.state.currentPage * pageSize, this.state.currentPage * pageSize + pageSize)
      : batteries

    // These fill the last page with empty elements if necessary
    const fillerBatteries = paginate ? [...Array(pageSize - batteriesToShow.length)].map(() => ({ dummy: true })) : []

    return (
      <div
        className="batteries"
        ref={this.ref}
        style={this.ref.current && batteriesToShow.length < pageSize ? { height: this.ref.current.offsetHeight } : {}}
      >
        {batteriesToShow
          .concat(fillerBatteries)
          .map(({ voltage, current, power, name, soc, state, id, timetogo, dummy }, i) => (
            <div className={classnames("battery", { "battery--dummy": dummy })} key={id || i}>
              <div className="battery__index">{!dummy && i + 1 + this.state.currentPage * pageSize}</div>
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
        {paginate && (
          <Paginator
            setPage={this.setPage}
            currentPage={this.state.currentPage}
            pages={Math.ceil(batteries.length / pageSize)}
          />
        )}
      </div>
    )
  }
}

const mainBatteryToFirst = batteries => {
  // Move main battery to first in the array
  return batteries.sort((a, b) => (a.active_battery_service ? -1 : b.active_battery_service ? 1 : 0))
}

const BatteryWithData = ({ portalId, metricsRef }) => {
  return (
    <MqttSubscriptions topics={getTopics(portalId)}>
      {({ batteries }) => {
        if (!batteries) {
          return null
        } else {
          const sortedBatteries = mainBatteryToFirst(batteries)
          return (
            <HidingContainer metricsRef={metricsRef}>
              <div className="metric metric__battery">
                <BatteryHeader amount={sortedBatteries.length} />
                <Batteries batteries={sortedBatteries} />
              </div>
            </HidingContainer>
          )
        }
      }}
    </MqttSubscriptions>
  )
}
export default BatteryWithData
