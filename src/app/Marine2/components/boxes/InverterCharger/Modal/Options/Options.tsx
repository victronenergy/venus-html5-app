import { FC } from "react"
import { translate } from "react-i18nify"
import { OptionList } from "../../../../ui/OptionList/OptionList"
import { RadioOption } from "../../../../ui/OptionList/RadioOption/RadioOption"
import { INVERTER_CHARGER_OPTIONS } from "../../../../../utils/constants/devices/inverters"

interface Props {
  mode: number
  onChange: (arg: number) => void
}

export const Options: FC<Props> = ({ mode, onChange }) => (
  <OptionList>
    {INVERTER_CHARGER_OPTIONS.map(({ key, value }) => (
      <RadioOption key={key} mode={mode} onChange={onChange} value={value}>
        {translate(key)}
      </RadioOption>
    ))}
  </OptionList>
)
