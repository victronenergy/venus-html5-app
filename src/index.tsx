import "react-app-polyfill/stable"
import React from "react"
import ReactDOM from "react-dom"
import App from "./app/App"
import { getParameterByName } from "./app/utils/util"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"

// load languages
import "./app/locales"
import { initializeErrorHandlerStore } from "app/components/ErrorHandlerModule/ErrorHandler.store"

const host = getParameterByName("host") || window.location.hostname || "localhost"
const port = parseInt(getParameterByName("port") ?? "9001")

const errorHandlerStore = initializeErrorHandlerStore()

Sentry.init({
  dsn: "https://1582bd830f4349f1889999f8b3466a2e@o81300.ingest.sentry.io/6331073",
  integrations: [new Integrations.BrowserTracing()],
  sampleRate: 1,
  debug: process.env.NODE_ENV === "development",
  beforeSend(event, hint) {
    const sendError = hint && hint.captureContext === "captured"
    if (!sendError) {
      errorHandlerStore.setError(event)
      return null
    }
    return event
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App host={host} port={port} />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: async (registration) => {
    if (registration && registration.waiting) {
      await registration.unregister()
      // Makes Workbox call skipWaiting()
      registration.waiting.postMessage({ type: "SKIP_WAITING" })
      // Once the service worker is unregistered, we can reload the page to let
      // the browser download a fresh copy of our app (invalidating the cache)
      window.location.reload()
    }
  },
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
