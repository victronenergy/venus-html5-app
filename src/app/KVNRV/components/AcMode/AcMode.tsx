import React, { useState } from "react"

import { Card, SIZE_WIDE, SIZE_SHORT } from "../../../components/Card"
import { AC_MODE, CRITICAL_MULTIPLIER, SHORE_POWER_CONF } from "../../utils/constants"
import NumericValue, { formatNumber } from "../../../components/NumericValue"
import { AcModeModal } from "./AcModeModal"

import "./AcMode.scss"
import { useAcMode, useActiveInValues, useActiveSource } from "@victronenergy/mfd-modules"
import { useSendUpdate } from "../../modules"
import { normalizePower } from "../../utils/helpers"
import { observer } from "mobx-react"
import { KVNGauge } from "../KVNGauge"
import { Translate } from "react-i18nify"
import RIcon from "../../../../images/icons/R.svg"

export const acModeFormatter = (value: number) => {
  switch (value) {
    case AC_MODE.MODES.ON:
      return "on"
    case AC_MODE.MODES.OFF:
      return "off"
    case AC_MODE.MODES.CHARGER_ONLY:
      return "chargerOnly"
    case AC_MODE.MODES.INVERTER_ONLY:
      return "inverterOnly"
    default:
      return "emptyBar"
  }
}

export const AcMode = observer(() => {
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
      <Card title={<Translate value="widgets.shorePower" />} size={[SIZE_WIDE, SIZE_SHORT]}>
        <div className="ac-container">
          <div className="ac-actions">
            <div className="action">
              <span className="name">
                <Translate value="common.mode" />
              </span>
              <button onClick={() => setModalOpen(true)} className="btn">
                <div className="action-btn-content">
                  <Translate value={`common.${acModeFormatter(+mode)}`} /> <img src={RIcon} alt="right arrow" />
                </div>
              </button>
            </div>
            <div className="action">
              <span className="name">
                <Translate value="common.limit" />
              </span>
              <button onClick={() => setModalOpen(true)} className="btn">
                <div className="action-btn-content">
                  {formatNumber({ value: inLimit, unit: "A" })} <img src={RIcon} alt="right arrow" />
                </div>
              </button>
            </div>
          </div>
          <div className="gauge">
            {(activeInput === 0 || activeInput === 1) && power ? (
              <KVNGauge value={power[0]} percent={normalizedPower} parts={SHORE_POWER_CONF.THRESHOLDS} unit={"W"} />
            ) : (
              <div className="not-available">
                <Translate value="common.noShorePower" />
              </div>
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
})

export default AcMode
