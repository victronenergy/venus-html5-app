import { FC } from "react"
import { translate } from "react-i18nify"
import { inverterOptionsFor } from "../../../../../utils/helpers/devices/inverter-options-for"
import { OptionList } from "../../../../ui/OptionList/OptionList"
import { RadioOption } from "../../../../ui/OptionList/RadioOption/RadioOption"

interface Props {
  mode: number
  onChange: (arg: number) => void
  isVebus: boolean
}

export const Options: FC<Props> = ({ mode, onChange, isVebus }) => {
  const options = inverterOptionsFor(isVebus)

  return (
    <OptionList>
      {options.map(({ key, value }) => (
        <RadioOption key={key} mode={mode} onChange={onChange} value={value}>
          {translate(key)}
        </RadioOption>
      ))}
    </OptionList>
  )
}
