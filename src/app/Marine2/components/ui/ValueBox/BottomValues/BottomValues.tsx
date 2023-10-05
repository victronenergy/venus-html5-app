import type { FC } from "react"
import { ValueWithUnit } from "@m2Types/data/value-with-units"
import ValueBar from "../../ValueBar"
import { usePowerHysteresisFor } from "../../../../utils/hooks/use-power-hysteresis-for"
import { TStatus } from "@m2Types/data/status"

interface Props {
  values: ValueWithUnit[][]
  className?: string
  status?: TStatus
}

export const BottomValues: FC<Props> = ({ values, className, status }) => {
  const unit = usePowerHysteresisFor(values)

  if (values.length === 1) {
    return (
      <div className={className}>
        {values.map((v, i) => (
          <ValueBar key={i} values={v} status={status} />
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      {values.map((v, i) => {
        const prefix = `L${i + 1}`
        return <ValueBar key={i} prefix={prefix} values={v} forcePowerUnit={unit} status={status} />
      })}
    </div>
  )
}
