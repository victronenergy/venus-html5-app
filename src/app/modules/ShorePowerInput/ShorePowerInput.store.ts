import { Store, StoreConfig } from "@datorama/akita"

export type ShorePowerInputId = number | null | undefined

export interface ShorePowerInputState {
  inputId: ShorePowerInputId
}

export const SHOREPOWERINPUT_STORE_NAME = "shorePowerInput"

@StoreConfig({ name: SHOREPOWERINPUT_STORE_NAME })
export class ShorePowerInputStore extends Store<ShorePowerInputState> {
  constructor() {
    super({})
  }
}

export const shorePowerInputStore = new ShorePowerInputStore()
