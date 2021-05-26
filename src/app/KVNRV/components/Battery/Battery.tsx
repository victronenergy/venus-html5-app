import React from "react"
import { Card, SIZE_SHORT } from "../../../components/Card"

import { BATTERY_STATE } from "../../../utils/constants"
import { useBattery } from "../../../modules"
import NumericValue from "../../../components/NumericValue"
import { NotAvailable } from "../NotAvailable"

import "./Battery.scss"
import { BATTERY_CONF, CRITICAL_MULTIPLIER } from "../../utils/constants"
import GaugeIndicator from "../../../components/GaugeIndicator"
import { normalizePower } from "../../utils/helpers"

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
  size: string[]
}

export const Batteries = ({ size }: BatteryProps) => {
  const { batteries } = useBattery()

  if (batteries && batteries[0]) {
    const battery = batteries[0]
    const batteryStateLabel = batteryStateFormatter(battery.state)
    const batteryLevelBars = Math.ceil(battery.soc / (100 / CELL_NUMBER))
    const normalizedPower = normalizePower(
      battery.power,
      BATTERY_CONF.MAX * CRITICAL_MULTIPLIER,
      -1 * BATTERY_CONF.ZERO_OFFSET!
    )

    return (
      <Card title={"Battery"} size={size}>
        <div className={"battery"}>
          <div className={"battery__group " + size}>
            <div className={"indicator-main" + (size.includes(SIZE_SHORT) ? "--small" : "")}>
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
              <div className="indicator">
                <span className="name">Current</span>
                <NumericValue value={battery.current} unit="A" defaultValue={"--"} precision={1} />
              </div>
            </div>
          </div>

          <div className="battery__charge">
            <div className="battery__charge__top" />
            <div className="battery__charge__body">
              {batteryLevelBars > 0 &&
                Array.from(Array(batteryLevelBars).keys())
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
        <div className="gauge">
          <GaugeIndicator
            value={battery.power}
            percent={normalizedPower}
            parts={BATTERY_CONF.THRESHOLDS}
            zeroOffset={BATTERY_CONF.ZERO_OFFSET}
            unit={"W"}
            size={"big"}
            gauge={true}
          />
        </div>
      </Card>
    )
  } else {
    return (
      <Card title={"Battery"} size={size}>
        <div className={"gauge"}>
          <NotAvailable />
        </div>
      </Card>
    )
  }
}

export default Batteries
