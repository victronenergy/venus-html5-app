import React from "react"

import { AC_CONF, Conf } from "../../constants/constants"
import { useAcLoads } from "../../../modules/AcLoads/AcLoads.provider"
import { Card, SIZE_SMALL } from "../Card"
import DonutIndicator from "../DonutIndicator"
import { NotAvailable } from "../NotAvailable"
import { CommonProps, STATUS_LEVELS } from "../Views/Metrics"
import NumericValue from "../../../components/NumericValue"

const sendUpdate = (percent: number, conf: Conf, part: string, addFunc: Function, removeFunc: Function) => {
  removeFunc(part)

  if (percent > conf.THRESHOLDS[0] && percent < conf.THRESHOLDS[0] + conf.THRESHOLDS[1]) {
    addFunc({ part, message: " too much power!", level: STATUS_LEVELS.WARNING })
  } else {
    addFunc({ part, message: " too much power!", level: STATUS_LEVELS.ALARM })
  }
}

export const AcLoads = (props: CommonProps) => {
  let { current, voltage, power, phases } = useAcLoads()

  let c = 0,
    v = 0,
    p = 0
  if (current && voltage && power) {
    c = current[0] || 0
    v = voltage[0] || 0
    p = power[0] || 0
  }

  let normalized_power = p / AC_CONF.MAX
  normalized_power = Math.max(Math.min(normalized_power, 1), 0)

  sendUpdate(normalized_power, AC_CONF, "AC Loads", props.addStatusUpdate, props.removeStatusUpdate)

  return (
    <div className="">
      <Card title={"AC Loads"} size={SIZE_SMALL}>
        <div className="gauge">
          {power ? (
            <DonutIndicator value={p} percent={normalized_power} parts={AC_CONF.THRESHOLDS} unit={"W"} />
          ) : (
            <NotAvailable />
          )}

          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>
              <NumericValue value={v} unit={"V"} precision={0} />
            </div>
            <div className={"info-bar__cell"}>
              <NumericValue value={c} unit={"A"} precision={0} />
            </div>
            <div className={"info-bar__cell"}>
              <NumericValue value={phases} unit={"Hz"} precision={0} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default React.memo(AcLoads)
