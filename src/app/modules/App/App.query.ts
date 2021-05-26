import { Query } from "@datorama/akita"
import { AppState, appStore, AppStore } from "./App.store"

export class AppQuery extends Query<AppState> {
  constructor(protected store: AppStore) {
    super(store)
  }

  all$ = this.select()
  page$ = this.select((s) => s.page)
  locked$ = this.select((s) => s.locked)
  remote$ = this.select((s) => s.remote)
}

export const appQuery = new AppQuery(appStore)
