import classnames from "classnames"
import React from "react"

interface Props {
  open?: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

const Frame: React.FC<Props> = ({ children, open = true, onClose, className }) => {
  return (
    <div
      className={classnames(
        "fixed inset-0 z-10 p-8 text-neutral-600 bg-neutral-100/70 dark:text-white dark:bg-victron-darkGray/70 items-center justify-center",
        `${open ? "flex" : "hidden"}` // control visibility via `open` attribute (or render conditionally)
      )}
      onClick={onClose}
    >
      <div className={classnames("absolute", className)} onClick={(e) => e.stopPropagation()}>
        <div className="overflow-hidden p-4 bg-white dark:bg-victron-darkGray rounded-md shadow-[0_8px_24px_-15px_rgba(0,0,0,0.75)]">
          {children}
        </div>
      </div>
    </div>
  )
}

const Head: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="block p-4">{children}</div>

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>

export const Modal = { Frame, Head, Body }
