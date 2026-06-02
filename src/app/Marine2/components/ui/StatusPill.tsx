import React from "react"
import classnames from "classnames"

export type StatusPillVariant = "gray" | "green" | "yellow" | "red"

interface StatusPillProps {
  label: string
  variant: StatusPillVariant
}

const variantClasses: Record<StatusPillVariant, string> = {
  gray: "bg-surface-victronGray text-content-victronGray",
  green: "bg-surface-victronGreen text-content-victronGreen",
  yellow: "bg-surface-victronYellow text-content-victronYellow",
  red: "bg-surface-victronRed text-content-victronRed",
}

const StatusPill = (props: StatusPillProps) => {
  return (
    <span
      className={classnames(
        "px-2 py-0.5 text-2xs leading-none rounded-md inline-flex items-center",
        variantClasses[props.variant],
      )}
    >
      {props.label}
    </span>
  )
}

export default StatusPill
