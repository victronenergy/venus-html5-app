import { BATTERY } from "../../../constants"
import BatteryIcon from "../../../../images/icons/battery.svg"
import BatteryChargingIcon from "../../../../images/icons/battery-charging.svg"
import BatteryDischargingIcon from "../../../../images/icons/battery-discharging.svg"
import { responsiveBoxIconClasses } from "../../../constants/responsive-box-icon-classes"

export const batteryIconFor = function (state: number): JSX.Element {
  switch (state) {
    case BATTERY.CHARGING:
      return <BatteryChargingIcon className={responsiveBoxIconClasses} />
    case BATTERY.DISCHARGING:
      return <BatteryDischargingIcon className={responsiveBoxIconClasses} />
  }
  return <BatteryIcon className={responsiveBoxIconClasses} />
}
