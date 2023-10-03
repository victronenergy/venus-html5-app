import { FC } from "react"
import { translate } from "react-i18nify"

interface Props {
  values: {
    key: "coolant" | "winding" | "exhaust"
    value: number
  }[]
}

export const AdditionalInformation: FC<Props> = ({ values }) => (
  <div className="flex flex-row mr-4 justify-start text-victron-gray min-w-0">
    {values.map(({ key, value }) => (
      <div key={key} className="flex flex-none flex-col mr-3 w-1/3 truncate">
        <span>{translate(`generator.temperature.${key}`)}</span>
        <div className="text-victron-darkGray dark:text-white">{value}°</div>
      </div>
    ))}
  </div>
)
