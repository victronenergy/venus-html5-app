import { makeAutoObservable, runInAction } from 'mobx'
import { RootStore } from '~/stores/RootStore'

export class NavigationStore {
  title: string = ''

  constructor(private _rootStore: RootStore) {
    makeAutoObservable(this)
  }

  setTitle(value: string) {
    runInAction(() => {
      this.title = value
    })
  }
}
