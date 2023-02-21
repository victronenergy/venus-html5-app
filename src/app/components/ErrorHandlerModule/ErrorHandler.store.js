import { makeAutoObservable } from "mobx"
import { useMemo } from "react"
import * as Sentry from "@sentry/react"

let store

class ErrorHandler {
  error = null
  constructor() {
    makeAutoObservable(this)
  }
  setError(error) {
    if (!error) {
      Sentry.configureScope((scope) => scope.clear())
    }
    this.error = error
  }
}

export function initializeErrorHandlerStore() {
  const _store = store ?? new ErrorHandler()
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useErrorHandlerStore() {
  return useMemo(() => initializeErrorHandlerStore(), [])
}
