import classNames from "classnames"
import type { FC, ReactNode } from "react"
import { ModalVariant } from "@m2Types/generic/modal"

interface Props {
  open?: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

const Frame: FC<Props> = ({ children, open = true, onClose, className }) => {
  const classes = classNames(
    "fixed inset-0 z-10 p-4 md:p-8 text-neutral-600 modal dark:text-white items-center justify-center",
    `${open ? "flex" : "hidden"}` // control visibility via `open` attribute (or render conditionally)
  )
  return (
    <div className={classes} onClick={onClose}>
      <div className={classNames("absolute", className)} onClick={(e) => e.stopPropagation()}>
        <div className="overflow-hidden bg-victron-gray-900 dark:bg-victron-darkGray rounded-md shadow-[0_8px_24px_-15px_rgba(0,0,0,0.75)]">
          {children}
        </div>
      </div>
    </div>
  )
}

interface BodyProps {
  children: ReactNode
  className?: string
  variant?: ModalVariant
}

const Body: FC<BodyProps> = ({ children, className, variant = "default" }) => {
  const classes = classNames("dark:text-white", {
    "px-4 md:px-10 lg:px-16 pt-6 pb-6 md:pb-10": variant === "default",
    "p-4": variant === "popUp",
    className: className,
  })
  return <div className={classes}>{children}</div>
}

const Footer: FC = ({ children }) => (
  <div className="flex justify-between border-t border-victron-darkGray-200 text-base">{children}</div>
)

export const Modal = { Frame, Body, Footer }
