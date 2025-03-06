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
          "bg-surface-victronBlue border-content-victronBlue text-content-primary cursor-pointer":
            !disabled && variant === "primary",
          "bg-surface-victronGray border-content-victronGray text-content-tertiary": disabled && variant === "primary",
          "bg-transparent text-content-primary cursor-pointer": !disabled && variant === "transparent",
          "bg-transparent text-content-tertiary": disabled && variant === "transparent",
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
