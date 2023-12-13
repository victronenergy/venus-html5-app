import { FC, ReactNode } from "react"
import ToggleSwitch from "../../ui/ToggleSwitch"
import classNames from "classnames"

interface Props {
  id: string
  toggle: () => void
  selected: boolean
  children: ReactNode
  size?: "lg" | "md"
  className?: string
}

export const ToggleSwitchButton: FC<Props> = ({ id, toggle, children, size = "lg", className, selected }) => {
  const classes = classNames(
    "flex justify-between items-center min-h-[2.375rem] border-2 border-victron-gray dark:border-victron-gray-200 text-black dark:text-white cursor-pointer rounded-md px-4 py-1.5",
    {
      "text-base min-h-[2.675rem]": size === "lg",
      "text-sm min-h-[2.375rem]": size === "md",
      [className as string]: className,
    }
  )

  return (
    <button className={classes} onClick={toggle}>
      {children}
      <ToggleSwitch id={id} selected={selected} />
    </button>
  )
}
