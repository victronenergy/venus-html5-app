import classnames from "classnames"
import type { FC, ReactNode } from "react"

interface Props {
  open?: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

const Frame: FC<Props> = ({ children, open = true, onClose, className }) => {
  const classes = classnames(
    "fixed inset-0 z-10 p-8 text-neutral-600 modal dark:text-white items-center justify-center",
    `${open ? "flex" : "hidden"}` // control visibility via `open` attribute (or render conditionally)
  )
  return (
    <div className={classes} onClick={onClose}>
      <div className={classnames("absolute", className)} onClick={(e) => e.stopPropagation()}>
        <div className="overflow-hidden pb-2 bg-victron-gray-900 dark:bg-victron-darkGray rounded-md shadow-[0_8px_24px_-15px_rgba(0,0,0,0.75)]">
          {children}
        </div>
      </div>
    </div>
  )
}

const Head: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={classnames("block p-4", className)}>{children}</div>
)

const Body: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const classes = classnames("  dark:text-white", {
    className: className,
  })
  return <div className={classes}>{children}</div>
}

const Content: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const classes = classnames("px-4 md:px-10 lg:px-16 pt-6 pb-12", {
    className: className,
  })
  return <div className={classes}>{children}</div>
}

export const Modal = { Frame, Head, Body, Content }
