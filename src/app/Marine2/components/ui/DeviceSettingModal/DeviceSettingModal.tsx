import { Modal } from "../Modal"
import { translate } from "react-i18nify"
import React from "react"
import { observer } from "mobx-react"
import classnames from "classnames"

const DeviceSettingModal = ({ open, onClose, children, onSet, width = "md" }: Props) => {
  return (
    <Modal.Frame
      open={open}
      onClose={onClose}
      className={classnames(" border-victron-darkerGray border rounded-md", {
        "w-96": width === "md",
        "w-[40rem]": width === "lg",
      })}
    >
      <Modal.Body>
        <div className="flex flex-col">
          <div className="dark:text-white text-lg">
            {children}
            <div
              className={classnames("-ml-4 h-0 mt-3 border-b border-victron-darkerGray", {
                "w-96": width === "md",
                "w-[40rem]": width === "lg",
              })}
            />
            <div className={"flex flex-row justify-between -mb-2"}>
              <button onClick={onClose} className={"w-full -ml-4 -mb-2"}>
                {translate("common.close")}
              </button>
              <div className={"w-0 h-10 mt-2 border-r border-victron-darkerGray"} />
              <button onClick={onSet} className={"w-full -mr-4 -mb-2"}>
                {translate("common.set")}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal.Frame>
  )
}

interface Props {
  open?: boolean
  onClose: () => void
  onSet: () => void
  width?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export default observer(DeviceSettingModal)
