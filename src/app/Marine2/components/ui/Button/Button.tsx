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
        "rounded-md px-4 py-1.5 border-2 whitespace-nowrap",
        {
          "bg-victron-blue/30 dark:bg-victron-blue-dark/30 border-victron-blue text-black dark:text-white cursor-pointer":
            !disabled,
          "bg-victron-gray/30 dark:bg-victron-gray-dark/30 border-victron-gray text-victron-gray dark:text-victron-gray-dark":
            disabled,
          "text-base": size === "lg",
          "text-sm": size === "md",
        },
        className
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
