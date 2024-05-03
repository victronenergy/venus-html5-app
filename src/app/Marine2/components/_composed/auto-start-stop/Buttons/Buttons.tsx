import React, { FC, useState } from "react"
import { translate } from "react-i18nify"
import Button from "../../../_elements/Button"
import { ToggleSwitchButton } from "../../../_elements/ToggleSwitchButton/ToggleSwitchButton"
import { formatStartStopFor } from "../../../../utils/formatters/general/start-stop/format-start-stop-for"
import { AutoStartStopModal } from "../../modals/auto-start-stop"
import { useUiStore } from "../../../../modules/Ui"

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

  const { openModalFor, toggleModalFor } = useUiStore()
  const [disabled, setDisabled] = useState(false) // dynamisch maken


  const clickHandler = () => {
    console.log("HOHO")

    openModalFor("startStopMode")

    //setDisabled(!disabled)
    //toggleModalFor("startStopMode")
  }

  return (
    <>
      <Button size="lg" className="w-full" disabled={false} onClick={() => console.log(true)}>
        {formatStartStopFor(0)}
      </Button>
      <ToggleSwitchButton id="toggleAutoStart" toggle={() => setDisabled(!disabled)} size="lg" className="w-full" selected={!disabled}>
        {translate("common.autoStart")}
      </ToggleSwitchButton>
    </>
  )
}
