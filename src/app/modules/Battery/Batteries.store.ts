import { Store, StoreConfig } from "@datorama/akita"

export type BatteryId = number | null | undefined

export interface BatteriesState {
  batteries: BatteryId[]
}

export const BATTERIES_STORE_NAME = "batteries"

@StoreConfig({ name: BATTERIES_STORE_NAME })
export class BatteriesStore extends Store<BatteriesState> {
  constructor() {
    super({})
  }
}

export const batteriesStore = new BatteriesStore()
