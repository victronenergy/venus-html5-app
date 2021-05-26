import { Query } from "@datorama/akita"
import { BatteriesState, batteriesStore, BatteriesStore } from "./Batteries.store"

export class BatteriesQuery extends Query<BatteriesState> {
  batteries$ = this.select((s) => s.batteries)

  constructor(protected store: BatteriesStore) {
    super(store)
  }
}

export const batteriesQuery = new BatteriesQuery(batteriesStore)
