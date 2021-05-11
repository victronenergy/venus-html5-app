import { Query } from "@datorama/akita"
import { ChargersStore, chargersStore } from "./Chargers.store"

export class ChargersQuery extends Query<any> {
  chargers$ = () => this.select((s) => s.chargers)

  constructor(protected store: ChargersStore) {
    super(store)
  }
}

export const chargersQuery = new ChargersQuery(chargersStore)
