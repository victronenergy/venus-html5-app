import type { FC } from "react"
import { ValueWithUnit } from "@m2Types/generic/value-with-units"
import ValueBar from "../../ValueBar"
import { usePowerHysteresisFor } from "../../../../utils/hooks/use-power-hysteresis-for"

interface Props {
  values: ValueWithUnit[][]
  className?: string
}

export const BottomValues: FC<Props> = ({ values, className }) => {
  const unit = usePowerHysteresisFor(values)

  if (!values || values.length === 0) {
    return null
  }

  if (values.length === 1) {
    return (
      <div className={className}>
        {values.map((v, i) => (
          <ValueBar key={i} values={v} />
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      {values.map((v, i) => {
        const prefix = `L${i + 1}`
        return <ValueBar key={i} prefix={prefix} values={v} forcePowerUnit={unit} />
      })}
    </div>
  )
}
