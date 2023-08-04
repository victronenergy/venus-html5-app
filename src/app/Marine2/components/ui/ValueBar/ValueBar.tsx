import { formatValue } from "../../../utils/formatters"

const ValueBar = ({ values, prefix }: Props) => {
  let useKw = false
  if (values.some((v) => v.unit === "W" && v.value && v.value > 1000)) {
    useKw = true
  }

  return (
    <div
      className={
        "border-victron-gray border-t-2 text-victron-darkGray dark:text-victron-gray-500 dark:border-victron-gray-200 px-2 -mx-2 flex"
      }
    >
      {prefix && <div className={"w-10"}>{prefix}</div>}
      <div className={"flex justify-between grow"}>
        {values.map((v, idx) => (
          <div key={idx} className="text-black dark:text-victron-gray-500">
            {v.value && useKw && v.unit === "W"
              ? formatValue(v.value / 1000)
              : formatValue(v.value, v.hideDecimal ? 0 : 1)}
            <span className={"ml-px text-victron-gray-400 dark:text-victron-gray-400"}>{v.unit}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface Props {
  values: { value?: number; unit: string; hideDecimal?: boolean }[]
  prefix?: string
}

export default ValueBar
