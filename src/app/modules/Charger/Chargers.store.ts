import { Store, StoreConfig } from "@datorama/akita"

export type ChargerInstanceId = number | null | undefined

export interface ChargersState {
  chargers: ChargerInstanceId[]
}

export const CHARGERS_STORE_NAME = "Chargers"

@StoreConfig({ name: CHARGERS_STORE_NAME })
export class ChargersStore extends Store<ChargersState> {
  constructor() {
    super({})
  }
}

export const chargersStore = new ChargersStore()
