import { FC } from "react"

interface Props {
  values: IValue[]
}

export interface IValue {
  label: string
  value?: string
}

export const AdditionalInformation: FC<Props> = ({ values }) => (
  <div className="flex flex-row mr-4 justify-start text-content-secondary min-w-0">
    {values.map(({ label, value }) => (
      <div key={label} className="flex flex-none flex-col mr-3 w-1/4 truncate">
        <span className="text-xs">{label}</span>
        {value && <div className="text-content-secondary">{value}</div>}
      </div>
    ))}
  </div>
)
