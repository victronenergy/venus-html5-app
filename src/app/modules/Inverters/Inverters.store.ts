import { Store, StoreConfig } from "@datorama/akita"

export type InverterInstanceId = number | null | undefined

export interface InvertersState {
  inverters: InverterInstanceId[]
}

export const INVERTERS_STORE_NAME = "Inverters"

@StoreConfig({ name: INVERTERS_STORE_NAME })
export class InvertersStore extends Store<InvertersState> {
  constructor() {
    super({})
  }
}

export const invertersStore = new InvertersStore()
