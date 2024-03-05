import { BATTERY } from "../../../constants/devices/batteries"
import { Battery as BatteryType } from "@victronenergy/mfd-modules"

/*
 Sort batteries by state (charging > discharging > idle) and within that by id.
 */
export const sortBatteries = (batteries: BatteryType[]) => batteries.slice()
  .sort((a, b) => {
    if (
      (a.state === BATTERY.CHARGING && b.state !== BATTERY.CHARGING) ||
      (a.state === BATTERY.DISCHARGING && b.state === BATTERY.IDLE) ||
      ((a.state || a.state === 0) && !b.state && b.state !== 0)
    )
      return -1

    if (
      (a.state !== BATTERY.CHARGING && b.state === BATTERY.CHARGING) ||
      (a.state === BATTERY.IDLE && b.state === BATTERY.DISCHARGING) ||
      (!a.state && a.state !== 0 && (b.state || b.state === 0))
    )
      return 1

    return +a.id - +b.id
  })
