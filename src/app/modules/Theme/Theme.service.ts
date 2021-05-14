import { themeStore, ThemeStore } from "./Theme.store"

export class ThemeService {
  constructor(protected store: ThemeStore) {}

  setTheme = (darkMode: boolean) => {
    this.store.update({ darkMode })
  }
}

export const useThemeService = () => new ThemeService(themeStore)
