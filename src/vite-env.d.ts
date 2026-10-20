/// <reference types="./vite-env-override.d.ts" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly REACT_APP_WHITELABEL: string
  readonly REACT_APP_ENABLE_LANG_OVERRIDE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// build-time constants, see vite.config.mts define
declare const __APP_VERSION__: string
declare const __BUILD_DATE__: string
declare const __BUILD_TIME__: string

interface DiagConsoleEntry {
  time: Date
  level: string
  message: string
}

interface DiagConsole {
  show(): void
  hide(): void
  toggle(): void
  isVisible(): boolean
  onVisibilityChange(fn: ((visible: boolean) => void) | null): void
  clear(): void
  getLog(): DiagConsoleEntry[]
  hookIframe(iframe: HTMLIFrameElement): () => void
}

interface Window {
  diagConsole?: DiagConsole
}
