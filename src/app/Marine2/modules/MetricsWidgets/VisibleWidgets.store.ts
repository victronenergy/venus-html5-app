import { makeAutoObservable } from "mobx"
import { useMemo } from "react"
import { BoxTypes } from "../../utils/constants"

export type notifyParams = {
  widgetName: BoxTypes
  visible: boolean
}

export class VisibleWidgets {
  // TODO: add order prop to have a consistent order of boxes
  visibleElements: Set<BoxTypes> = new Set()

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

  clearVisibleElements() {
    this.visibleElements.clear()
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
