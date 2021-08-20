import { WIDGET_TYPES } from "app/MarineApp/utils/constants"
import { makeAutoObservable } from "mobx"
import { useMemo } from "react"

export type notifyParams = {
  widgetName: typeof WIDGET_TYPES[keyof typeof WIDGET_TYPES]
  visible: boolean
}

export class VisibleWidgets {
  visibleElements: Set<string> = new Set()

  constructor() {
    makeAutoObservable(this)
  }

  notifyVisibility(element: notifyParams) {
    if (element.visible) {
      this.visibleElements.add(element.widgetName)
    } else {
      this.visibleElements.delete(element.widgetName)
    }
  }

  get noVisibleElements() {
    return !this.visibleElements.size
  }
}

let store: VisibleWidgets

function initializeStore() {
  const _store = store ?? new VisibleWidgets()
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useVisibleWidgetsStore() {
  return useMemo(() => initializeStore(), [])
}
