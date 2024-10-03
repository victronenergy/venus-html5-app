import { BatteryState as BatteryType } from "@victronenergy/mfd-modules"

/*
  We show only batteries with state data on the overview, but if we don't
  have any we will show any batteries.
 */
export const batteriesForOverview = (batteries: BatteryType[]) => {
  const withStateCount = batteries.filter((b) => b.state || b.state === 0).length
  if (withStateCount === 0) {
    return batteries
  }
  return batteries.slice(0, withStateCount)
}
