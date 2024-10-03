import { BatteryState as BatteryType } from "@victronenergy/mfd-modules"

/*
  Push batteries with active_battery_service to the front.
  Then sort by state (charging(1) > discharging(2) > idle(0)), lastly by id (alphanumerically).
 */
export const sortBatteries = (batteries: BatteryType[]) =>
  batteries.slice().sort((a, b) => {
    // same active_battery_service
    if (a.active_battery_service === b.active_battery_service) {
      // sort by name (alphanumerically)
      return a.name.localeCompare(b.name)
    }
    // a has active_battery_service, a goes before b
    return a.active_battery_service ? -1 : 1
  })
