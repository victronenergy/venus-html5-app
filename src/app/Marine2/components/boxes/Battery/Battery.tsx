import { useState } from "react"
import classNames from "classnames"
import { Styles } from "./Styles"
import { ISize } from "@m2Types/generic/size"
import { ValueWithUnit } from "@m2Types/data/value-with-units"
import { BatteryState as BatteryType, useAppStore } from "@victronenergy/mfd-modules"
import { applyStyles, StylesType } from "app/Marine2/utils/media"
import Box from "../../ui/Box"
import ValueBar from "../../ui/ValueBar"
import ValueBox from "../../ui/ValueBox"
import { batteryStateFor } from "../../../utils/formatters/devices/battery/battery-state-for"
import { batteryIconFor } from "../../../utils/formatters/devices/battery/battery-icon-for"
import { responsiveBoxIcon } from "../../../utils/helpers/classes/responsive-box-icon"
import { colorFor } from "../../../utils/formatters/generic"
import BatteryIcon from "../../../images/icons/battery.svg"
import { temperatureValueFor } from "../../../utils/formatters/temperature/temperature-value-for"

interface Props {
  battery: BatteryType
  unit: "°C" | "°F"
}

const BatteryState = ({ battery, unit }: Props) => {
  const isSimpleBattery = !(battery.state || battery.state === 0)
  const [boxSize, setBoxSize] = useState<ISize>({ width: 0, height: 0 })
  const { temperatureUnit } = useAppStore()

  if (isSimpleBattery) {
    return (
      <ValueBox
        icon={<BatteryIcon className={responsiveBoxIcon} />}
        title={battery.name}
        unit="V"
        value={battery.voltage}
        bottomValues={[]}
      />
    )
  }

  const hasPercentage = battery.soc !== undefined && battery.soc !== null
  const color = hasPercentage ? colorFor(Math.round(battery.soc)) : "victron-gray"
  const colorClasses = classNames({
    "text-content-victronRed": color === "victron-red",
    "text-content-victronYellow": color === "victron-yellow",
    "text-content-victronGreen": color === "victron-green",
    "text-content-victronBlue": color === "victron-blue",
    "text-content-victronGray": color === "victron-gray",
  })

  const activeStyles: StylesType = applyStyles(boxSize, Styles)
  const bottomValues: ValueWithUnit[] = [
    { value: battery.voltage, unit: "V" },
    { value: battery.current, unit: "A" },
    { value: battery.power, unit: "W" },
  ]

  return (
    <Box title={battery.name} icon={batteryIconFor(battery.state)} getBoxSizeCallback={setBoxSize}>
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <div className={classNames(colorClasses, activeStyles?.value)}>
            {battery.soc ? Math.round(battery.soc) : (battery.soc ?? "--")}
            <span className="pl-0.5 opacity-70">%</span>
          </div>
          <div className={classNames("text-content-tertiary", activeStyles.valueSubtitle)}>
            <p>{batteryStateFor(battery.state, battery.bmsstate, battery.timetogo ?? null)}</p>
            {battery.temperature && (
              <p>
                {temperatureValueFor(battery.temperature, temperatureUnit)}
                <span className="text-content-tertiary">{unit}</span>
              </p>
            )}
          </div>
        </div>
        <div className={classNames("-mb-1", activeStyles.valueBars)}>
          <ValueBar values={bottomValues} />
        </div>
      </div>
    </Box>
  )
}

export default BatteryState
