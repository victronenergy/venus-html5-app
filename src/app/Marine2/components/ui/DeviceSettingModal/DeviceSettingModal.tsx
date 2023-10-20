import { Modal } from "../Modal"
import { translate } from "react-i18nify"
import type { FC, ReactNode } from "react"
import { observer } from "mobx-react"

interface Props {
  title?: string
  subtitle?: string
  open?: boolean
  onClose: () => void
  onSet: () => void
  children: ReactNode
}

const DeviceSettingModal: FC<Props> = (props) => {
  const { title, subtitle } = props
  const { open, onClose, children, onSet } = props

  return (
    <Modal.Frame
      open={open}
      onClose={onClose}
      className="border-victron-darkGray-200 border rounded-md w-[95%] md:w-[40rem] scale-[0.7] h-short:scale-[1]"
    >
      <Modal.Body>
        <div className="mb-8">
          {title && <label className="block text-center text-sm">{title}</label>}
          {subtitle && <h3 className="block text-center text-base">{subtitle}</h3>}
        </div>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onClose} className="w-full">
          {translate("common.close")}
        </button>
        <div className="w-0 h-10 my-2 border-r border-victron-darkGray-200" />
        <button onClick={onSet} className="w-full">
          {translate("common.set")}
        </button>
      </Modal.Footer>
    </Modal.Frame>
  )
}

export default observer(DeviceSettingModal)
