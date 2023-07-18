import "react-app-polyfill/stable"
import React from "react"
import ReactDOM from "react-dom"
import { getParameterByName } from "./app/utils/util"
import registerServiceWorker from "./serviceWorkerRegistration"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"
import { initializeErrorHandlerStore } from "app/components/ErrorHandlerModule/ErrorHandler.store"
import Loading from "./app/MarineApp/components/Loading"
import packageInfo from "../package.json"

// load languages
import "./app/locales"
import { ScopeContext } from "@sentry/types/types/scope"

// Get app according to whitelabel
const KvnrvApp = React.lazy(() => import("./app/KVNRV/App"))
const MarineApp = React.lazy(() => import("./app/MarineApp/App"))
const Marine2App = React.lazy(() => import("./app/Marine2/App"))

const whitelabel = process.env.REACT_APP_WHITELABEL
const getApp = () => {
  switch (whitelabel) {
    case "KVNRV":
      return (
        <React.Suspense fallback={<Loading />}>
          <KvnrvApp host={host} port={port} />
        </React.Suspense>
      )
    case "Marine":
      return (
        <React.Suspense fallback={<Loading />}>
          <MarineApp host={host} port={port} />
        </React.Suspense>
      )
    default:
      return (
        <React.Suspense fallback={<Loading />}>
          <Marine2App host={host} port={port} />
        </React.Suspense>
      )
  }
}

const host = getParameterByName("host") || window.location.hostname || "localhost"
const port = parseInt(getParameterByName("port") ?? "9001")

const errorHandlerStore = initializeErrorHandlerStore()

Sentry.init({
  dsn: "https://1582bd830f4349f1889999f8b3466a2e@o81300.ingest.sentry.io/6331073",
  integrations: [new Integrations.BrowserTracing()],
  sampleRate: 1,
  environment: process.env.NODE_ENV,
  release: `${packageInfo.version} ${process.env.REACT_APP_WHITELABEL}`,
  debug: process.env.NODE_ENV === "development",
  // Since this app can be used on remote devices such as a boat, we want to
  // capture errors and then allow the user to decide if they want to send them,
  // because they may have only limited or satellite internet access
  beforeSend(event, hint) {
    const captureContext = hint?.captureContext as Partial<ScopeContext>
    const sendError = captureContext?.tags?.sendError

    // we don't send errors immediately and first show the error message to the user,
    // so that they can decide if they want to send the error to Sentry
    if (!sendError) {
      errorHandlerStore.setError(event)
      return null
    }

    // replace the error message with the original error message stored before,
    // because the second time the error is sent, the Sentry adds unclear stack trace and message
    if (errorHandlerStore.error) {
      event = errorHandlerStore.error
    }

    return event
  },
})

ReactDOM.render(<React.StrictMode>{getApp()}</React.StrictMode>, document.getElementById("root"))

registerServiceWorker()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
