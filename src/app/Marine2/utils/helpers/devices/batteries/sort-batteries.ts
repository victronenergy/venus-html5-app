import { BATTERY } from "../../../constants/devices/batteries"
import { Battery as BatteryType } from "@victronenergy/mfd-modules"

/*
  Push batteries with active_battery_service to the front.
  Then sort by state (charging(1) > discharging(2) > idle(0)), lastly by id (alphanumerically).
 */
export const sortBatteries = (batteries: BatteryType[]) =>
  batteries.slice().sort((a, b) => {
    // same active_battery_service
    if (a.active_battery_service === b.active_battery_service) {
      // same state
      if (a.state === b.state) {
        // sort by id (alphanumerically)
        return a.id.localeCompare(b.id)
      }
      // different state
      if (a.state === BATTERY.CHARGING) {
        // a is charging, a goes before b
        return -1
      } else if (a.state === BATTERY.DISCHARGING && b.state !== BATTERY.CHARGING) {
        // a is discharging, b is not charging, a goes before b
        return -1
      }
      // b must go before a
      return 1
    }
    // a has active_battery_service, a goes before b
    return a.active_battery_service ? -1 : 1
  })
