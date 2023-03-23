import Box from "../../ui/Box"
import { Battery as BatteryType } from "@elninotech/mfd-modules"
import { batteryStateNameFormatter, colorForPercentageFormatter } from "../../../utils/formatters"
import { BATTERY } from "../../../utils/constants"
import BatteryChargingIcon from "../../../images/icons/battery-charging.svg"
import BatteryIcon from "../../../images/icons/battery.svg"
import BatteryDischargingIcon from "../../../images/icons/battery-discharging.svg"
import { translate } from "react-i18nify"
import classNames from "classnames"
import { applyStyles, BreakpointStylesType, StylesType } from "app/Marine2/utils/media"
import { useState } from "react"
import ValueBar from "../../ui/ValueBar"
import ValueBox from "../../ui/ValueBox"

const styles: BreakpointStylesType = {
  default: {
    value: "text-xl",
    valueSubtitle: "text-base",
    valueBar: "text-sm",
    valueBars: "text-sm",
  },
  "sm-s": {
    value: "text-3xl",
    valueSubtitle: "text-lg",
    valueBar: "text-sm",
    valueBars: "text-sm",
  },
  "md-s": {
    value: "text-3xl",
    valueSubtitle: "text-lg",
    valueBar: "text-lg",
    valueBars: "text-lg",
  },
  "md-m": {
    value: "text-4xl",
    valueSubtitle: "text-xl",
    valueBar: "text-xl",
    valueBars: "text-lg",
  },
}

const Battery = ({ battery }: Props) => {
  const isSimpleBattery = !(battery.state || battery.state === 0)
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  if (isSimpleBattery) {
    return (
      <ValueBox
        /* @ts-ignore */
        icon={<BatteryIcon className={"w-6"} />}
        title={battery.name}
        unit={"V"}
        value={battery.voltage}
        bottomValues={[]}
      ></ValueBox>
    )
  }

  const hasPercentage = battery.soc !== undefined && battery.soc !== null
  const color = hasPercentage ? colorForPercentageFormatter(Math.round(battery.soc)) : "victron-gray"
  const colorClasses = classNames({
    "text-victron-red dark:text-victron-red-dark": color === "victron-red",
    "text-victron-yellow dark:text-victron-yellow-dark": color === "victron-yellow",
    "text-victron-green dark:text-victron-green-dark": color === "victron-green",
    "text-victron-blue dark:text-victron-blue-dark": color === "victron-blue",
    "text-victron-gray dark:text-white": color === "victron-gray",
  })

  const activeStyles: StylesType = applyStyles(boxSize, styles)
  const bottomValues = [
    { value: battery.voltage, unit: "V" },
    { value: battery.current, unit: "A" },
    { value: battery.power, unit: "W" },
  ]

  return (
    <Box title={battery.name} icon={batteryStateIconFormatter(battery.state)} getBoxSizeCallback={setBoxSize}>
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <div className={classNames(colorClasses, activeStyles?.value)}>
            {battery.soc ? Math.round(battery.soc) : battery.soc ?? "--"}
            <span className={"pl-0.5 opacity-70"}>%</span>
          </div>
          <div className={classNames("text-victron-gray dark:text-victron-gray-500", activeStyles.valueSubtitle)}>
            <p>{batteryStateNameFormatter(translate, battery.state)}</p>
            <p>
              {battery.temperature ? Math.round(battery.temperature) : battery.temperature ?? "--"}
              <span className={"text-victron-gray-400"}>°C</span>
            </p>
          </div>
        </div>
        <div className={classNames("-mb-1", activeStyles.valueBars)}>
          <ValueBar values={bottomValues} />
        </div>
      </div>
    </Box>
  )
}

const batteryStateIconFormatter = function (state: number): JSX.Element {
  const className = "w-6"
  switch (state) {
    case BATTERY.CHARGING:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return <BatteryChargingIcon className={className} />
    case BATTERY.DISCHARGING:
      /* todo: fix types for svg */
      /* @ts-ignore */
      return <BatteryDischargingIcon className={className} />
  }
  /* todo: fix types for svg */
  /* @ts-ignore */
  return <BatteryIcon className={className} />
}
interface Props {
  battery: BatteryType
}

export default Battery
