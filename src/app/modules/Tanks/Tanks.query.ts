import { Query } from "@datorama/akita"
import { tanksStore, TanksStore } from "./Tanks.store"

export class TanksQuery extends Query<any> {
  tanks$ = () => this.select((s) => s.tanks)

  constructor(protected store: TanksStore) {
    super(store)
  }
}

export const tanksQuery = new TanksQuery(tanksStore)
