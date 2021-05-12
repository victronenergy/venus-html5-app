import React from "react"

import { Card, SIZE_BIG, ICON_SETTINGS } from "../../../components/Card"
import { CommonProps } from "../Views/Metrics"
import { AC_MODE } from "../../utils/constants"
import NumericValue from "../../../components/NumericValue"
import AcModeModal from "./AcModeModal"

import "./AcMode.scss"

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

type AcModeState = {
  mode: number
  inputLimit: number
  modalOpen: boolean
}

class AcMode extends React.Component<CommonProps, AcModeState> {
  constructor(props: CommonProps) {
    super(props)

    this.state = {
      mode: AC_MODE.MODES.CHARGER_ONLY,
      inputLimit: AC_MODE.LIMITS[0],
      modalOpen: false,
    }
  }

  onClose() {
    this.setState({ modalOpen: false })
  }

  onOpen() {
    this.setState({ modalOpen: true })
  }

  render() {
    return (
      <div className="">
        <Card title={"AC Mode"} icon={ICON_SETTINGS} size={SIZE_BIG} onIconClick={() => this.onOpen()}>
          <div className="indicator-main--small ac_mode">
            <div className="name">Input limit</div>
            <div>
              <NumericValue value={this.state.inputLimit} unit={"A"} precision={0} />
            </div>

            <div className="name">Mode</div>
            <div className={"ac_mode__mode"}>{acModeFormatter(this.state.mode)}</div>
          </div>
          {this.state.modalOpen && (
            <AcModeModal
              mode={this.state.mode}
              inputLimit={this.state.inputLimit}
              onClose={() => this.onClose()}
              onModeInput={(mode: number) => this.setState({ mode })}
              onLimitInput={(inputLimit: number) => this.setState({ inputLimit })}
            />
          )}
        </Card>
      </div>
    )
  }
}

export default AcMode
