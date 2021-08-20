import { useEffect } from "react"
import { notifyParams, useVisibleWidgetsStore } from "./VisibleWidgets.store"

export const useVisibilityNotifier = ({ widgetName, visible }: notifyParams) => {
  const visibleWidgetsStore = useVisibleWidgetsStore()

  useEffect(() => {
    visibleWidgetsStore.notifyVisibility({ widgetName, visible })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, widgetName])
}
