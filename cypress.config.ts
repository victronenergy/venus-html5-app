import { defineConfig } from "cypress"

export default defineConfig({
  video: true,
  viewportWidth: 1280,
  viewportHeight: 720,
  projectId: "gho3jq",
  reporter: "mochawesome",
  chromeWebSecurity: false,
  reporterOptions: {
    reportDir: "cypress/results",
    reportFilename: "result",
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: "http://localhost:8000/",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },
})
