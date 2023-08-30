import { Card, SIZE_SHORT } from "../../../components/Card"

import { BATTERY_STATE } from "../../../utils/constants"
import { useBattery } from "@victronenergy/mfd-modules"
import { useSendUpdate } from "../../modules"
import NumericValue, { formatNumber } from "../../../components/NumericValue"
import { NotAvailable } from "../NotAvailable"

import "./Battery.scss"
import { BATTERY_CONF, CRITICAL_MULTIPLIER, STATUS_LEVELS, STATUS_LEVELS_MSG } from "../../utils/constants"
import { normalizePower } from "../../utils/helpers"
import { Footer } from "../../../components/Card/Card"
import { translate, Translate } from "react-i18nify"
import { observer } from "mobx-react"
import { KVNGauge } from "../KVNGauge"

const batteryStateFormatter = (value: number) => {
  switch (value) {
    case BATTERY_STATE.CHARGING:
      return "charging"
    case BATTERY_STATE.DISCHARGING:
      return "discharging"
    case BATTERY_STATE.IDLE:
      return "idle"
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
    if (days) time.push(`${days} ${translate("common.days")}`)
    if (hours) time.push(`${hours} ${translate("common.hours")}`)
    if (minutes) time.push(`${minutes} ${translate("common.minutes")}`)
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

export const Batteries = observer(({ size }: BatteryProps) => {
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
        <Card title={<Translate value="widgets.battery" />} size={size} footer={footer}>
          <div className={"battery"}>
            <div className={"battery__group " + size}>
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
              <div className={"indicator-main" + (size.includes(SIZE_SHORT) ? "--small" : "")}>
                <div>
                  <NumericValue value={battery.soc} unit="%" defaultValue={" - "} precision={1} />
                  <br />
                </div>
                {batteryStateLabel && (
                  <div className="name">
                    <Translate value={`common.${batteryStateLabel}`} />
                  </div>
                )}
              </div>

              <div className="indicator-right">
                <div className="indicator">
                  <span className="name">
                    <Translate value="common.voltage" />
                  </span>
                  <NumericValue value={battery.voltage} unit="V" defaultValue={" - "} precision={2} />
                </div>
                <div className="indicator indicator-current">
                  <span className="name">
                    <Translate value="common.current" />
                  </span>
                  <NumericValue value={battery.current} unit="A" defaultValue={" - "} precision={1} />
                </div>
              </div>
            </div>
          </div>
          <div className={"indicator remaining"}>
            <div className={"name"}>
              <Translate value="common.remainingTime" />
            </div>
            <div className={"value"}>{batteryTimeToGoFormatter(battery.timetogo)}</div>
          </div>
          <div className="battery__gauge gauge-double">
            <span className="gauge-label gauge-label--left">
              <Translate value="common.discharge" />
            </span>
            <div className="double-gauges">
              <KVNGauge
                showNeedle={battery.power <= 0}
                percent={battery.power <= 0 ? 1 - Math.abs(normalizedPower) : 1}
                from={-1 * Math.PI}
                to={Math.PI / 2}
                inverse
                className="glue-gauges"
                parts={BATTERY_CONF.THRESHOLDS}
                showText={false}
              >
                <>
                  <div className="power-indicator">
                    {formatNumber({ unit: "W", value: Math.abs(battery.power) })?.toString()}
                  </div>
                </>
              </KVNGauge>
              <KVNGauge
                showNeedle={battery.power > 0}
                className="glue-gauges"
                percent={battery.power > 0 ? normalizedPower : 0}
                from={(-1 * Math.PI) / 2}
                to={Math.PI / 2}
                parts={BATTERY_CONF.THRESHOLDS}
                showText={false}
              />
            </div>
            <span className="gauge-label gauge-label--right">
              <Translate value="common.charge" />
            </span>
          </div>
        </Card>
      )
    }
  }
  return (
    <Card title={<Translate value="widgets.battery" />} size={size}>
      <div className={"gauge"}>
        <NotAvailable />
      </div>
    </Card>
  )
})

export default Batteries
