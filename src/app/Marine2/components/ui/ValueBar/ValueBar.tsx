import { ValueWithUnit } from "../ValueWithUnit/ValueWithUnit"
import { ValueWithUnit as IValueWithUnit } from "@m2Types/data/value-with-units"
import { TForcePowerUnit } from "@m2Types/data/force-power-unit"
import { TStatus } from "@m2Types/data/status"

interface Props {
  values: IValueWithUnit[]
  prefix?: string
  forcePowerUnit?: TForcePowerUnit
  status?: TStatus
}

const ValueBar = ({ values, prefix, forcePowerUnit, status }: Props) => (
  <div className="border-victron-gray border-t-2 text-victron-darkGray dark:text-victron-gray-500 dark:border-victron-gray-200 px-2 -mx-2 flex">
    {prefix && <div className="pr-[12px]">{prefix}</div>}
    <div className="flex justify-between grow">
      {values.map((v, id) => (
        <ValueWithUnit
          key={id}
          value={v.value}
          unit={v.unit}
          hideDecimal={v.hideDecimal}
          forcePowerUnit={forcePowerUnit}
          className="text-black dark:text-victron-gray-600"
          status={status}
        />
      ))}
    </div>
  </div>
)

export default ValueBar
