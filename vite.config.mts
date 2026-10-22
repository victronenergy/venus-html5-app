import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import legacy from "@vitejs/plugin-legacy"
import svgr from "vite-plugin-svgr"
import { VitePWA } from "vite-plugin-pwa"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import pkg from "./package.json" with { type: "json" }

export default defineConfig(({ mode }) => {
  // load all vars from .env files, variables already present in process.env (CI) take precedence
  const env = loadEnv(mode, process.cwd(), "")
  // PUBLIC_URL is "/app" on the device and "/" in CI for cypress, normalize to "/app/" or "/"
  const publicPath = (env.PUBLIC_URL || "").replace(/^\/+|\/+$/g, "")
  const base = publicPath ? `/${publicPath}/` : "/"
  const now = new Date()

  return {
    base,
    // only REACT_APP_* vars are exposed to the client via import.meta.env
    envPrefix: "REACT_APP_",
    // public/{Marine,Marine2,icons} are copied verbatim into dist/
    publicDir: "public",
    plugins: [
      react(),
      // SVGs under Marine2 are imported as React components (default export), everything else is a URL
      svgr({ include: "**/src/app/Marine2/**/*.svg", svgrOptions: { exportType: "default", jsxRuntime: "automatic" } }),
      // mqtt@4 (via @victronenergy/mfd-modules) needs node core module polyfills in the browser
      nodePolyfills({
        include: ["buffer", "events", "process", "stream", "url", "util"],
        globals: { Buffer: true, global: true, process: true },
      }),
      // MFD browsers (Chrome 49/51, AppleWebKit 537/601) cannot load <script type="module">,
      // so only the legacy (SystemJS + core-js polyfilled, babel transpiled) bundle is emitted,
      // targets are taken from the browserslist key in package.json
      legacy({ renderModernChunks: false, polyfills: true }),
      VitePWA({
        strategies: "injectManifest",
        srcDir: "src",
        filename: "service-worker.js",
        // registration is done by src/serviceWorkerRegistration.js, manifest.json lives in public/<whitelabel>/
        injectRegister: null,
        manifest: false,
        injectManifest: {
          target: "es2015",
          rollupFormat: "iife",
          minify: true,
          globPatterns: ["index.html", "static/**/*"],
          globIgnores: ["**/*.map", "**/*.gz"],
          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
          // rolldown emits base64url hashes
          dontCacheBustURLsMatching: /\.[A-Za-z0-9_-]{8}\./,
        },
      }),
      {
        // CRA style %PUBLIC_URL% placeholder in index.html, vite prefixes `base` to the resulting
        // absolute public dir hrefs itself, %REACT_APP_WHITELABEL% is replaced by vite natively
        name: "public-url",
        transformIndexHtml: { order: "pre", handler: (html) => html.replaceAll("%PUBLIC_URL%", "") },
      },
    ],
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __BUILD_DATE__: JSON.stringify(now.toLocaleDateString()),
      __BUILD_TIME__: JSON.stringify(`${now.getUTCHours()}${now.getUTCMinutes()}`),
    },
    resolve: {
      alias: [
        { find: /^app\//, replacement: new URL("./src/app/", import.meta.url).pathname },
        { find: /^@m2Types\//, replacement: new URL("./src/app/Marine2/types/", import.meta.url).pathname },
      ],
    },
    build: {
      outDir: "dist",
      assetsDir: "static",
      sourcemap: false,
      emptyOutDir: true,
      // keep -webkit- flexbox prefixes for old WebKit, plugin-legacy would otherwise default to chrome61
      cssTarget: ["chrome51", "safari8"],
      // NOTE: with legacy-only output vite injects the CSS into the JS bundle via a <style> tag,
      // there is no separate css file in dist/
      modulePreload: { polyfill: false },
      chunkSizeWarningLimit: 3000,
      // url-loader parity: inline small raster images only, never svg or fonts
      assetsInlineLimit: (file, content) =>
        /\.(png|jpe?g|gif|bmp|avif)$/i.test(file) ? content.length < 10000 : false,
      rolldownOptions: {
        output: {
          // single app bundle, React.lazy imports are inlined (same as webpack LimitChunkCountPlugin)
          inlineDynamicImports: true,
          entryFileNames: "static/js/[name].[hash].js",
          chunkFileNames: "static/js/[name].[hash].js",
          assetFileNames: (info) =>
            (info.names?.[0] || "").endsWith(".css")
              ? "static/css/[name].[hash][extname]"
              : "static/media/[name].[hash][extname]",
        },
      },
    },
    server: {
      port: Number(env.PORT) || 8000,
      strictPort: true,
      host: true,
    },
  }
})
