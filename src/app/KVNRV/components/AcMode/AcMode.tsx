import React, { useState } from "react"

import { Card, SIZE_WIDE, ICON_SETTINGS, SIZE_SHORT } from "../../../components/Card"
import { AC_MODE, CRITICAL_MULTIPLIER, SHORE_POWER_CONF } from "../../utils/constants"
import NumericValue, { formatNumber } from "../../../components/NumericValue"
import { AcModeModal } from "./AcModeModal"

import "./AcMode.scss"
import { useAcMode, useActiveInValues, useActiveSource } from "@elninotech/mfd-modules"
import { useSendUpdate } from "../../modules"
import { normalizePower } from "../../utils/helpers"
import { NotAvailable } from "../NotAvailable"
import GaugeIndicator from "../../../components/GaugeIndicator"

export const acModeFormatter = (value: number) => {
  switch (value) {
    case AC_MODE.MODES.ON:
      return "On"
    case AC_MODE.MODES.OFF:
      return "Off"
    case AC_MODE.MODES.CHARGER_ONLY:
      return "Charger only"
    case AC_MODE.MODES.INVERTER_ONLY:
      return "Inverter only"
    default:
      return "--"
  }
}

export const AcMode = () => {
  const { mode, limit, productId, updateMode, updateLimit } = useAcMode()
  const { activeInput } = useActiveSource()
  const { current, frequency, voltage, power } = useActiveInValues()

  const inLimit = parseFloat(limit ?? "0")
  const powerMax = inLimit * (voltage && voltage[0] ? voltage[0] : 1) * CRITICAL_MULTIPLIER
  const normalizedPower = normalizePower(power && power[0] ? power[0] : 0, powerMax)
  useSendUpdate(normalizedPower, SHORE_POWER_CONF, "Shore Power")

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="ac_mode">
      <Card
        title={"Shore Power"}
        icon={ICON_SETTINGS}
        size={[SIZE_WIDE, SIZE_SHORT]}
        onIconClick={() => setModalOpen(true)}
        infoText={"Limit: " + formatNumber({ value: inLimit, unit: "A" })}
      >
        <div className="gauge">
          {(activeInput === 0 || activeInput === 1) && power ? (
            <GaugeIndicator value={power[0]} percent={normalizedPower} parts={SHORE_POWER_CONF.THRESHOLDS} unit={"W"} />
          ) : (
            <div className="not-available">No Shore Power</div>
          )}

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
            <div className={"info-bar__cell ac_mode__mode"} onClick={() => setModalOpen(true)}>
              {acModeFormatter(Number(mode))}
            </div>
          </div>
        </div>

        {modalOpen && (
          <AcModeModal
            mode={Number(mode)}
            limit={Number(limit)}
            onClose={() => setModalOpen(false)}
            productId={productId}
            updateMode={updateMode}
            updateLimit={updateLimit}
          />
        )}
      </Card>
    </div>
  )
}

export default AcMode
