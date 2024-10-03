import { FC } from "react"
import { BatteryState } from "@victronenergy/mfd-modules"
import { ISize } from "@m2Types/generic/size"
import { BatteryValues } from "./BatteryValues/BatteryValues"
import { BatteryName } from "./BatteryName/BatteryName"
import { ProgressCircle } from "../ProgressCircle/ProgressCircle"

interface Props {
  battery: BatteryState
  boxSize: ISize
  electricalPowerIndicator: number
}

export const BatterySummary: FC<Props> = ({ battery, boxSize, electricalPowerIndicator }) => {
  const size = {
    width: boxSize.width - 32,
    height: boxSize.height - 32,
  }

  return (
    <div className="flex flex-col min-w-0 justify-center items-center w-full h-full">
      <ProgressCircle percentage={battery.soc ?? null} boxSize={size}>
        <BatteryValues battery={battery} boxSize={size} electricalPowerIndicator={electricalPowerIndicator} />
      </ProgressCircle>
      <BatteryName battery={battery} boxSize={size} />
    </div>
  )
}
