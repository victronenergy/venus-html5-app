import React, { Component } from "react"

import { Battery, useBattery } from "@victronenergy/mfd-modules"
import { BATTERY_STATE } from "../../../utils/constants"

import ColumnContainer from "../ColumnContainer"
import BatteryIcon from "../../images/icons/battery.svg"
import classnames from "classnames"
import HeaderView from "../HeaderView"
import NumericValue from "../../../components/NumericValue"
import MetricValues from "../MetricValues"
import SelectorButton from "../SelectorButton"
import { BatteryLevel } from "./BatteryLevel"

import "./Battery.scss"

import LIcon from "../../images/icons/L.svg"
import RIcon from "../../images/icons/R.svg"
import { translate, Translate } from "react-i18nify"
import { observer } from "mobx-react"
import { useVisibilityNotifier } from "app/MarineApp/modules"
import { WIDGET_TYPES } from "app/MarineApp/utils/constants"

type PaginatorProps = {
  setPage: Function
  currentPage: number
  pages: number
}

const Paginator = ({ setPage, currentPage, pages }: PaginatorProps) => {
  return (
    <div className="battery__paginator">
      <SelectorButton alwaysUnlocked={true} disabled={currentPage < 1} onClick={() => setPage(currentPage - 1)}>
        <img src={LIcon} className="battery__paginator-button" alt={"Pagination button left"} />
      </SelectorButton>
      <span className="battery__paginator-page">{currentPage + 1}</span>
      <SelectorButton
        alwaysUnlocked={true}
        disabled={currentPage + 1 >= pages}
        onClick={() => setPage(currentPage + 1)}
      >
        <img src={RIcon} className="battery__paginator-button" alt={"Pagination button right"} />
      </SelectorButton>
    </div>
  )
}
type BatteryHeaderProps = {
  amount: number
  paginate: boolean
  setPage: Function
  currentPage: number
  pageSize: number
}

const BatteryHeader = ({ amount, paginate, setPage, currentPage, pageSize }: BatteryHeaderProps) => {
  return (
    <div className="battery-header">
      <img src={BatteryIcon} className="metric__icon" alt={"Battery Icon"} />
      <div className="battery-header__text">
        <p className="text--title">
          <Translate value={"widgets." + (amount > 1 ? "batteries" : "battery")} />
        </p>
        <p className="text--subtitle">
          {amount > 1 && (
            <>
              {amount} <Translate value="widgets.batteries" />
            </>
          )}
        </p>
      </div>
      {paginate && <Paginator setPage={setPage} currentPage={currentPage} pages={Math.ceil(amount / pageSize)} />}
    </div>
  )
}

const BatteryRow = (battery: Battery) => {
  return (
    <MetricValues inflate>
      <div className="metrics__left">
        <NumericValue value={battery.voltage} unit="V" defaultValue={null} precision={1} />
        <NumericValue value={battery.current} unit="A" defaultValue={null} precision={1} />
        <NumericValue value={battery.power} unit="W" defaultValue={null} />
      </div>
      {battery.soc !== undefined && <BatteryLevel battery={battery} />}
    </MetricValues>
  )
}

const SingleBattery = (battery: Battery) => (
  <HeaderView icon={BatteryIcon} title={translate("widgets.batteryWithName", { name: battery.name })}>
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
        style={this.ref.current && batteries.some((b) => b.dummy) ? { height: this.ref.current!.offsetHeight } : {}}
      >
        {batteries.map((battery, i) => {
          return (
            <div className={classnames("battery", { "battery--dummy": battery.dummy })} key={i}>
              {!battery.dummy && (
                <div className="battery__data">
                  <div className="battery__title-row text--subtitle-upper">{battery.name}</div>
                  <BatteryRow {...(battery as Battery)} />
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
  batteries: Array<Battery>
}
type BatteriesState = {
  pageSize: number
  currentPage: number
}

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

export const BatteriesWithData = observer(() => {
  const { batteries } = useBattery()

  useVisibilityNotifier({ widgetName: WIDGET_TYPES.BATTERY, visible: !!(batteries && batteries.length) })

  if (batteries) {
    // Sort batteries first by state, and then by ID to keep order consistent
    const sorted = batteries.slice().sort((a, b) => {
      // Show charging batteries before discharging batteries
      if (a.state === BATTERY_STATE.CHARGING && b.state !== BATTERY_STATE.CHARGING) return -1
      if (a.state !== BATTERY_STATE.CHARGING && b.state === BATTERY_STATE.CHARGING) return 1
      if (a.state === BATTERY_STATE.CHARGING && b.state === BATTERY_STATE.CHARGING) {
        return parseInt(a.id) - parseInt(b.id)
      }

      // Show discharging batteries before idle batteries
      if (a.state === BATTERY_STATE.DISCHARGING && b.state === BATTERY_STATE.IDLE) return -1
      if (a.state === BATTERY_STATE.IDLE && b.state === BATTERY_STATE.DISCHARGING) return 1
      if (a.state === BATTERY_STATE.DISCHARGING && b.state === BATTERY_STATE.DISCHARGING) {
        return parseInt(a.id) - parseInt(b.id)
      }

      return parseInt(a.id) - parseInt(b.id)
    })
    return (
      <ColumnContainer>
        <Batteries batteries={sorted} />
      </ColumnContainer>
    )
  } else {
    return <div />
  }
})

export default BatteriesWithData
