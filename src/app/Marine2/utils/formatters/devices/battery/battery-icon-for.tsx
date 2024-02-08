import BatteryIcon from "../../../../images/icons/battery.svg"
import BatteryChargingIcon from "../../../../images/icons/battery-charging.svg"
import BatteryDischargingIcon from "../../../../images/icons/battery-discharging.svg"
import { responsiveBoxIcon } from "../../../helpers/classes/responsive-box-icon"
import { BATTERY } from "../../../constants/devices/batteries"

export const batteryIconFor = function (state: number): JSX.Element {
  switch (state) {
    case BATTERY.CHARGING:
      return <BatteryChargingIcon className={responsiveBoxIcon} />
    case BATTERY.DISCHARGING:
      return <BatteryDischargingIcon className={responsiveBoxIcon} />
  }
  return <BatteryIcon className={responsiveBoxIcon} />
}
