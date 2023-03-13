import React, { ReactNode, useState } from "react"
import { Modal } from "../Modal"
import Button from "../Button"
import classnames from "classnames"

interface Props {
  children: ReactNode
  title?: string
  className?: string
}
const Frame = ({ children, title, className }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className={classnames(className)}>
        <Button onClick={() => setIsModalOpen(!isModalOpen)}>{title}</Button>
      </div>
      <Modal.Frame
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
        className="w-full max-w-sm"
      >
        <Modal.Body>{children}</Modal.Body>
      </Modal.Frame>
    </>
  )
}

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="text-sm">{children}</div>
const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col text-sm mb-2 dark:text-white md:mb-4 md-m:text-base">{children}</div>
)

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>

const SettingsPopup = { Frame, Header, Body, Footer }
export default SettingsPopup
