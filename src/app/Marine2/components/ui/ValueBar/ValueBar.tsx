import { formatValue } from "../../../utils/formatters"

const ValueBar = ({ values, prefix }: Props) => {
  let useKw = false
  if (values.some((v) => v.unit === "W" && v.value && v.value > 1000)) {
    useKw = true
  }

  return (
    <div className={"border-victron-gray-200 border-t-2 text-victron-gray dark:text-victron-gray-500 px-2 -mx-2"}>
      {prefix && <div>{prefix}</div>}
      <div className={"flex justify-between"}>
        {values.map((v) => (
          <div>
            {v.value && useKw && v.unit === "W" ? formatValue(v.value / 1000) : formatValue(v.value)}
            <span className={"ml-px text-victron-gray-400"}>{v.unit}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface Props {
  values: { value?: number; unit: string }[]
  prefix?: string
}

export default ValueBar
