import React from "react"
import { Header } from "./components/Header"
import { Connecting, Error, Metrics, MqttUnavailable, RemoteConsole } from "./components/Views"
import { mfdLanguageOptions } from "app/locales/constants"
import { STATUS, useApp, useMqtt, useTheme, useLanguage } from "@victronenergy/mfd-modules"
import { VIEWS } from "./utils/constants"
import RemoteLogin from "./components/Views/RemoteLogin"
import { AppProps } from "./App"
import { observer } from "mobx-react"

export const KVNRV = observer((props: AppProps) => {
  const { darkMode } = useTheme()
  // subscribe to language
  useLanguage(mfdLanguageOptions)
  const appStore = useApp()
  const { error, status } = useMqtt()

  return (
    <div className={"container " + (darkMode ? "dark" : "light")}>
      <Header />
      {(() => {
        switch (appStore?.page) {
          case VIEWS.CONSOLE:
            return (
              <RemoteConsole
                onClickOutsideContainer={() => {
                  appStore.setPage(VIEWS.METRICS)
                }}
                host={props.host}
              />
            )
          default:
          case VIEWS.METRICS:
            if (error && status === STATUS.OFFLINE) {
              return <MqttUnavailable />
            } else if (error && status !== STATUS.CONNECTING) {
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
})
