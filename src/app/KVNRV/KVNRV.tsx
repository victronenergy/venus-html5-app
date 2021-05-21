import React from "react"
import { Header } from "./components/Header"
import { Metrics } from "./components/Views"
import { useApp, useTheme } from "../modules"
import { VIEWS } from "./utils/constants"
import RemoteLogin from "./components/Views/RemoteLogin"

export const KVNRV = () => {
  const { darkMode } = useTheme()
  const appData = useApp()

  return (
    <div className={"container " + (darkMode ? "dark" : "light")}>
      <Header />
      {(() => {
        switch (appData?.page) {
          default:
          case VIEWS.METRICS:
            return <Metrics />
          case VIEWS.LOGIN:
            return <RemoteLogin />
        }
      })()}
    </div>
  )
}
