// Must be referenced before vite/client: SVGs under src/app/Marine2 are imported as React
// components via vite-plugin-svgr (see vite.config.mts), all other SVGs resolve to a URL string.
declare module "*.svg" {
  const content: any
  export default content
}
