import { appStore, AppStore } from "./App.store"

export class AppService {
  constructor(protected store: AppStore) {}

  toggleLocked = () => this.store.update(({ locked }) => ({ locked: !locked }))
  setPage = (page: string) => this.store.update({ page })
  setRemote = (remote: boolean) => this.store.update({ remote })
  toggleRemote = () => this.store.update(({ remote }) => ({ remote: !remote }))
}

export const useAppService = () => new AppService(appStore)
