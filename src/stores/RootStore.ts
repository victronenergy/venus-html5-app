import { ThemeStore } from '~/stores/ThemeStore'

export class RootStore {
  themeStore: ThemeStore

  constructor() {
    this.themeStore = new ThemeStore(this)
  }
}
