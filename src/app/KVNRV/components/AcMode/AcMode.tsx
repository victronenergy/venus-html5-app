import React, { useState } from "react"

import { Card, SIZE_BIG, ICON_SETTINGS } from "../../../components/Card"
import { AC_MODE } from "../../utils/constants"
import NumericValue from "../../../components/NumericValue"
import { AcModeModal } from "./AcModeModal"

import "./AcMode.scss"
import { useAcMode } from "../../../modules"

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

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="">
      <Card title={"AC Mode"} icon={ICON_SETTINGS} size={SIZE_BIG} onIconClick={() => setModalOpen(true)}>
        <div className="indicator-main--small ac_mode">
          <div className="name">Input limit</div>
          <div>
            <NumericValue value={limit} unit={"A"} precision={0} />
          </div>

          <div className="name">Mode</div>
          <div className={"ac_mode__mode"}>{acModeFormatter(Number(mode))}</div>
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
