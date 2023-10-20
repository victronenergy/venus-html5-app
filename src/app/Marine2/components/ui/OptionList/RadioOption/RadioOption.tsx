import { FC } from "react"
import RadioButton from "../../RadioButton"

interface Props {
  mode: number
  onChange: (arg: number) => void
  key: string
  value: number
}

export const RadioOption: FC<Props> = ({ mode, onChange, value, children }) => (
  <label className="w-full flex justify-between items-center py-4 first:pt-0 last:pb-0" onClick={() => onChange(value)}>
    <span>{children}</span>
    <RadioButton onChange={() => onChange(value)} selected={mode === value} responsive={false} />
  </label>
)
