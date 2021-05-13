import React from "react"
import { Card, SIZE_BIG } from "../../../components/Card"

import { BATTERY_STATE } from "../../../utils/constants"
import { useBattery } from "../../../modules"
import NumericValue from "../../../components/NumericValue"
import { NotAvailable } from "../NotAvailable"

import "./Battery.scss"

const batteryStateFormatter = (value: number) => {
  switch (value) {
    case BATTERY_STATE.CHARGING:
      return "Charging"
    case BATTERY_STATE.DISCHARGING:
      return "Discharging"
    case BATTERY_STATE.IDLE:
      return "Idle"
    default:
      return null
  }
}

const CELL_NUMBER = 5
const WARNING_LEVEL = 2
const ALARM_LEVEL = 1

function getClassname(idx: number, batteryLevelBars: number) {
  let c = ""

  if (idx < batteryLevelBars) {
    c += " success"
  }

  if (batteryLevelBars <= ALARM_LEVEL) {
    c += " alarm"
  } else if (batteryLevelBars <= WARNING_LEVEL) {
    c += " warning"
  }

  return c
}

export const Batteries = () => {
  const { batteries } = useBattery()

  if (batteries && batteries[0]) {
    const battery = batteries[0]
    const batteryStateLabel = batteryStateFormatter(battery.state)
    const batteryLevelBars = Math.ceil(battery.soc / (100 / CELL_NUMBER))
    return (
      <div className="">
        <Card title={"Battery"} size={SIZE_BIG}>
          <div className={"battery"}>
            <div className="battery__group">
              <div className="indicator-main">
                <div>
                  <NumericValue value={battery.soc} unit="%" defaultValue={"--"} precision={1} />
                  <br />
                </div>
                {batteryStateLabel && <div className="name">{batteryStateLabel}</div>}
              </div>

              <span>
                <div className="indicator">
                  <span className="name">Power</span>
                  <NumericValue value={battery.power} unit="V" defaultValue={"--"} precision={0} />
                </div>

                <div className="indicator">
                  <span className="name">Current</span>
                  <NumericValue value={battery.current} unit="A" defaultValue={"--"} precision={0} />
                </div>
              </span>
            </div>

            <div className="battery__charge">
              <div className="battery__charge__top" />
              <div className="battery__charge__body">
                {Array.from(Array(5).keys())
                  .reverse()
                  .map((idx) => (
                    <div
                      className={"battery__charge__body__cell" + getClassname(idx, batteryLevelBars)}
                      key={"battery-cell-" + idx}
                    />
                  ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  } else {
    return (
      <div className="">
        <Card title={"Battery"} size={SIZE_BIG}>
          <div className={"gauge"}>
            <NotAvailable />
          </div>
        </Card>
      </div>
    )
  }
}

export default Batteries
