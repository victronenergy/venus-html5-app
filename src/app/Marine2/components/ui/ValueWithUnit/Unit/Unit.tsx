import React, { FC } from "react"
import { unit } from "@m2Types/data/unit"

interface Props {
  unit?: unit
}

export const Unit: FC<Props> = ({ unit }) => {
  if (!unit) return null

  return <span className="text-content-secondary ml-0.5">{unit}</span>
}
