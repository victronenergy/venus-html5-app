import { Store, StoreConfig } from "@datorama/akita"

export interface ThemeState {
  darkMode: boolean
}

export const THEME_STORE_NAME = "Theme"

@StoreConfig({ name: THEME_STORE_NAME })
export class ThemeStore extends Store<ThemeState> {
  constructor() {
    super({ darkMode: true })
  }
}

export const themeStore = new ThemeStore()
