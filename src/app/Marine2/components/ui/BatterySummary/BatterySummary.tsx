import ProgressCircle from "../../../components/ui/ProgressCircle"
import { batteryNameFor } from "../../../utils/formatters/devices/battery/battery-name-for"
import { formatValue } from "../../../utils/formatters/generic"
import { Battery } from "@victronenergy/mfd-modules"
import classNames from "classnames"
import { applyStyles } from "../../../utils/media"
import { ISize } from "@m2Types/generic/size"
import { Styles } from "./Styles"

interface Props {
  battery: Battery
  boxSize: ISize
}

export const BatterySummary: FC<Props> = ({ battery, boxSize }) => {
  const size = {
    width: boxSize.width - 32,
    height: boxSize.height - 32,
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <ProgressCircle percentage={battery.soc ?? null} boxSize={size}>
        <BatteryValues battery={battery} boxSize={size} />
      </ProgressCircle>
      <div className={classNames("truncate mt-2 text-center", activeStyles.name)}>{battery.name}</div>
    </div>
  )
}
