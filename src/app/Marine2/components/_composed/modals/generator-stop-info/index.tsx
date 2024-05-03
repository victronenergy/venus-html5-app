import React, { FC } from "react"
import { Modal } from "app/Marine2/components/ui/Modal/Modal"
import { Message } from "../../../_elements/Message/Message"
import { useUiStore } from "../../../../modules/Ui"

export const GeneratorStopInfo: FC = () => {
  const { modals, closeModalFor } = useUiStore()

  if (!modals["startStopMode"]) return null

  return (
    <Modal.Frame open={true} onClose={() => closeModalFor("generatorStopInfo")}>
      <Modal.Body>
        <Message variant="info" label="Fischer Panda Genset" title="You sure?" text="You are about to stop the generator. Are you sure?" />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => closeModalFor("generatorStopInfo")} className="w-full h-[60px]">
          Ok
        </button>
      </Modal.Footer>
    </Modal.Frame>
  )
}
