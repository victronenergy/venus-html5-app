import React, { FC } from "react"
import { Modal } from "../../../ui/Modal"
import { translate } from "react-i18nify"
import { Message } from "../../../_elements/Message/Message"

interface Props {
  disabled: boolean
  onClose: () => void
  onClick: () => void
}

export const AutoStartStopModal: FC<Props> = ({ disabled, onClose, onClick }) => {

  const classes = "border-victron-darkGray-200 border rounded-md w-[95%] md:w-[40rem] scale-[0.7] h-short:scale-[1]"

  if (disabled) {
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
          <button onClick={onClose} className="w-full">
            {translate("common.close")}
          </button>
          <div className="w-0 h-10 my-2 border-r border-victron-darkGray-200" />
          <button onClick={onClick} className="w-full">
            {translate("common.enable")}
          </button>
        </Modal.Footer>
      </Modal.Frame>
    )
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
        <button onClick={onClose} className="w-full">
          {translate("common.close")}
        </button>
        <div className="w-0 h-10 my-2 border-r border-victron-darkGray-200" />
        <button onClick={onClick} className="w-full">
          {translate("common.disable")}
        </button>
      </Modal.Footer>
    </Modal.Frame>
  )
}
