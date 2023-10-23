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
  <div className="flex border-t-2 border-victron-gray dark:border-victron-gray-200 px-2">
    {prefix && <div className="w-[35px] bg-red-700 mr-4 text-victron-darkGray dark:text-victron-gray-500">{prefix}</div>}
    <div className="flex justify-between grow">
      {values.map((v, id) => (
        <ValueWithUnit
          key={id}
          value={v.value}
          unit={v.unit}
          hideDecimal={v.hideDecimal}
          forcePowerUnit={forcePowerUnit}
          className="min-w-[130px] bg-red-700 text-black dark:text-victron-gray-600 text-right"
          status={status}
        />
      ))}
    </div>
  </div>
)

export default ValueBar
