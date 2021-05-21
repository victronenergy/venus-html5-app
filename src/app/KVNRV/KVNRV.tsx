import React, { useState } from "react"
import { Header } from "./components/Header"
import { Metrics } from "./components/Views"
import { useTheme } from "../modules"
import { VIEWS } from "./utils/constants"
import RemoteLogin from "./components/Views/RemoteLogin"

export const KVNRV = () => {
  const { darkMode } = useTheme()
  const [currentView, setCurrentView] = useState(VIEWS.METRICS)

  return (
    <div className={"container " + (darkMode ? "dark" : "light")}>
      <Header setCurrentView={setCurrentView} />
      {(() => {
        switch (currentView) {
          case VIEWS.METRICS:
            return <Metrics />
          case VIEWS.LOGIN:
            return <RemoteLogin />
        }
      })()}
    </div>
  )
}
