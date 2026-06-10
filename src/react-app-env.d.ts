/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test"
    readonly PUBLIC_URL: string
  }
}

declare module "*.avif" {
  const src: string
  export default src
}

declare module "*.bmp" {
  const src: string
  export default src
}

declare module "*.gif" {
  const src: string
  export default src
}

declare module "*.jpg" {
  const src: string
  export default src
}

declare module "*.jpeg" {
  const src: string
  export default src
}

declare module "*.png" {
  const src: string
  export default src
}

declare module "*.webp" {
  const src: string
  export default src
}

declare module "*.svg" {
  const content: any
  export default content
}

declare module "*.css" {}

declare module "*.scss" {}

declare module "*.sass" {}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string }
  export default classes
}

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
