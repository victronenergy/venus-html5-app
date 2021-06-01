import { Query } from "@datorama/akita"
import { InvertersStore, invertersStore } from "./Inverters.store"

export class InvertersQuery extends Query<any> {
  inverters$ = this.select((s) => s.inverters)

  constructor(protected store: InvertersStore) {
    super(store)
  }
}

export const invertersQuery = new InvertersQuery(invertersStore)
