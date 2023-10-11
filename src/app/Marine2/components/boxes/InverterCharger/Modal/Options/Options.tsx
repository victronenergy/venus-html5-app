import { FC } from "react"
import { translate } from "react-i18nify"
import { SYSTEM_MODE } from "app/Marine2/utils/constants"
import RadioButton from "../../../../ui/RadioButton"

interface Props {
  modeForSubmission: number
  onChange: (arg: number) => void
}

export const Options: FC<Props> = ({ modeForSubmission, onChange }) => {
  const options = [
    { key: "common.on", value: SYSTEM_MODE.ON },
    { key: "common.off", value: SYSTEM_MODE.OFF },
    { key: "common.chargerOnly", value: SYSTEM_MODE.CHARGER_ONLY },
    { key: "common.inverterOnly", value: SYSTEM_MODE.INVERTER_ONLY },
  ]

  return (
    <div className="divide-y divide-victron-darkGray-200 text-base">
      {options.map((option) => (
        <label className="w-full flex justify-between items-center pb-4" onClick={() => onChange(option.value)}>
          <span>{translate(option.key)}</span>
          <RadioButton
            onChange={() => onChange(option.value)}
            selected={modeForSubmission === option.value}
            responsive={false}
          />
        </label>
      ))}
    </div>
  )
}
