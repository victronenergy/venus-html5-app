import React, { FC } from "react"
import { unit } from "@m2Types/generic/unit"
import { ValueWithUnit } from "../../ValueWithUnit/ValueWithUnit"

interface Props {
  value?: number
  unit?: unit
  subtitle?: string
  className?: string
}

export const Heading: FC<Props> = ({ value, unit, subtitle, className }) => {
  if (!value && !subtitle) {
    return <div className={className}>--</div>
  }

  if (subtitle) {
    return <div className={className}>{subtitle}</div>
  }

  return <ValueWithUnit value={value} unit={unit} className={className} />
}
