import { makeAutoObservable } from "mobx"
import { useMemo } from "react"

export enum AppViews {
  ROOT = "root",
  REMOTE_CONSOLE = "remote-console",
  BOX_ENERGY_AC = `box/energy-ac`,
  BOX_ENERGY_DC = "box/energy-dc",
  BOX_TANKS = "box/tanks",
}

export class AppViewsStore {
  currentView: AppViews = AppViews.ROOT

  constructor() {
    makeAutoObservable(this)
  }

  setView(view: AppViews) {
    this.currentView = view
  }
}

let store: AppViewsStore

function initializeStore() {
  const _store = store ?? new AppViewsStore()
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useAppViewsStore() {
  return useMemo(() => initializeStore(), [])
}
