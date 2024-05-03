import React, { FC } from "react"
import { Modal } from "../../../ui/Modal"
import { translate } from "react-i18nify"
import { Message } from "../../../_elements/Message/Message"
import { useUiStore } from "../../../../modules/Ui"
import { useAppStore } from "@victronenergy/mfd-modules"

export const AutoStartStopModal: FC = () => {
  const { modals, closeModalFor } = useUiStore()
  const { locked } = useAppStore()
  console.log('>_', modals["startStopMode"])
  if (!modals["startStopMode"]) return null

  const classes = "border-victron-darkGray-200 border rounded-md w-[95%] md:w-[40rem] scale-[0.7] h-short:scale-[1]"

  const enableHandler = () => {
    // Logic here
    closeModalFor("startStopMode")
  }

  //if (disabled) {
  if (locked) {
    return (
      <Modal.Frame open={true} onClose={() => console.log(false)} className={classes}>
        <Modal.Body>
          <Message
            variant="info"
            label="Fischer Panda Genset"
            title={translate("messages.enableAutostart.title")}
            text={translate("messages.enableAutostart.text")}
          />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => closeModalFor("startStopMode")} className="w-full">
            {translate("common.close")}
          </button>
          <div className="w-0 h-10 my-2 border-r border-victron-darkGray-200" />
          <button onClick={enableHandler} className="w-full">
            {translate("common.enable")}
          </button>
        </Modal.Footer>
      </Modal.Frame>
    )
  }

  const disableHandler = () => {
    // Logic here
    closeModalFor("startStopMode")
  }

  return (
    <Modal.Frame open={true} onClose={() => console.log(false)} className={classes}>
      <Modal.Body>
        <Message
          variant="warning"
          label="Fischer Panda Genset"
          title={translate("messages.disableAutostart.title")}
          text={translate("messages.disableAutostart.text")}
        />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => closeModalFor("startStopMode")} className="w-full">
          {translate("common.close")}
        </button>
        <div className="w-0 h-10 my-2 border-r border-victron-darkGray-200" />
        <button onClick={disableHandler} className="w-full">
          {translate("common.disable")}
        </button>
      </Modal.Footer>
    </Modal.Frame>
  )
}
