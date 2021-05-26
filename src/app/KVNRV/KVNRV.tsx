import React from "react"
import { Header } from "./components/Header"
import { Connecting, Error, Metrics, RemoteConsole } from "./components/Views"
import { mqttQuery, useApp, useAppService, useTheme } from "../modules"
import { VIEWS } from "./utils/constants"
import RemoteLogin from "./components/Views/RemoteLogin"
import { AppProps } from "../App"
import { useObservableState } from "observable-hooks"

export const KVNRV = (props: AppProps) => {
  const { darkMode } = useTheme()
  const appData = useApp()
  const appService = useAppService()

  const portalId = useObservableState(mqttQuery.portalId$)
  const isConnected = useObservableState(mqttQuery.isConnected$)
  const error = useObservableState(mqttQuery.error$)

  return (
    <div className={"container " + (darkMode ? "dark" : "light")}>
      <Header />
      {(() => {
        switch (appData?.page) {
          default:
          case VIEWS.CONSOLE:
            return (
              <RemoteConsole
                onClickOutsideContainer={() => {
                  appService.setPage(VIEWS.METRICS)
                }}
                host={props.host}
              />
            )
          case VIEWS.METRICS:
            if (!isConnected || !portalId) {
              return <Connecting />
            } else if (error) {
              return <Error />
            }
            return <Metrics />
          case VIEWS.LOGIN:
            return <RemoteLogin />
        }
      })()}
    </div>
  )
}
