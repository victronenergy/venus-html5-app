import "./Modal.scss"
import { FunctionComponent } from "react"
import { Card, SIZE_WIDE, ICON_CLOSE } from "../Card"

type ModalProps = {
  title: string
  onClose: Function
}

export const Modal: FunctionComponent<ModalProps> = ({ title, onClose, children }) => (
  <div className={"modal__background"}>
    <Card title={title} size={SIZE_WIDE} icon={ICON_CLOSE} onIconClick={onClose}>
      {children}
    </Card>
  </div>
)

export default Modal
