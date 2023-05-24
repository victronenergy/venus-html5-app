import { ReactNode } from "react"
import classnames from "classnames"

interface Props {
  children: ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  disabled?: boolean
  size?: "lg" | "md"
  variant?: "primary" | "transparent"
}

const Button = ({ children, onClick, className, disabled, size = "lg", variant = "primary", ...props }: Props) => {
  return (
    <button
      className={classnames(
        "px-4 py-1.5 whitespace-nowrap",
        {
          "rounded-md border-2": variant === "primary",
          "bg-victron-blue/30 dark:bg-victron-blue-dark/30 border-victron-blue text-black dark:text-white cursor-pointer":
            !disabled && variant === "primary",
          "bg-victron-gray/30 dark:bg-victron-gray-dark/30 border-victron-gray text-victron-gray dark:text-victron-gray-dark":
            disabled && variant === "primary",
          "bg-transparent text-black dark:text-white cursor-pointer": !disabled && variant === "transparent",
          "bg-transparent text-victron-gray dark:text-victron-gray-dark": disabled && variant === "transparent",
          "text-base min-h-[2.675rem]": size === "lg",
          "text-sm min-h-[2.375rem]": size === "md",
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
