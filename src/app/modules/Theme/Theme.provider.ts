import { useObservableState } from "observable-hooks"
import { themeQuery } from "./Theme.query"
import { useThemeService } from "./Theme.service"

export const useTheme = () => {
  const darkMode = useObservableState(themeQuery.darkMode$)
  const themeService = useThemeService()

  return { darkMode, themeService }
}
