import { TankInstanceId, tanksStore, TanksStore } from "./Tanks.store"

export class TanksService {
  constructor(protected store: TanksStore) {}

  setTanks = (tanks: TankInstanceId[]) => this.store.update({ tanks })
}

export const useTanksService = () => new TanksService(tanksStore)
