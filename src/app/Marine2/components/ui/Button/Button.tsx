import { ReactNode } from "react"
import classnames from "classnames"

interface Props {
  children: ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  disabled?: boolean
  size?: "lg" | "md"
}

const Button = ({ children, onClick, className, disabled, size = "lg", ...props }: Props) => {
  return (
    <button
      className={classnames(
        "rounded-md px-4 py-1.5 border-2 cursor-pointer whitespace-nowrap",
        {
          "bg-victron-blue/30 dark:bg-victron-blue-dark/30 border-victron-blue text-black dark:text-white": !disabled,
          "bg-victron-gray/30 dark:bg-victron-gray-dark/30 border-victron-gray": disabled,
          "text-lg": size === "lg",
          "text-md": size === "md",
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
