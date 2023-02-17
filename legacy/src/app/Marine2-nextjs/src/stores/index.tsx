import { useMemo } from 'react'
import { enableStaticRendering } from 'mobx-react-lite'
import { RootStore } from '~/stores/RootStore'

let store: RootStore

function initializeStore() {
  const _store = store ?? new RootStore()

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    enableStaticRendering(true)
    return _store
  }

  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore() {
  return useMemo(() => initializeStore(), [])
}
