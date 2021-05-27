import React from "react"
import { Header } from "./components/Header"
import { Connecting, Error, Metrics, MqttUnavailable, RemoteConsole } from "./components/Views"
import { mqttQuery, STATUS, useApp, useAppService, useTheme } from "../modules"
import { VIEWS } from "./utils/constants"
import RemoteLogin from "./components/Views/RemoteLogin"
import { AppProps } from "../App"
import { useObservableState } from "observable-hooks"

export const KVNRV = (props: AppProps) => {
  const { darkMode } = useTheme()
  const appData = useApp()
  const appService = useAppService()

  const error = useObservableState(mqttQuery.error$)
  const status = useObservableState(mqttQuery.status$)

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
            if (error && status === STATUS.OFFLINE) {
              return <MqttUnavailable />
            } else if (error) {
              return <Error error={error} />
            } else if (status === STATUS.CONNECTING) {
              return <Connecting />
            }

            return <Metrics />
          case VIEWS.LOGIN:
            return <RemoteLogin />
        }
      })()}
    </div>
  )
}
