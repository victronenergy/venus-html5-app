import { FC } from "react"

interface Props {
  values: IValue[]
}

interface IValue {
  label: string
  value?: string
}

export const AdditionalInformation: FC<Props> = ({ values }) => (
  <div className="flex flex-row mr-4 justify-start text-victron-gray min-w-0">
    {values.map(({ label, value }) => (
      <div key={label} className="flex flex-none flex-col mr-3 w-1/3 truncate">
        <span className="text-xs">{label}</span>
        {value && <div className="text-victron-darkGray dark:text-white">{value}</div>}
      </div>
    ))}
  </div>
)
