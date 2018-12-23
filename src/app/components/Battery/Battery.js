import React, { Component } from "react"

import BatteryLevel from "./BatteryLevel"
import HidingContainer from "../HidingContainer"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import NumericValue from "./../NumericValue"
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
    <div className="battery__header">
      <img src={require("../../../images/icons/battery.svg")} className="metric__icon" />
      <div className="battery__header-text">
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
          <SelectorButton active={i === currentPage} onClick={() => setPage(i)}>
            {i + 1}
          </SelectorButton>
        )
      })}
    </div>
  )
}

class Batteries extends Component {
  state = { currentPage: 0 }

  setPage = currentPage => {
    this.setState({ currentPage })
  }

  render() {
    const { batteries } = this.props
    const paginate = batteries.length > pageSize
    const batteriesToShow = paginate
      ? batteries.slice(this.state.currentPage * pageSize, this.state.currentPage * pageSize + pageSize)
      : batteries

    return (
      <div className="batteries">
        {batteriesToShow.map(({ voltage, current, power, name, soc, state, id, timetogo }, i) => (
          <div className="battery" key={id}>
            <div className="battery__index">{i + 1 + this.state.currentPage * pageSize}</div>
            <div className="battery__data">
              {name}
              <div>
                {voltage && <NumericValue value={voltage} unit="V" precision={1} />}
                {current && <NumericValue value={current} unit="A" precision={1} />}
                {power && <NumericValue value={power} unit="W" />}
              </div>
            </div>
            {soc && <BatteryLevel state={state} soc={soc} timeToGo={timetogo} />}
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

class BatteryWithData extends Component {
  render() {
    const { portalId } = this.props
    return (
      <HidingContainer>
        <MqttSubscriptions topics={getTopics(portalId)}>
          {topics => {
            const batteries = topics.batteries.value
            if (!batteries) {
              return null
            } else {
              mainBatteryToFirst(batteries)
              return (
                <div className="metric metric__battery">
                  <BatteryHeader amount={batteries.length} />
                  <Batteries batteries={batteries} />
                </div>
              )
            }
          }}
        </MqttSubscriptions>
      </HidingContainer>
    )
  }
}
export default BatteryWithData
