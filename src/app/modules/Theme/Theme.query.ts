import { Query } from "@datorama/akita"
import { themeStore, ThemeStore } from "./Theme.store"

export class ThemeQuery extends Query<any> {
  darkMode$ = this.select((s) => s.darkMode)

  constructor(protected store: ThemeStore) {
    super(store)
  }
}

export const themeQuery = new ThemeQuery(themeStore)
