import { makeAutoObservable, observable, computed } from "mobx"
import { useMemo } from "react"

type Modal = "deviceSetting" | "startStopMode" | "generatorStopInfo"

export interface Modals {
  [keyOf: string]: boolean
}

export class UiStore {
  modals: Modals = {
    deviceSettings: false,
    startStopMode: false,
    generatorStopInfo: false,
  }

  constructor() {
    makeAutoObservable(this)
  }

  openModalFor(id: Modal) {
    this.modals[id] = true
  }

  closeModalFor(id: Modal) {
    this.modals[id] = false
  }

  toggleModalFor(id: Modal) {
    this.modals[id] = !this.modals[id]
  }
}

let store: UiStore

function initializeStore() {
  const _store = store ?? new UiStore()
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useUiStore() {
  return useMemo(() => initializeStore(), [])
}
