import React, { FC } from "react"
import { Modal } from "app/Marine2/components/ui/Modal/Modal"
import { Message } from "../../../_elements/Message/Message"
import { AppViews } from "../../../../modules/AppViews"

interface Props {
  linkedView?: AppViews
  onClose: () => void
  infoText?: InfoText
}

export interface InfoText {
  title: string
  body: string
}

export const GeneratorStopInfo: FC<Props> = ({ linkedView, onClose, infoText }) => {

  if (linkedView || !infoText) {
    return null
  }
  {
    /*        {!linkedView && !!infoText && (
            <div className="-mr-3 p-3" onClick={openInfo}>
              <InfoIcon
                className="w-7 text-victron-blue dark:text-victron-blue-dark cursor-pointer outline-none"
                alt="Info"
              />
            </div>
          )}*/
  }
  return (
    <Modal.Frame open={true} onClose={onClose}>
      <Modal.Body>
        <Message variant="info" label="Fischer Panda Genset" title={infoText.title} text={infoText.body} />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onClose} className="w-full h-[60px]">
          Ok
        </button>
      </Modal.Footer>
    </Modal.Frame>
  )
}
