import { ValueWithUnit } from "../ValueWithUnit/ValueWithUnit"
import { ValueWithUnit as IValueWithUnit } from "@m2Types/generic/value-with-units"

interface Props {
  values: IValueWithUnit[]
  prefix?: string
}

const ValueBar = ({ values, prefix }: Props) => (
  <div className="border-victron-gray border-t-2 text-victron-darkGray dark:text-victron-gray-500 dark:border-victron-gray-200 px-2 -mx-2 flex">
    {prefix && <div className={"pr-[12px]"}>{prefix}</div>}
    <div className={"flex justify-between grow"}>
      {values.map((v, idx) => (
        <ValueWithUnit
          key={idx}
          value={v.value}
          unit={v.unit}
          hideDecimal={v.hideDecimal}
          className="text-black dark:text-victron-gray-600"
        />
      ))}
    </div>
  </div>
)

export default ValueBar
