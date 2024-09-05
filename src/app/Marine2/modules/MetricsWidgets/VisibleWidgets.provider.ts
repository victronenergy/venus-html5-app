import { useEffect } from "react"
import { VisibilityParams, useVisibleWidgetsStore } from "./VisibleWidgets.store"

export const useVisibilityNotifier = ({ widgetName, isVisible }: VisibilityParams) => {
  const visibleWidgetsStore = useVisibleWidgetsStore()

  useEffect(() => {
    visibleWidgetsStore.changeVisibility({ widgetName, isVisible })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetName, isVisible])
}
