import React from "react"
import { render } from "react-dom"
import { getParameterByName } from "./utils/util"
import App from "./components/App"

const host = getParameterByName("host") || window.location.hostname || "localhost"
const port = parseInt(getParameterByName("port")) || 9001

render(<App host={host} port={port} />, document.getElementById("app"))
