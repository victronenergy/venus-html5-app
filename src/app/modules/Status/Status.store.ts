import { Store, StoreConfig } from "@datorama/akita"

export type StatusUpdate = {
  part: string
  message: string
  level: string
}

export interface StatusState {
  status: StatusUpdate[]
}

export const STATUS_STORE_NAME = "Status"

@StoreConfig({ name: STATUS_STORE_NAME })
export class StatusStore extends Store<StatusState> {
  constructor() {
    super({ status: [] })
  }
}

export const statusStore = new StatusStore()
