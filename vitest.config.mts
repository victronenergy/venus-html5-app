import path from "node:path"
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

// Kept separate from vite.config.mts so that build-only plugins (legacy, pwa, node polyfills)
// never load while running unit tests.
export default defineConfig({
  plugins: [
    react(),
    // SVGs under Marine2 are imported as React components (default export), everything else is a URL
    svgr({ include: "**/src/app/Marine2/**/*.svg", svgrOptions: { exportType: "default", jsxRuntime: "automatic" } }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify("0.0.0-test"),
    __BUILD_DATE__: JSON.stringify("1/1/1970"),
    __BUILD_TIME__: JSON.stringify("00"),
  },
  resolve: {
    alias: [
      { find: /^app\//, replacement: path.resolve(import.meta.dirname, "src/app") + "/" },
      { find: /^@m2Types\//, replacement: path.resolve(import.meta.dirname, "src/app/Marine2/types") + "/" },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    mockReset: true,
    css: false,
    setupFiles: ["./src/setupTests.ts"],
    // keep this narrow, cypress/e2e/*.spec.ts must not be picked up
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    server: {
      deps: {
        // raw ESM with extensionless re-exports and no "type": "module", must be processed by vite
        inline: ["@victronenergy/mfd-modules"],
      },
    },
  },
})
