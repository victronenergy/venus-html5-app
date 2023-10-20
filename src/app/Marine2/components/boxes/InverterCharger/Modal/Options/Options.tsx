import { FC } from "react"
import { translate } from "react-i18nify"
import { OptionList } from "../../../../ui/OptionList/OptionList"
import { inverterChargerOptions } from "../../../../../utils/constants/mode-options"
import { RadioOption } from "../../../../ui/OptionList/RadioOption/RadioOption"

interface Props {
  mode: number
  onChange: (arg: number) => void
}

export const Options: FC<Props> = ({ mode, onChange }) => (
  <OptionList>
    {inverterChargerOptions.map(({ key, value }) => (
      <RadioOption key={key} mode={mode} onChange={onChange} value={value}>
        {translate(key)}
      </RadioOption>
    ))}
  </OptionList>
)
