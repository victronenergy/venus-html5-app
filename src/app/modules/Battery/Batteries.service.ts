import { BatteryId, batteriesStore, BatteriesStore } from "./Batteries.store"

export class BatteriesService {
  constructor(protected store: BatteriesStore) {}

  setBatteries = (batteries: BatteryId[]) => this.store.update({ batteries })
}

export const useBatteriesService = () => new BatteriesService(batteriesStore)
