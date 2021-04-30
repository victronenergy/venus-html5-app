import { VebusStore } from "./Vebus.store"

export class VebusService {
  constructor(protected store: VebusStore) {}

  setInstanceId = (instanceId: number | null) => {
    this.store.update({ instanceId })
  }
}
