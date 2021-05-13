import { Store, StoreConfig } from "@datorama/akita"

export type TankInstanceId = number | null | undefined

export interface TanksState {
  tanks: TankInstanceId[]
}

export const TANKS_STORE_NAME = "tanks"

@StoreConfig({ name: TANKS_STORE_NAME })
export class TanksStore extends Store<TanksState> {
  constructor() {
    super({})
  }
}

export const tanksStore = new TanksStore()
