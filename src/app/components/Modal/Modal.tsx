import "./Modal.scss"
import { FunctionComponent } from "react"
import { Card, SIZE_WIDE, ICON_CLOSE } from "../Card"

type ModalProps = {
  title: string
  onClose: Function
  cardProps?: any
}

export const Modal: FunctionComponent<ModalProps> = ({ title, onClose, children, cardProps }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (Array.from((e.target as HTMLDivElement).classList).includes("modal__background")) {
      onClose()
    }
  }

  return (
    <div className={"modal__background"} onClick={handleClick}>
      <Card title={title} size={SIZE_WIDE} icon={ICON_CLOSE} onIconClick={onClose} {...cardProps}>
        {children}
      </Card>
    </div>
  )
}

export default Modal
