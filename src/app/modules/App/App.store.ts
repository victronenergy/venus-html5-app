import { Store, StoreConfig } from "@datorama/akita"
import { VIEWS } from "../../utils/constants"

export interface AppState {
  page: string
  locked: boolean
}

export const APP_STORE_NAME = "App"

@StoreConfig({ name: APP_STORE_NAME })
export class AppStore extends Store<AppState> {
  constructor() {
    super({
      page: VIEWS.METRICS,
      locked: false,
    })
  }
}

export const appStore = new AppStore()
