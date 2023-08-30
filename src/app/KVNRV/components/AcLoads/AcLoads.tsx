import React, { useEffect, useState } from "react"

import { useAcLoads, useAcMode, useSystemState } from "@victronenergy/mfd-modules"
import { Card, SIZE_NARROW, SIZE_SHORT } from "../../../components/Card"
import { normalizePower } from "../../utils/helpers"
import { AC_CONF, AC_MODE, CRITICAL_MULTIPLIER, WidgetConfiguration } from "../../utils/constants"
import NumericValue from "../../../components/NumericValue"
import { NotAvailable } from "../NotAvailable"
import { useSendUpdate } from "../../modules"
import { Translate } from "react-i18nify"
import { observer } from "mobx-react"
import { KVNGauge } from "../KVNGauge"

const inverterPeakPower = 3000
const inverterContinuousPower = 2000
const inverterCautionPower = 1400

const acLimit = (inverterMode: number, inPowerLimit: number, systemState: number, voltage: number) => {
  const outPowerLimit = 30 * 120
  let barMax = 0,
    overload = 0,
    caution = 0

  // Inverter Only - only multi contribution
  if (inverterMode === 2 || systemState === 9) {
    barMax = inverterPeakPower
    overload = inverterContinuousPower
    caution = inverterCautionPower
  }
  // Charger Only - only AC input contribution
  else if (inverterMode === 1) {
    barMax = inPowerLimit * voltage
    overload = inPowerLimit * voltage
    caution = inPowerLimit * voltage * 0.8
  }
  // On - AC input + multi contribution
  else if (inverterMode === 3 && systemState >= 3) {
    barMax = inPowerLimit + inverterPeakPower
    overload = inPowerLimit + inverterContinuousPower
    caution = inPowerLimit + inverterCautionPower
  }
  // inverter is off or undefined - no AC output
  else {
    barMax = 1
    overload = 1
    caution = 1
  }
  // apply system output limit
  if (overload > outPowerLimit) {
    caution = outPowerLimit * 0.8
    overload = outPowerLimit
    barMax = outPowerLimit
  }

  barMax = barMax * CRITICAL_MULTIPLIER
  let green = caution / barMax
  let yellow = overload / barMax - green
  let red = 1 - (yellow + green)

  return { ...AC_CONF, MAX: barMax, THRESHOLDS: [green, yellow, red] } as WidgetConfiguration
}

export const AcLoads = observer(() => {
  const { state } = useSystemState()
  const { mode, limit } = useAcMode()
  const { current, voltage, power, frequency } = useAcLoads()
  const [config, setConfig] = useState<WidgetConfiguration>(AC_CONF)

  const inLimit = Number(limit)
  const inMode = Number(mode)

  useEffect(() => {
    setConfig(acLimit(inMode, isNaN(inLimit) ? AC_MODE.LIMITS_US[0] : inLimit, state, voltage ? voltage[0] : 1))
  }, [inMode, inLimit, state, voltage])

  const normalizedPower = normalizePower(power && power[0] ? power[0] : 0, config.MAX)
  useSendUpdate(normalizedPower, config, "AC Loads")

  return (
    <Card title={<Translate value="widgets.acLoads" />} size={[SIZE_SHORT, SIZE_NARROW]}>
      <div className="gauge">
        {!isNaN(inMode) && inMode !== AC_MODE.MODES.OFF && power ? (
          <>
            <KVNGauge value={power[0] ?? 0} percent={normalizedPower} parts={config.THRESHOLDS} unit={"W"} />

            <div className={"info-bar"}>
              <div className={"info-bar__cell"}>
                <NumericValue value={voltage ? voltage[0] : undefined} unit={"V"} precision={0} />
              </div>
              <div className={"info-bar__cell"}>
                <NumericValue value={current ? current[0] : undefined} unit={"A"} precision={1} />
              </div>
              <div className={"info-bar__cell"}>
                <NumericValue value={frequency ? frequency[0] : undefined} unit={"Hz"} precision={0} />
              </div>
            </div>
          </>
        ) : (
          <NotAvailable />
        )}
      </div>
    </Card>
  )
})

export default AcLoads
