import React, { useState } from "react"

import { Card, SIZE_WIDE, ICON_SETTINGS, SIZE_SHORT } from "../../../components/Card"
import { AC_MODE, SHORE_POWER_CONF } from "../../utils/constants"
import NumericValue, { formatNumber } from "../../../components/NumericValue"
import { AcModeModal } from "./AcModeModal"

import "./AcMode.scss"
import { useAcMode, useActiveInValues, useSendUpdate } from "../../../modules"
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
      return null
  }
}

export const AcMode = () => {
  const { mode, limit, updateMode, updateLimit } = useAcMode()
  const { current, frequency, voltage, power } = useActiveInValues()
  const normalizedPower = normalizePower(power && power[0] ? power[0] : 0, SHORE_POWER_CONF.MAX)
  useSendUpdate(normalizedPower, SHORE_POWER_CONF, "Shore Power")

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="ac_mode">
      <Card
        title={"AC Mode"}
        icon={ICON_SETTINGS}
        size={[SIZE_WIDE, SIZE_SHORT]}
        onIconClick={() => setModalOpen(true)}
        infoText={"Limit: " + formatNumber({ value: limit, unit: "A" })}
      >
        <div className="gauge">
          {power ? (
            <GaugeIndicator value={power[0]} percent={normalizedPower} parts={SHORE_POWER_CONF.THRESHOLDS} unit={"W"} />
          ) : (
            <NotAvailable />
          )}

          <div className={"info-bar"}>
            <div className={"info-bar__cell"}>
              <NumericValue value={voltage ? voltage[0] : undefined} unit={"V"} precision={0} />
            </div>
            <div className={"info-bar__cell"}>
              <NumericValue value={current ? current[0] : undefined} unit={"A"} precision={0} />
            </div>
            <div className={"info-bar__cell"}>
              <NumericValue value={frequency ? frequency[0] : undefined} unit={"Hz"} precision={0} />
            </div>
            <div className={"info-bar__cell ac_mode__mode"}>{acModeFormatter(Number(mode))}</div>
          </div>
        </div>

        {modalOpen && (
          <AcModeModal
            mode={Number(mode)}
            limit={Number(limit)}
            onClose={() => setModalOpen(false)}
            updateMode={updateMode}
            updateLimit={updateLimit}
          />
        )}
      </Card>
    </div>
  )
}

export default AcMode
