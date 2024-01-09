import React, { FC, useState } from "react"
import { translate } from "react-i18nify"
import Button from "../../../_elements/Button"
import { ToggleSwitchButton } from "../../../_elements/ToggleSwitchButton/ToggleSwitchButton"
import { formatStartStopFor } from "../../../../utils/formatters/general/start-stop/format-start-stop-for"
import { AutoStartStopModal } from "../../modals/auto-start-stop"

interface Props {
  title: string
  statusCode?: number
  manualStart?: number
  autoStart: number
  updateManualMode: Function
  updateAutoMode: Function
  isAutoStartDisabled: boolean
}

export const Buttons: FC<Props> = ({}) => {
  const [showModal, setShowModal] = useState(false) // naar global state? modal systeem.
  const [disabled, setDisabled] = useState(false) // dynamisch maken

  const clickHandler = () => {
    setDisabled(!disabled)
    setShowModal(!showModal)
  }

  return (
    <>
      <Button size="lg" className="w-full" disabled={false} onClick={() => console.log(true)}>
        {formatStartStopFor(0)}
      </Button>
      <ToggleSwitchButton
        id="toggleAutoStart"
        toggle={() => setShowModal(!showModal)}
        size="lg"
        className="w-full"
        selected={!disabled}
      >
        {translate("common.autoStart")}
      </ToggleSwitchButton>

      {showModal && (
        <AutoStartStopModal disabled={disabled} onClose={() => setShowModal(!showModal)} onClick={clickHandler} />
      )}
    </>
  )
}
