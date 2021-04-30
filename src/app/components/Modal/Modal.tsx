import CloseIcon from "../../images/SettingsIcon.svg"

import './Modal.scss'
import { FunctionComponent } from "react"
import { Card, SIZE_BIG, ICON_CLOSE } from "../../KVNRV/components/Card"

type ModalProps = {
  title: string
  onClose: Function
}

const Modal: FunctionComponent<ModalProps> = ({title, onClose, children}) => (
  <div className={"modal__background"}>
    <Card title={title} size={SIZE_BIG} icon={ICON_CLOSE} onIconClick={onClose}>
      {children}
    </Card>
  </div>
)

export default Modal
