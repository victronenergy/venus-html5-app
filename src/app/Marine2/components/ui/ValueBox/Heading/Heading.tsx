import React, { FC } from "react"
import { unit } from "@m2Types/data/unit"
import { ValueWithUnit } from "../../ValueWithUnit/ValueWithUnit"
import { TStatus } from "@m2Types/data/status"

interface Props {
  value?: number
  unit?: unit
  subtitle?: string
  className?: string
  status?: TStatus
}

export const Heading: FC<Props> = ({ value, unit, subtitle, className, status }) => {
  if (subtitle) {
    return <div className={className}>{subtitle}</div>
  }

  return <ValueWithUnit value={value} unit={unit} className={className} status={status} />
}
