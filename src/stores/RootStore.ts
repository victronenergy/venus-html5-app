import { NavigationStore } from '~/stores/NavigationStore'

export class RootStore {
  navigationStore: NavigationStore

  constructor() {
    this.navigationStore = new NavigationStore(this)
  }
}
