import { ChargerInstanceId, chargersStore, ChargersStore } from "./Chargers.store"

export class ChargersService {
  constructor(protected store: ChargersStore) {}

  setChargers = (chargers: ChargerInstanceId[]) => this.store.update({ chargers })
}

export const useChargersService = () => new ChargersService(chargersStore)
