import React from "react"
import { Card, SIZE_SMALL } from "../../../components/Card"

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

type BatteryProps = {
  size: string
}

export const Batteries = ({ size }: BatteryProps) => {
  const { batteries } = useBattery()

  if (batteries && batteries[0]) {
    const battery = batteries[0]
    const batteryStateLabel = batteryStateFormatter(battery.state)
    const batteryLevelBars = Math.ceil(battery.soc / (100 / CELL_NUMBER))
    return (
      <div className="">
        <Card title={"Battery"} size={size}>
          <div className={"battery"}>
            <div className={"battery__group " + size}>
              <div className={"indicator-main" + (size === SIZE_SMALL ? "--small" : "")}>
                <div>
                  <NumericValue value={battery.soc} unit="%" defaultValue={"--"} precision={1} />
                  <br />
                </div>
                {batteryStateLabel && <div className="name">{batteryStateLabel}</div>}
              </div>

              <div>
                <div className="indicator">
                  <span className="name">Voltage</span>
                  <NumericValue value={battery.voltage} unit="V" defaultValue={"--"} precision={2} />
                </div>
                {size !== SIZE_SMALL && (
                  <div className="indicator">
                    <span className="name">Current</span>
                    <NumericValue value={battery.current} unit="A" defaultValue={"--"} precision={1} />
                  </div>
                )}
              </div>
            </div>

            <div className="battery__charge">
              <div className="battery__charge__top" />
              <div className="battery__charge__body">
                {Array.from(Array(batteryLevelBars).keys())
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
        <Card title={"Battery"} size={size}>
          <div className={"gauge"}>
            <NotAvailable />
          </div>
        </Card>
      </div>
    )
  }
}

export default Batteries
