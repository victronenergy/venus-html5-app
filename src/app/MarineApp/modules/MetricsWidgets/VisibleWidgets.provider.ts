import { useEffect } from "react"
import { notifyParams, useVisibleWidgetsStore } from "./VisibleWidgets.store"

export const useVisibilityNotifier = ({ widgetName, visible }: notifyParams) => {
  const visibleWidgetsStore = useVisibleWidgetsStore()

  useEffect(() => {
    visibleWidgetsStore.notifyVisibility({ widgetName, visible })
  }, [visibleWidgetsStore, visible, widgetName])
}
