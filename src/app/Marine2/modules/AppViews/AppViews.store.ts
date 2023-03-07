import { makeAutoObservable } from "mobx"
import { useMemo } from "react"
import { translate } from "react-i18nify"

export enum AppViews {
  ROOT = "root",
  REMOTE_CONSOLE = "remote-console",
  DIAGNOSTICS = "diagnostics",
  BOX_BATTERIES_OVERVIEW = "box/batteries-overview",
  BOX_TANKS = "box/tanks",
  BOX_ENERGY_OVERVIEW = "box/energy-overview",
}

export const AppViewTitles = new Map<AppViews, string>([
  [AppViews.ROOT, translate("pages.systemOverview")],
  [AppViews.REMOTE_CONSOLE, translate("pages.remoteConsole")],
  [AppViews.DIAGNOSTICS, translate("pages.diagnostics")],
  [AppViews.BOX_BATTERIES_OVERVIEW, translate("boxes.batteries")],
  [AppViews.BOX_TANKS, translate("boxes.tanks")],
  [AppViews.BOX_ENERGY_OVERVIEW, translate("boxes.EnergyOverview")],
])

export class AppViewsStore {
  currentView: AppViews = AppViews.ROOT

  constructor() {
    makeAutoObservable(this)
  }

  setView(view: AppViews) {
    this.currentView = view
  }

  getViewTitle(view?: AppViews) {
    return AppViewTitles.get(view || this.currentView) ?? ""
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
