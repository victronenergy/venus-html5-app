import { makeAutoObservable } from 'mobx'
import { makePersistable, isHydrated, clearPersistedStore } from 'mobx-persist-store'
import { RootStore } from '~/stores/RootStore'

export class ExampleStore {
  mode: 'dark' | 'light' = 'light'

  constructor(private _rootStore: RootStore) {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'ExampleStore',
      properties: ['mode'],
    })
  }

  toggleMode() {
    this.mode = this.mode === 'dark' ? 'light' : 'dark'
  }

  async clearStore() {
    return await clearPersistedStore(this)
  }

  get isHydrated() {
    return isHydrated(this)
  }
}
