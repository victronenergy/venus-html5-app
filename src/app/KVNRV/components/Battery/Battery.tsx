import React from "react"
import { Card, SIZE_SHORT } from "../../../components/Card"

import { BATTERY_STATE } from "../../../utils/constants"
import { useBattery } from "@victronenergy/mfd-modules"
import { useSendUpdate } from "../../modules"
import NumericValue from "../../../components/NumericValue"
import { NotAvailable } from "../NotAvailable"

import "./Battery.scss"
import { BATTERY_CONF, CRITICAL_MULTIPLIER, STATUS_LEVELS, STATUS_LEVELS_MSG } from "../../utils/constants"
import GaugeIndicator from "../../../components/GaugeIndicator"
import { normalizePower } from "../../utils/helpers"
import { Footer } from "../../../components/Card/Card"

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

const batteryTimeToGoFormatter = (timeToGo: number) => {
  let secs = timeToGo
  if (!isNaN(secs)) {
    const days = Math.floor(secs / 86400)
    secs = secs - days * 86400
    const hours = Math.floor(secs / 3600)
    secs = secs - hours * 3600
    const minutes = Math.floor(secs / 60)

    let time = []
    if (days) time.push(`${days} days`)
    if (hours) time.push(`${hours} hours`)
    if (minutes) time.push(`${minutes} minutes`)
    return time.join(", ")
    // we are not interested in seconds, since it's an
    // estimate anyways
  } else {
    return " - "
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
  const battery = batteries
    ? batteries.length > 1
      ? batteries.filter((b) => b.active_battery_service)[0]
      : batteries[0]
    : undefined

  const power = battery?.power ?? 1

  const config = {
    ...BATTERY_CONF,
    MAX: BATTERY_CONF.MAX * (battery?.voltage ? battery.voltage : 1) * CRITICAL_MULTIPLIER,
  }
  const normalizedPower = normalizePower(power, config.MAX, -1 * BATTERY_CONF.ZERO_OFFSET!)

  useSendUpdate(normalizedPower, config, "Battery")

  if (batteries) {
    if (battery) {
      const batteryStateLabel = batteryStateFormatter(battery.state)
      const batteryLevelBars = Math.ceil(battery.soc / (100 / CELL_NUMBER))

      const status =
        batteryLevelBars <= ALARM_LEVEL
          ? STATUS_LEVELS.ALARM
          : batteryLevelBars <= WARNING_LEVEL
          ? STATUS_LEVELS.WARNING
          : STATUS_LEVELS.SUCCESS

      const footer: Footer = { status: status, message: STATUS_LEVELS_MSG[status], property: "Charge" }
      return (
        <Card title={"Battery"} size={size} footer={footer}>
          <div className={"battery"}>
            <div className={"battery__group " + size}>
              <div className={"indicator-main" + (size.includes(SIZE_SHORT) ? "--small" : "")}>
                <div>
                  <NumericValue value={battery.soc} unit="%" defaultValue={" - "} precision={1} />
                  <br />
                </div>
                {batteryStateLabel && <div className="name">{batteryStateLabel}</div>}
              </div>

              <div>
                <div className="indicator">
                  <span className="name">Voltage</span>
                  <NumericValue value={battery.voltage} unit="V" defaultValue={" - "} precision={2} />
                </div>
                <div className="indicator">
                  <span className="name">Current</span>
                  <NumericValue value={battery.current} unit="A" defaultValue={" - "} precision={1} />
                </div>
              </div>
            </div>

            <div className="battery__charge">
              <div className="battery__charge__top" />
              <div className={"battery__charge__body" + (batteryLevelBars === CELL_NUMBER ? " full" : "")}>
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
          <div className="battery__gauge gauge">
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
          <div className={"indicator"}>
            <div className={"name"}>Remaining time</div>
            <div className={"value"}>{batteryTimeToGoFormatter(battery.timetogo)}</div>
          </div>
        </Card>
      )
    }
  }
  return (
    <Card title={"Battery"} size={size}>
      <div className={"gauge"}>
        <NotAvailable />
      </div>
    </Card>
  )
}

export default Batteries
