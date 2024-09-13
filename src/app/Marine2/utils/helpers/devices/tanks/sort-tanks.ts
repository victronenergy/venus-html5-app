import { TankState } from "@victronenergy/mfd-modules"

/*
  Sort by fluidType, if same then by instance
 */
export const sortTanks = (tanks: TankState[]) =>
  tanks.slice().sort((a, b) => {
    let sortOrder = a.fluidType - b.fluidType
    return sortOrder === 0 ? a.instance - b.instance : sortOrder
  })
