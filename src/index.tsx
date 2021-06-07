import "react-app-polyfill/stable"
import { akitaDevtools, persistState } from "@datorama/akita"
import React from "react"
import ReactDOM from "react-dom"
import App from "./app/App"
import { getParameterByName } from "./app/utils/util"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import reportWebVitals from "./reportWebVitals"
import { APP_STORE_NAME, VRM_STORE_NAME } from "@elninotech/mfd-modules"

const host = getParameterByName("host") || window.location.hostname || "localhost"
const port = parseInt(getParameterByName("port") ?? "9001")

akitaDevtools()

// TODO: Implement storage strategy for devices that do not support localStorage
// https://datorama.github.io/akita/docs/enhancers/persist-state
persistState({
  include: [APP_STORE_NAME, VRM_STORE_NAME],
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
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
