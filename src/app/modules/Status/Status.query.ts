import { Query } from "@datorama/akita"
import { StatusStore, statusStore } from "./Status.store"

export class StatusQuery extends Query<any> {
  status$ = () => this.select((s) => s.status)

  constructor(protected store: StatusStore) {
    super(store)
  }
}

export const statusQuery = new StatusQuery(statusStore)
