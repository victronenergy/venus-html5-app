import { makeAutoObservable } from "mobx"
import { useMemo } from "react"

export type StatusUpdate = {
  part: string
  message: string
  level: string
}

export class StatusStore {
  status: StatusUpdate[] = []

  constructor() {
    makeAutoObservable(this)
  }

  isUpdatePresent(statusUpdatePart: string) {
    return this.status.some((s) => s.part === statusUpdatePart)
  }

  addStatus = (status: StatusUpdate) => {
    if (status.part && !this.isUpdatePresent(status.part)) {
      this.status.push(status)
    } else {
      const existingStatus = this.status.find((s) => s.part === status.part)
      if (existingStatus && existingStatus.level !== status.level) {
        this.removeStatus(status.part)
        this.addStatus(status)
      }
    }
  }
  removeStatus = (statusPart: string) => {
    if (this.isUpdatePresent(statusPart)) {
      this.status.splice(
        this.status.findIndex((s) => s.part === statusPart),
        1
      )
    }
  }

  clear = () => {
    this.status = []
  }
}

let store: StatusStore

function initializeStore() {
  const _store = store ?? new StatusStore()
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStatusStore() {
  return useMemo(() => initializeStore(), [])
}
