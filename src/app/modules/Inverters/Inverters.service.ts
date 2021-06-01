import { InverterInstanceId, invertersStore, InvertersStore } from "./Inverters.store"

export class InvertersService {
  constructor(protected store: InvertersStore) {}

  setInverters = (inverters: InverterInstanceId[]) => this.store.update({ inverters })
}

export const useInvertersService = () => new InvertersService(invertersStore)
