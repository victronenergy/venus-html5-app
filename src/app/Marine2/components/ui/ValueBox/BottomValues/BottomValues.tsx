import { ValueWithUnit } from "@m2Types/generic/value-with-units"
import ValueBar from "../../ValueBar"
import { FC } from "react"

interface Props {
  values: ValueWithUnit[][]
  className?: string
}

export const BottomValues: FC<Props> = ({ values, className }) => {
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
        return <ValueBar key={i} prefix={prefix} values={v} /> //  "L" + (i + 1)
      })}
    </div>
  )
}
