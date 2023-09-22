import { Modal } from "../Modal"
import { translate } from "react-i18nify"
import type { FC, ReactNode } from "react"
import { observer } from "mobx-react"
import classnames from "classnames"

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
      className="border-victron-darkGray-200 border rounded-md w-[95%] md:w-[40rem]"
    >
      <Modal.Body>
        <Modal.Content>
          <div className="mb-8">
            {title && <label className="block text-center text-sm">{title}</label>}
            {subtitle && <h3 className="block text-center text-base">{subtitle}</h3>}
          </div>
          {children}
        </Modal.Content>
        <div className="flex flex-row justify-between border-t border-victron-darkGray-200 text-base">
          <button onClick={onClose} className="w-full -ml-4 -mb-2">
            {translate("common.close")}
          </button>
          <div className="w-0 h-10 mt-2 border-r border-victron-darkGray-200" />
          <button onClick={onSet} className="w-full -mr-4 -mb-2">
            {translate("common.set")}
          </button>
        </div>
      </Modal.Body>
    </Modal.Frame>
  )
}

export default observer(DeviceSettingModal)
